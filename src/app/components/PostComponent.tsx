interface PostProps {
  title: string;
  date: string;
  imgUrl?: string;
  content: string;
  tags?: string[]; // Adicionando a propriedade de tags
}

export default function Post({ title, date, imgUrl, content, tags }: PostProps) {
  const sanitizedContent = { __html: content };

  return (
    <div className="max-w-2xl mx-auto bg-black text-white p-8 mb-8 rounded-md shadow-md">
      <h1 className="text-4xl font-bold mb-5">{title}</h1>
      {imgUrl && (
        <img
          src={imgUrl}
          alt={title}
          className="w-auto h-auto mb-4 rounded-md shadow-md"
        />
      )}
      <p className="text-sm text-gray-500 mb-4">{date}</p>
      <div
        className="text-lg leading-relaxed"
        dangerouslySetInnerHTML={sanitizedContent}
      />
      {tags && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
