import Image from 'next/image';
import { parseISO, format } from 'date-fns';

import Container from '../components/Container';

export default function BlogLayout({ children, frontMatter }) {
  return (
    <Container
      title={`${frontMatter.title} – Jérémy Gautrais`}
      description={frontMatter.summary}
      image={`https://www.jeremygautrais.fr/${frontMatter.image}`}
      date={new Date(frontMatter.publishedAt).toISOString()}
      type='article'
    >
      <article className='flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16'>
        <h1 className='mt-20 mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white'>
          {frontMatter.title}
        </h1>
        <div className='flex flex-col items-start justify-between w-full mb-2 md:flex-row md:items-center'>
          <div className='flex w-full justify-between items-center flex-wrap'>
            <div className='flex items-center mb-2'>
              <p className='text-sm font-bold text-gray-500 dark:text-gray-400'>
                <span className='text-gray-300 dark:text-gray-600'>/ </span>
                Published on:&nbsp;
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
              </p>
            </div>
            <p className='hidden sm:block text-sm text-gray-400 dark:text-gray-500 self-end mb-2'>
              {frontMatter.readingTime.text}
            </p>
          </div>
        </div>
        <div className='w-full mt-4 prose dark:prose-dark max-w-none'>
          {children}
        </div>
        <div className='flex flex-row items-center justify-end w-full mt-20'>
          <p className='text-sm text-gray-400 dark:text-gray-500'>
            <span className='text-gray-300 dark:text-gray-600'>/ </span> Last
            updated:&nbsp;
          </p>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            {format(parseISO(frontMatter.lastUpdatedAt), 'MMMM dd, yyyy')}
          </p>
        </div>
      </article>
    </Container>
  );
}
