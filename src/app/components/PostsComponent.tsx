interface PostProps {
    title: string;
    date: string;
    description: string;
    content: string;
};

export default function PostComponent({ title, date, description, content }: PostProps) {
    return (
        <article className="bg-black text-white p-6 mb-6 rounded-md shadow-md">
            <h2 className="text-3xl font-bold mb-3">{title}</h2>
            <p className="text-sm text-gray-500 mb-3">{date}</p>
            <p className="text-lg leading-relaxed">{description}</p>
            <div className="text-lg leading-relaxed">{content}</div>
        </article>  
    )
}