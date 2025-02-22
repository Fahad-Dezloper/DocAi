"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { AuthForm } from "@/components/custom/auth-form";
import { SubmitButton } from "@/components/custom/submit-button";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { register, RegisterActionState } from "../actions";

export default function Page() {
  const router = useRouter();
  const userEmRef = useRef<HTMLInputElement>(null);
  const userPsRef = useRef<HTMLInputElement>(null);
  const docEmRef = useRef<HTMLInputElement>(null);
  const docPsRef = useRef<HTMLInputElement>(null);

  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    register,
    {
      status: "idle",
    },
  );

  async function signUpUser() {
    if (!userEmRef.current?.value || !userPsRef.current?.value) {
      toast.error("Please enter all fields");
      return;
    }

    const formData = new FormData();
    formData.append("email", userEmRef.current.value);
    formData.append("password", userPsRef.current.value);
    formData.append("role", "user");

    formAction(formData);
  }

  async function signUpDoc() {
    if (!docEmRef.current?.value || !docPsRef.current?.value) {
      toast.error("Please enter all fields");
      return;
    }

    const formData = new FormData();
    formData.append("email", docEmRef.current.value);
    formData.append("password", docPsRef.current.value);
    formData.append("role", "doctor"); // 👈 Pass role to distinguish user type

    formAction(formData);
  }

  useEffect(() => {
    if (state.status === "user_exists") {
      toast.error("Account already exists");
    } else if (state.status === "failed") {
      toast.error("Failed to create account");
    } else if (state.status === "invalid_data") {
      toast.error("Failed validating your submission!");
    } else if (state.status === "success") {
      toast.success("Account created successfully");
      router.refresh();
    }
  }, [state, router]);


  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl gap-12 flex flex-col">
        <h1 className="text-xl w-full text-center">Sign Up as a</h1>
          <Tabs defaultValue="user" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="user">User</TabsTrigger>
        <TabsTrigger value="doctor">Doctor</TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <Card>
          <CardHeader className="flex items-center">
            <CardTitle>User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input ref={userEmRef} id="email" placeholder="fab@gmail.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input ref={userPsRef} id="password" defaultValue="" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={signUpUser}>Sign Up</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="doctor">
        <Card>
          <CardHeader>
            <CardTitle className="w-full text-center">Doctor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input ref={docEmRef} id="email" type="text" placeholder="doc@gmail.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input ref={docPsRef} id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={signUpDoc}>Sign Up</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
      </div>
      </div>
  );
}
