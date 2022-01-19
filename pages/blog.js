import { useState } from 'react';

import Container from '../components/Container';
import BlogPost from '../components/BlogPost';
import { getAllFilesFrontMatter } from '../utils/mdx';

const Section = ({ children }) => {
    return <section className='mt-12 my-20'>{children}</section>;
};

const H1 = ({ children }) => {
    return <h1 className='text-3xl sm:text-4xl font-bold mb-6'>{children}</h1>;
};

export default function Blog({ posts }) {
    const [searchValue, setSearchValue] = useState('');
    const filteredBlogPosts = posts
        .sort(
            (a, b) =>
                Number(new Date(b.publishedAt)) -
                Number(new Date(a.publishedAt))
        )
        .filter((frontMatter) =>
            frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
        );

    return (
        <Container
            title='Blog – Jérémy Gautrais'
            description='Thoughts on programming, tech, and my personal life.'
        >
            <Section>
                <H1>Blog</H1>
                <div className='relative w-full mb-4 max-w-xl'>
                    <input
                        aria-label='Search articles'
                        type='text'
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='Search articles'
                        className='px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                        value={searchValue}
                    />
                    <svg
                        className='absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                        />
                    </svg>
                </div>
                <h2 className='font-bold text-2xl md:text-3xl tracking-tight mb-8 mt-16 text-black dark:text-white'>
                    All Posts
                </h2>
                {!filteredBlogPosts.length && (
                    <p className='text-gray-600 dark:text-gray-400 mb-4'>
                        No posts found.
                    </p>
                )}
                {filteredBlogPosts.map((frontMatter) => (
                    <BlogPost key={frontMatter.title} {...frontMatter} />
                ))}
            </Section>
        </Container>
    );
}

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter('blog');

    return { props: { posts } };
}
