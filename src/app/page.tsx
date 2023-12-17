"use client";

import useSWR from "swr";

interface DataType {
  data: {
    title: string;
    metaTitle: string;
    metaDesc: string;
    socialImage: string;
    date: string;
    tags: string[];
  },
  content: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR<DataType[]>('http://localhost:3000/api/posts?id=test', fetcher);   

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 md:p-0 mt-8">
      <h1>{ data?.map(post => post.data.title) }</h1>
      <h2>{ data?.map(post => post.content) } </h2>
    </div>
  )
}
