import { ClockIcon } from "@heroicons/react/24/outline";

interface PostProps {
  title: string;
  date: string;
  hour: string;
  imgUrl?: string;
  content: string;
  tags?: string[];
  approximatedTime: string;
}

export default function Post({ title, date, hour, imgUrl, content, tags, approximatedTime }: PostProps) {
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
     <p className="text-sm text-gray-500 mb-4 flex items-center">
        {date} at (<ClockIcon className="h-4 w-4 mr-1" /> {hour})
      </p>
      <p className="text-sm text-gray-500 mb-3 font-bold">
        { approximatedTime }
      </p>
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
