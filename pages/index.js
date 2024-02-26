import { useRouter } from 'next/router';
import Container from '../components/Container';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import PostCard from '../components/PostCard';
import { getAllFilesFrontMatter } from '../utils/mdx';

import LanguageSwitcher from '../components/LanguageSwitcher';
import Skills from '../components/Skills';
import Projects from '../components/Projects';

const H1 = (props) => (
  <h1
    className='text-4xl md:text-5xl tracking-tighter font-bold mb-8'
    {...props}
  />
);

const PHero = (props) => (
  <p
    className='pr-10 sm:pr-20 md:pr-44 lg:pr-64 font-medium text-gray-700 dark:text-gray-300'
    {...props}
  />
);

const Section = ({ children, hero = false }) => {
  const classes = `${
    hero ? 'sm:pl-20 mt-20 mb-28 md:mb-36' : 'my-28 md:my-36'
  }`;

  return <section className={classes}>{children}</section>;
};

const H2 = ({ children }) => {
  return <h2 className='text-3xl sm:text-4xl font-bold mb-6'>{children}</h2>;
};

export default function Home({ posts }) {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation('home');

  const lastPosts = posts
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .slice(0, 3);

  return (
    <Container
      title={
        locale === 'en'
          ? 'Jérémy Gautrais – Web Developer'
          : 'Jérémy Gautrais – Développeur Web'
      }
      description={
        locale === 'en'
          ? 'Web developer, JavaScript, PHP enthusiast, and voxel artist.'
          : 'Développeur web PHP et JavaScript, et artiste voxel, basé à Lyon.'
      }
    >
      <LanguageSwitcher/>

      <Section hero={true}>
        <Trans
          i18nKey='home:header'
          components={[
            <H1 key='0'/>,
            <span key='1' className='text-blue-500'/>,
          ]}
        />
        <Trans
          i18nKey='home:sub_header'
          components={[
            <PHero key='0'/>,
            <b key='1' className='text-black dark:text-white'/>,
            <br key='2'/>,
          ]}
        />
      </Section>

      <Section>
        <H2>{t('skills.title')}</H2>
        <Skills/>
      </Section>
      <span id='projects'></span>
      <Section>
        <H2>{t('projects')}</H2>
        <Projects/>
      </Section>

      <section>
        <H2>{t('posts')}</H2>
        <div className='flex flex-col md:flex-row'>
          {lastPosts.map((frontMatter) => (
            <PostCard key={frontMatter.title} {...frontMatter} />
          ))}
        </div>
      </section>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog');

  return {props: {posts}};
}
