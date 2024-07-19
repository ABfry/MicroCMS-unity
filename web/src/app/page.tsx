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
    <div>
      <h1>{time}</h1>
      <ul>
        {contents.map((post) => {
          return (
            <li key={post.id}>
              <Link href={`/dynamic/${post.id}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
