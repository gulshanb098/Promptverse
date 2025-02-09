"use client";

import PromptCard from "@/components/PromptCard";
import { IUserProfile, IUserPrompt } from "@/utils/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const ProfilePage = ({ params }: Props) => {
  const router = useRouter();
  const [profileData, setProfileData] = useState<IUserProfile | null>(null);
  const [userPrompts, setUserPrompts] = useState<IUserPrompt[]>([]);

  const { id } = use(params);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        const data = await res.json();
        setProfileData(data);
      } catch (error) {
        // console.error("Error fetching profile:", error);
        router.replace("/");
      }
    };

    fetchProfile();
  }, [id]);

  useEffect(() => {
    const fetchUserPrompts = async () => {
      try {
        const res = await fetch(`/api/users/${id}/posts`);
        const data = await res.json();
        setUserPrompts(data);
      } catch (error) {
        // console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPrompts();
  }, [id]);

  if (!profileData) return <p>Loading...</p>;

  return (
    <div className="mt-2 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
        <Image
          src={profileData.image}
          width={96}
          height={96}
          className="w-24 h-24 mx-auto rounded-full border-4 border-gray-200 shadow-sm"
          alt="Profile"
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {profileData.username}
        </h2>
        {/* <p className="text-gray-500">{profileData.email}</p> */}
      </div>

      {/* User Posts Section */}
      <div className="prompt_layout">
        {userPrompts.map((post, index) => (
          <PromptCard key={post._id || index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
