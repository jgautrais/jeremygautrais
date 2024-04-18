import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseISO, format } from 'date-fns';

const BlogPost = ({ title, summary, publishedAt, readingTime, slug }) => {
    const router = useRouter();
    const { defaultLocale } = router;

    return (
        <Link href={`/${defaultLocale}/blog/${slug}`} locale={false}>
            <a className='w-full'>
                <div className='mb-9 w-full max-w-xl'>
                    <div className='flex flex-col md:flex-row justify-between'>
                        <h3 className='text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100'>
                            {title}
                        </h3>
                    </div>
                    <p className='text-gray-600 dark:text-gray-400 text-sm'>
                        {summary}
                    </p>
                    <div className='mt-4 text-xs text-gray-400 dark:text-gray-500 text-right'>
                        <span>
                            {format(parseISO(publishedAt), 'MMMM dd, yyyy')}
                        </span>
                        <span className='text-gray-300 dark:text-gray-700'>
                            {' • '}
                        </span>
                        <span className='mr-2'>{readingTime.text}</span>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default BlogPost;
