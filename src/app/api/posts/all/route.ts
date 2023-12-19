import { NextRequest, NextResponse } from "next/server";

import fs from "fs";
import matter from "gray-matter";

export async function GET(request: NextRequest) {
  const files = fs.readdirSync(
    `/home/vitorniino/Documents/joelvitorniino_blog/public/posts`
  );
  const posts = files.map((file) => {    
    const source = fs.readFileSync(
      `/home/vitorniino/Documents/joelvitorniino_blog/public/posts/${file}`,
      "utf-8"
    );
    const { data, content } = matter(source);

    return {
      data,
      content,
      identifier: file.replace(".md", ""),
    };
  });

  return NextResponse.json(posts);
}
