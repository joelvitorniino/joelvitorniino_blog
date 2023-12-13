import { allDocs } from 'contentlayer/generated'
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        slug: string
    }
}

async function getDocFromParams(slug: string) {
    const doc = allDocs.find((doc) => doc.slugAsParams === slug);

    if(!doc) notFound();

    return doc;
}

export default async function Page({ params }: PageProps) {
    const doc = await getDocFromParams(params.slug);

    return (
        <>
            <h1 className='text-slate-800 font-bold'>{ doc.title }</h1>
            <p className='text-green-400'>{ doc.body.raw }</p>
        </>
    )
}