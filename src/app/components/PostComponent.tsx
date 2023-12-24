interface PostProps {
  title: string;
  date: string;
  content: string;
}

export default function Post({ title, date, content }: PostProps) {
  const sanitizedContent = { __html: content };

  return (
    <div className="max-w-2xl mx-auto bg-black text-white p-8 mb-8 rounded-md shadow-md">
      <h1 className="text-4xl font-bold mb-5">{title}</h1>
      <p className="text-sm text-gray-500 mb-4">{date}</p>
      <div
        className="text-lg leading-relaxed"
        dangerouslySetInnerHTML={sanitizedContent}
      />
    </div>
  );
}
  