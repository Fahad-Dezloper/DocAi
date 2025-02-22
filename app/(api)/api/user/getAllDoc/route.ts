import { auth } from "@/app/(auth)/auth";
import { getAllUser } from "@/queries/queries";

export async function GET(){
    try {
        const session = await auth();

    if(!session || !session.user){
        return new Response("Unauthorized", {status: 401});
    }

    const res = await getAllUser();

    return new Response(JSON.stringify({ message: "Successful in fetching all users", data: res }), { status: 200 });
    } catch (error) {
        console.log("error while", error);
        return new Response("Internal Server Error", { status: 500 });
    }

}