import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeslug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

/**
@type {import ('contentlayer/source-files') .ComputedFields} */
const computedFields = {
    slug: {
        type: 'string',
        resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.split ('/').slice(1).join('/'),
    }
}

export const Doc = defineDocumentType(() => ({
    name: 'Doc',
    filePathPattern: `complete-nextjs/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type:'string',
            required: true,
        },
        description: {
            type: 'string',
        },
        published: {
            type: 'boolean',
        },
    },
    computedFields,
}))

export default makeSource({
    contentDirPath: 'src/content',
    documentTypes: [Doc],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeslug,
            [
                rehypePrettyCode    ,
                {
                    theme: 'github-dark',
                    onVisitLine(node) {
                        if(node.children.length === 0) {
                            node.children = [{ type: 'text', value: ' ' }]
                        }
                    },
                    onVisitHighlightedLine(node) {
                        node.properties.classname.push('line--highlighted')
                    },
                    onVisitHighlightedWord(node) {
                        node.properties.classname = ['word--highlighted']
                    },
                },
            ],  
            [
                rehypeAutolinkHeadings,
                {
                    className: ['subheading-anchor'],
                    ariaLabel: 'Link to section'
                },
            ]
        ],
    }
})