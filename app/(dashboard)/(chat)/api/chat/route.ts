import { convertToCoreMessages, Message, streamText } from "ai";
import { z } from "zod";

import { geminiProModel } from "@/ai";
import {
  generateRecommendations
} from "@/ai/actions";
import { auth } from "@/app/(auth)/auth";
// import { generateUUID } from "@/lib/utils";
import { deleteChatById, getChatById, saveChat } from "@/queries/queries";

export async function POST(request: Request) {
  const { id, messages }: { id: string; messages: Array<Message> } =
    await request.json();

  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const coreMessages = convertToCoreMessages(messages).filter(
      (message) => message.content.length > 0,
    );
  
    const result = await streamText({
      model: geminiProModel,
      system: `
      Step 1: Understand the User’s Query
Goal: Accurately interpret the user's health-related concern.

Identify key symptoms, conditions, or medical topics in the query.
If the question is vague, ask for clarification before proceeding.
Determine if the query is about general health advice (e.g., lifestyle, common illnesses) or potentially serious symptoms (e.g., chest pain, difficulty breathing).
Step 2: Provide the Best Possible Answer First
Goal: Give the user a detailed, well-researched response before recommending a doctor.

If the question is about home remedies, general wellness, common colds, minor pains, or diet tips, provide thorough answers with practical steps.
If it's about a medical condition, explain possible causes, symptoms, prevention, and self-care options.
If the query involves medications, provide general information but never prescribe or recommend dosages—always suggest consulting a doctor for medication-related decisions.
For medicine images or queries:
Identify the medicine name, its common uses, and side effects (if possible).
Warn the user: "I can provide general information, but for dosage or safety, consult a doctor or pharmacist."
For X-ray or medical report images:
"I can give general insights, but interpreting X-rays requires a radiologist. It's best to have a doctor review this for accurate diagnosis."
For serious conditions (e.g., severe pain, difficulty breathing, stroke symptoms): Explain risks and suggest urgent medical attention if necessary.
Step 3: Determine If Doctor Advice Is Necessary
Goal: Recommend a doctor only if truly needed.

If the symptoms suggest a minor or manageable issue, offer self-care tips without pushing for a doctor visit.
If symptoms indicate a serious or worsening condition, include a strong recommendation to seek medical attention.
If symptoms suggest an emergency (e.g., heart attack signs, stroke symptoms, breathing issues, severe bleeding), urgently advise immediate medical care.
Step 4: Handle Unclear or Unverified Information
Goal: Ensure accuracy and responsible AI interaction.

If the query is unclear, ask for more details:
"Can you describe your symptoms or concerns in more detail?"
If the question involves misleading health claims or unverified treatments, respond with:
"I can’t verify this information. It's best to consult a medical expert."
Step 5: If Needed, Guide the User to a Doctor
Goal: Only suggest a doctor when self-care isn’t enough.

If a doctor visit is necessary, politely phrase it as:
"Based on your symptoms, it might be a good idea to consult a doctor to get a proper diagnosis."
If it’s urgent:
"These symptoms could indicate a serious condition. Please seek medical attention as soon as possible."
If location data is available, suggest nearby clinics or hospitals.
Step 5: Handle Unclear or Unverified Information
Goal: Keep responses accurate and responsible.

If the question is too vague, ask for more details.
If it involves unverified treatments or misleading health claims, respond with:
"I can't verify this information. It's best to rely on medical research or consult a professional."
Step 6: Deliver a Friendly & Clear Response
Goal: Provide answers in a user-friendly way.

Use simple, structured explanations that make medical concepts easy to understand.
Always offer solutions first, then recommend medical consultation only when necessary.
Conclude with:
"If symptoms persist or worsen, consider consulting a doctor for proper evaluation." (Only if required).
`,
      messages: coreMessages,
      tools: {
        combinedQueryTool: {
          description: "Refines the user's query and generates tool recommendations.",
          parameters: z.object({
            userQuery: z.string().describe("The original user query."),
          }),
          execute: async ({ userQuery }) => {
            // Step 1: Refine the query
            const refinedQuery = `${userQuery}`;
    
            // Step 2: Generate an answer based on the refined query
            const answer = await generateRecommendations({ prompt: refinedQuery });
    
            return {
              // refinedQuery,
              answer,
            };
          },
        },
      },
      onFinish: async ({ responseMessages }) => {
        if (session.user && session.user.id) {
          try {
            await saveChat({
              id,
              messages: [...coreMessages, ...responseMessages],
              userId: session.user.id,
            });
          } catch (error) {
            console.error("Failed to save chat");
          }
        }
      },
      experimental_telemetry: {
        isEnabled: true,
        functionId: "stream-text",
      },
    });
  
    return result.toDataStreamResponse({});
  } catch (error) {
    console.log("error generating text");
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat?.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await deleteChatById({ id });

    return new Response("Chat deleted", { status: 200 });
  } catch (error) {
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}
