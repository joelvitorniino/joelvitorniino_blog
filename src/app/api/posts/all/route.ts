import { NextRequest, NextResponse } from "next/server";

import fs from "fs";
import matter from "gray-matter";

import NodeCache from "node-cache";

const cache = new NodeCache();

export async function GET(request: NextRequest) {
  const cachedData = cache.get("postsCacheKey");
  if (cachedData) {
    return NextResponse.json(cachedData);
  };

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

  cache.set("postsCacheKey", posts);

  return NextResponse.json(posts);
};