"use server"
import { LogOut } from "lucide-react";

import { signOut } from "@/app/(auth)/auth";

export const SignOut = () => {
    <form action={async () => {
        "use server";

        await signOut({
          redirectTo:"/",
        })
      }}>
        <button type="submit">
      <LogOut />
      Log out
      </button>
      </form>
}