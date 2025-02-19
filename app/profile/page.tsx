"use client";

import Profile from "@/components/Profile";
import { IUserPrompt } from "@/utils/interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState<IUserPrompt[]>([]);

  const userId = session && (session?.user as { id: string }).id;

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setMyPosts(data);
    })();
  }, [userId]);

  const handleEdit = (post: IUserPrompt) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: IUserPrompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
