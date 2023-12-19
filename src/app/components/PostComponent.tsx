'use client';

import Link from "next/link";

interface PostProps {
    title: string;
    date: string;
    description: string;
    content: string;
};

export default function Post ({ title, date, description, content }: PostProps) {
  return (
    <div className="max-w-2xl mx-auto bg-black text-white p-8 mb-8 rounded-md shadow-md">
      <h1 className="text-4xl font-bold mb-5">{title}</h1>
      <p className="text-sm text-gray-500 mb-4">{date}</p>
      <p className="text-lg mb-6">{description}</p>
      <div className="text-lg leading-relaxed">{content}</div>
    </div>
  );
};