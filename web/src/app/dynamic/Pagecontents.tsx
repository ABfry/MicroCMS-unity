import React from "react";
import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { GetDetail } from "@/libs/client";

export default async function PageContents({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const post = await GetDetail(postId);

  if (!post) {
    notFound();
  }

  //1秒待つ
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="max-w-[1024px] mx-auto my-10">
      <h1 className="text-2xl font-bold text-center py-5">{post.title}</h1>
      <div className="border rounded-xl shadow-lg p-10">
        {parse(post.content)}
      </div>
    </div>
  );
}
