"use client";

import Form from "@/components/Form";
import { IPrompt } from "@/utils/interfaces";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParamas = useSearchParams();
  const promptId = searchParamas.get("id");

  const [post, setPost] = useState<IPrompt>({ prompt: "", tag: "" });
  const [submitPrompt, setSubmitPrompt] = useState(false);

  useEffect(() => {
    if (!promptId) return;
    (async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost(data);
    })();
  }, [promptId]);

  const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitPrompt(true);

    if (!promptId) {
      return alert("Missing Prompt Id");
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
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

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitPrompt={submitPrompt}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
