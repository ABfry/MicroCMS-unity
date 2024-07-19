import Link from "next/link";
import { GetList } from "@/libs/client";

export default async function StaticPage() {
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
              <Link href={`/static/${post.id}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
