import { NextRequest, NextResponse } from "next/server";

import fs from "fs";
import matter from "gray-matter";

export async function GET(request: NextRequest) {
  const files = fs.readdirSync(
    `/public/posts/`
  );
  const posts = files.map(() => {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const source = fs.readFileSync(
      `/public/posts/${id}.md`,
      "utf-8"
    );
    const { data, content } = matter(source);

    return {
      data,
      content,
    };
  });

  const uniquePostsSet = new Set(posts.map((post) => post.data.date));
  const uniquePosts = Array.from(uniquePostsSet).map((date) =>
    posts.find((post) => post.data.date === date)
  );

  return NextResponse.json(uniquePosts);
};