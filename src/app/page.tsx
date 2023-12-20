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
    <div className="flex flex-col items-center justify-center min-h-screen">
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold">Joel Vitor</h1>
      <p className="text-gray-500">
        Olá! Me chamo Joel Vitor, tenho 17 anos. 
        <br />
        Este blog foi criado com o propósito de partilhar meus pensamentos, experiências com idiomas e a programação.
      </p>
    </header>

    <div className="flex justify-center items-center">
      {data?.map((post) => (
        <PostsComponent
          key={post.identifier}
          title={post.data.title}
          date={post.data.date}
          url={post.identifier}
        />
      ))}
    </div>
  </div>
  );
}
