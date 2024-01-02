"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import Image from "next/image";
import { toast } from "@/components/UI/Toast/use-toast";

import React, { ChangeEvent, HTMLInputTypeAttribute } from "react";
import { supabase } from "@/lib/supabase";
import { UserProps } from "@/types/supabase.interface";
import { useAppSelector } from "@/context/hooks";

interface ImagesTabProps {
  user: UserProps;
}

export default function ImagesTab({ user: userProps }: ImagesTabProps) {
  const { user } = useAppSelector((state) => state.user);
  const {
    id: userId,
    firstname,
    lastname,
    address,
    birthday,
    created_at,
    info,
    privilege,
    username,
  } = userProps;

  const coverPhotoUrl = supabase.storage
    .from("cover_photos")
    .getPublicUrl(`${userId}`).data.publicUrl;

  const imageUrl = supabase.storage.from("avatars").getPublicUrl(`${userId}`)
    .data.publicUrl;

  async function handleUploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    try {
      const file = event.target.files && event?.target.files[0];
      if (!file) throw new Error("File not found!");

      const blob = new Blob([file], { type: file.type });
      const newFile = new File([blob], userId, { type: file.type });
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${userId}`, newFile, { upsert: true, cacheControl: "3600" });
      if (error) throw new Error(error.message);
      toast({
        title: "Avatar Upload Success",
        description: "File was uploaded successfully",
      });
    } catch (error: any) {
      toast({ title: "Avatar Upload Error", description: error.message });
    }
  }

  async function handleUploadCoverPhoto(event: ChangeEvent<HTMLInputElement>) {
    try {
      const file = event.target.files && event?.target.files[0];
      if (!file) throw new Error("File not found!");

      const blob = new Blob([file], { type: file.type });
      const newFile = new File([blob], userId, { type: file.type });
      const { data, error } = await supabase.storage
        .from("cover_photos")
        .upload(`${userId}`, newFile, { upsert: true, cacheControl: "3600" });
      if (error) throw new Error(error.message);
      toast({
        title: "Cover Photo Upload Success",
        description: "File was uploaded successfully",
      });
    } catch (error: any) {
      toast({ title: "Cover Photo Upload Error", description: error.message });
    }
  }
  return (
    <div className="relative">
      <div className="w-full h-36 relative">
        <Image
          className="w-full h-full bg-gradient-to-br bg-slate-200"
          alt="cover"
          width={1000}
          height={500}
          src={coverPhotoUrl}
        />
        {user && user.id === userId && (
          <input
            className="w-full h-full absolute top-0 left-0 opacity-0"
            type="file"
            onChange={handleUploadCoverPhoto}
          />
        )}
      </div>

      <div className="absolute left-5 top-16">
        <Avatar
          className={
            "transition-all h-32 w-auto aspect-square absolute z-10 cursor-pointer hover:scale-105"
          }
        >
          <AvatarImage src={imageUrl} />
          <AvatarFallback className="text-3xl font-bold ">
            {[firstname, lastname]
              .map((str) => {
                return str ? str[0].toUpperCase() : "";
              })
              .join("")}
          </AvatarFallback>
          {user && user.id === userId && (
            <input
              className="w-full h-full rounded-full absolute opacity-0"
              type="file"
              onChange={handleUploadAvatar}
            />
          )}
        </Avatar>
      </div>
    </div>
  );
}
