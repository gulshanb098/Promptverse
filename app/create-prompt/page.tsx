"use client";

import Form from "@/components/Form";
import { IPrompt } from "@/utils/interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [submitPrompt, setSubmitPrompt] = useState(false);
  const [post, setPost] = useState<IPrompt>({ prompt: "", tag: "" });

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitPrompt(true);

    try {
      const userId = (session?.user as { id: string }).id;
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: userId,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitPrompt(false);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitPrompt={submitPrompt}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
