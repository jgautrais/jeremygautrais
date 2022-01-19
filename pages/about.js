import Container from '../components/Container';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

const Section = ({ children }) => {
    const classes = `mt-3 mb-20`;

    return <section className={classes}>{children}</section>;
};
const H1 = ({ children }) => {
    return <h1 className='text-3xl sm:text-4xl font-bold mb-6'>{children}</h1>;
};

const H2 = ({ children }) => {
    return <h2 className='text-3xl sm:text-4xl font-bold mb-6'>{children}</h2>;
};

export default function Illustration() {
    const router = useRouter();
    const { locale } = router;
    const { t } = useTranslation('about');

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
            <LanguageSwitcher />
            <Section>
                <H1>{t('title')}</H1>
                <div
                    className='profile__img relative mb-8'
                    style={{
                        width: '6rem',
                        height: '6rem',
                    }}
                >
                    <Image
                        alt='Project Illustration'
                        src='/static/images/profile_pic.jpg'
                        layout='fill'
                        objectFit='cover'
                    />
                </div>
                <Trans
                    i18nKey='about:description'
                    components={[
                        <p
                            key='0'
                            className='text-gray-600 dark:text-gray-400 max-w-xl'
                        />,
                        <br key='1' />,
                    ]}
                />
            </Section>
            <br className='mt-8' />
            <Section>
                <H2>{t('contact.title')}</H2>
                <div className='pb-8 mb-12 rounded-xl' id='contact'>
                    <p className='flex mb-6 text-gray-600 dark:text-gray-300'>
                        {t('contact.text')}
                    </p>
                    <div className='flex'>
                        <div>
                            <p className='mb-4'>E-mail:</p>
                            <p>Linkedin:</p>
                        </div>
                        <div className='ml-8 text-blue-600 dark:text-blue-400'>
                            <a
                                href='mailto:contact@jeremygautrais.fr'
                                className='block mb-4 hover:underline'
                            >
                                contact
                            </a>
                            <a
                                href='https://www.linkedin.com/in/jgautrais/'
                                target='_blank'
                                rel='noreferrer'
                                className='block hover:underline'
                            >
                                jgautrais
                            </a>
                        </div>
                    </div>
                </div>
            </Section>
        </Container>
    );
}
