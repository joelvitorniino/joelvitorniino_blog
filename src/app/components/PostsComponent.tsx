import Link from "next/link";

interface PostProps {
  title: string;
  date: string;
  url: string;
}

export default function PostComponent({ title, date, url }: PostProps) {
  return (
    <article className="bg-black text-white p-6 mb-6 rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-3">{title}</h2>
      <p className="text-sm text-gray-500 mb-3">{date}</p>
      <Link
        href={`/post/${url}` ?? ""}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Details
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </Link>
    </article>
  );
}
