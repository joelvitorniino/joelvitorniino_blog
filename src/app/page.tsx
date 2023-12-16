async function getData() {
  const res = await fetch('http://localhost:3000/api/posts?id=test', { cache: 'force-cache' });

  if(!res.ok) {
    throw new Error('Failed to fetch data');
  };

  return res.json();
}

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

export default async function Home() {
  const data: DataType[] = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 md:p-0 mt-8">
      <h1>{ data.map(post => post.data.title) }</h1>
      <h2>{ data.map(post => post.content) } </h2>
    </div>
  )
}
