"use client";

import { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { useState } from "react";

import { Message as PreviewMessage } from "@/components/custom/message";
import { useScrollToBottom } from "@/components/custom/use-scroll-to-bottom";

import { MultimodalInput } from "./multimodal-input";
import { Overview } from "./overview";

export function Chat({
  id,
  initialMessages,
}: {
  id: string;
  initialMessages: Array<Message>;
}) {
  const { messages, handleSubmit, input, setInput, append, isLoading, stop } =
    useChat({
      id,
      body: { id },
      initialMessages,
      maxSteps: 15,
      onFinish: () => {
        window.history.replaceState({}, "", `/chat/${id}`);
      },
    });

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

    const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  return (
    <div className="flex flex-row justify-center pb-2 border rounded-2xl h-[90vh] ">
    <div className="flex flex-col justify-between items-center gap-4">
      <div
        ref={messagesContainerRef}
        className={`flex flex-col gap-4 h-full items-center overflow-y-scroll ${messages.length === 0 ? "max-w-[60vw]" : "w-[43vw]"}`}
      >
        {/* <div
          className={`flex flex-col gap-4 h-full items-center overflow-y-auto ${messages.length === 0 ? "max-w-[60vw]" : "w-[43vw]"}`}
        ></div> */}
          {/* <Overview /> */}
          {messages.length === 0 && <Overview />}

          {messages.map((message) => (
            <PreviewMessage
              key={message.id}
              chatId={id}
              role={message.role}
              content={message.content}
              attachments={message.experimental_attachments}
              toolInvocations={message.toolInvocations}
            />
          ))}
        </div>
        <form className="flex flex-row gap-2 relative items-end px-4 mb-4 md:px-0">
          <MultimodalInput
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            attachments={attachments}
            setAttachments={setAttachments}
            stop={stop}
            messages={messages}
            append={append}
          />
        </form>
      </div>
    </div>
  );
}