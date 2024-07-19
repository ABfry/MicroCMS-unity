import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { GetDetail, GetList } from "@/libs/client";

// キャッシュを利用しない
export const revalidate = 0;

export async function generateStaticParams() {
  const { contents } = await GetList();

  const paths = contents.map((post) => {
    return {
      postId: post.id,
    };
  });

  return [...paths];
}

export default async function DynamicDetailPage({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const post = await GetDetail(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-[1024px] mx-auto my-10">
      <h1 className="text-2xl font-bold text-center py-5">{post.title}</h1>
      <div className="border rounded-xl shadow-lg p-10">
        {parse(post.content)}
      </div>
    </div>
  );
}
