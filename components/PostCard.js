import Link from 'next/link';
import { useRouter } from 'next/router';

const PostCard = ({ title, summary, slug }) => {
  const router = useRouter();
  const { defaultLocale } = router;

  return (
    <Link href={`/${defaultLocale}/blog/${slug}`} locale={false}>
      <a className='w-full md:w-5/12 lg:w-4/12 md:mr-4'>
        <div className='mb-8 w-full border-2 border-gray-300 dark:border-gray-100 dark:border-opacity-25 py-3 md:py-4 px-6 rounded-xl'>
          <div className='flex flex-col md:flex-row justify-between'>
            <h4 className='text-lg md:text-xl font-medium w-full text-gray-900 dark:text-gray-100 mb-2'>
              {title}
            </h4>
          </div>
          <p className='text-gray-600 text-sm dark:text-gray-400 mb-1'>
            {summary}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default PostCard;
