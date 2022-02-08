import useTranslation from 'next-translate/useTranslation';

const Skills = () => {
    const { t } = useTranslation('home');

    const H3 = ({ children }) => {
        return (
            <h3 className='text-2xl font-medium text-gray-500 dark:text-gray-400 mt-8 mb-2 mt-0'>
                {children}
            </h3>
        );
    };

    const PSkills = ({ children }) => {
        return (
            <p className='mt-1.5 fonnt-normal flex items-center'>
                <span className='d-block w-2 h-0.5 ml-3 mr-2 mb-0.5 bg-gradient-to-r from-blue-300 dark:from-blue-600 to-blue-500 rounded-sm'></span>
                {children}
            </p>
        );
    };

    return (
        <>
            <div className='md:grid md:grid-cols-2' id='skills'>
                <div className='mb-6'>
                    <H3>Front-End</H3>
                    <PSkills>HTML5</PSkills>
                    <PSkills>CSS/Sass, Bootstrap, Tailwind</PSkills>
                    <PSkills>JavaScript, ES6, jQuery</PSkills>
                    <PSkills>React</PSkills>
                </div>
                <div className='mb-6'>
                    <H3>Back-End</H3>
                    <PSkills>PHP, Symfony, Twig</PSkills>
                    <PSkills>Nodejs, Express</PSkills>
                </div>

                <div className='mb-6'>
                    <H3>Databases</H3>
                    <PSkills>mySQL</PSkills>
                    <PSkills>Doctrine ORM</PSkills>
                </div>

                <div className='mb-6'>
                    <H3>Design</H3>
                    <PSkills>Figma</PSkills>
                    <PSkills>Adobe Illustrator, Affinity Designer</PSkills>
                </div>

                <div>
                    <H3>{t('skills.tools')}</H3>
                    <PSkills>git, npm, yarn, composer</PSkills>
                </div>
            </div>
        </>
    );
};

export default Skills;
