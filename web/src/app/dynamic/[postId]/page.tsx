import { GetDetail, GetList } from "@/libs/client";
import dynamic from "next/dynamic";

// キャッシュを利用しない
export const revalidate = 0;

export const TagLabels = dynamic(() => import("../Pagecontents"), {
  ssr: false,
  loading: () => (
    <div className="max-w-[1024px] mx-auto my-10 h-screen">
      <h1 className="text-2xl font-bold text-center py-5">Loading...</h1>
      <div className="border rounded-xl shadow-lg h-2/3">
        <div className="animate-pulse w-full h-full bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  ),
});

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
  return (
    <>
      <TagLabels params={{ postId }} />
    </>
  );
}
