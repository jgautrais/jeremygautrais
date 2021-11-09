import Link from 'next/link';
import { useRouter } from 'next/router';

const PostCard = ({ title, slug }) => {
  const router = useRouter();
  const { defaultLocale } = router;

  return (
    <Link href={`/${defaultLocale}/blog/${slug}`} locale={false}>
      <a className='w-full md:w-5/12 lg:w-4/12 md:mr-4'>
        <div className='mb-8 w-full px-8 py-4 border-4 border-purple-300 rounded-xl'>
          <div className='flex flex-col md:flex-row justify-between'>
            <h4 className='text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100'>
              {title}
            </h4>
          </div>
          {/* <p className='text-gray-600 dark:text-gray-400'>{summary}</p> */}
        </div>
      </a>
    </Link>
  );
};

export default PostCard;
