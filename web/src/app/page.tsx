import Image from "next/image";
import { GetList } from "@/libs/client";
import Link from "next/link";

// キャッシュを利用しない
export const revalidate = 0;

export default async function Home() {
  const { contents } = await GetList();

  const time = new Date().toLocaleString();

  if (!contents || contents.length === 0) {
    return <h1>記事がありません</h1>;
  }

  return (
    <div className="my-10 max-w-96 mx-auto">
      <h1 className="text-3xl font-bold text-center">お知らせ</h1>
      <p className="text-center">{time}時点</p>
      <ul className="p-5">
        {contents.map((post) => {
          return (
            <li
              key={post.id}
              className="border shadow-lg text-center rounded my-3"
            >
              <Link href={`/dynamic/${post.id}`} className="block py-3">
                {post.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
