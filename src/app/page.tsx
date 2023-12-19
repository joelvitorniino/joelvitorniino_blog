"use client";

import useSWR from "swr";
import PostsComponent from "./components/PostsComponent";

interface DataType {
  data: {
    title: string;
    metaTitle: string;
    metaDesc: string;
    socialImage: string;
    date: string;
    tags: string[];
  };
  content: string;
  identifier: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR<DataType[]>(
    "http://localhost:3000/api/posts/all",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <div className="flex justify-center items-center h-screen">
      {data?.map((post) => (
        <PostsComponent
          title={post.data.title}
          date={post.data.date}
          url={post.identifier}
        />
      ))}
    </div>
  );
}
