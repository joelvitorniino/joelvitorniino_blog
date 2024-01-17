"use client";

import PostComponent from "@/app/components/PostComponent";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";

interface DataType {
  data: {
    title: string;
    metaTitle: string;
    metaDesc: string;
    socialImage: string;
    date: string;
    tags: string[];
    keywords: string[];
    italicWords: string[];
    linkPosts: string[];
  };
  content: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Post() {
  const router = usePathname();
  const regex = /\/post\/(\w+)/;

  const match = regex.exec(router);

  let slug;

  if (match && match[1]) {
    const result = match[1];
    slug = result;
  }

  const { data, error, isLoading } = useSWR<DataType[]>(
    `http://localhost:3000/api/posts?id=${slug}`,
    fetcher
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  const highlightWords = (
    keywords: string[],
    italicWords: string[],
    linkPosts: string[],
    text: string
  ): string => {
    keywords?.forEach((keyword) => {
      text = text.replace(
        `**${keyword}**`,
        `<span class="bg-yellow-200 text-black font-bold p-1 rounded">${keyword}</span>`
      );
    });

    italicWords?.forEach((word) => {
      text = text.replace(
        `*${word}*`,
        `<span class="italic text-gray-400">${word}</span>`
      );
    });

    linkPosts?.forEach((url, index) => {
      text = text.replace(
        `{${url}}`,
        `<a href="${url}" class="text-blue-500 hover:underline focus:outline-none focus:ring focus:border-blue-300">Matéria ${index + 1}</a>`
      )
    })

    return text;
  };

  return (
    <div className="max-w-2xl mx-auto bg-black text-white p-8 mb-8 rounded-md shadow-md">
      <Link
        href={"/"}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Home
      </Link>
      {data?.map((post) => {
        const content = highlightWords(
          post.data.keywords,
          post.data.italicWords,
          post.data.linkPosts,
          post.content
        );

        if (post.data.socialImage.length > 0) {
          return (
            <PostComponent
              key={post.data.title}
              title={post.data.title}
              date={post.data.date}
              imgUrl={post.data.socialImage}
              content={content}
              tags={post.data.tags}
            />
          );
        }

        return (
          <PostComponent
            title={post.data.title}
            date={post.data.date}
            content={content}
          />
        );
      })}
    </div>
  );
}
