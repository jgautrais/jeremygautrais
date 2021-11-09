import React from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

const Nav = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale } = router;

  console.log(router.pathname);

  function toggleMenu() {
    const btn = document.getElementById('menuBtn');
    const nav = document.getElementById('menu');
    if (getComputedStyle(btn).display === 'block') {
      btn.classList.toggle('open');
      nav.classList.toggle('flex');
      nav.classList.toggle('hidden');
      document.body.classList.toggle('non-scrollable');
    }
  }

  const MenuLink = React.forwardRef(({ children, href, onClick }, ref) => (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      className={`text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white text-base w-full no-underline md:w-auto md:px-4 pb-4 pt-8 md:py-1 md:pt-2 border-b md:border-b-0 border-gray-200 dark:border-gray-700 text-lg md:text-base ${
        router.pathname == href ||
        (router.pathname.split('fr')[0] === '/' && href === '/fr') ||
        router.pathname.split('fr')[0] === href.split('fr')[1] ||
        router.pathname.split('/')[1] === href.split('/')[1]
          ? 'font-bold'
          : ''
      }`}
    >
      {children}
    </a>
  ));
  MenuLink.displayName = 'MenuLink';

  return (
    <nav
      id='site-menu'
      className='order-2 md:order-1 flex flex-col md:flex-row w-full justify-center items-center px-2 md:px-6 py-1'
    >
      <div className='z-40 w-full md:w-auto self-start md:self-center flex flex-row-reverse md:flex-none flex-no-wrap justify-between items-center'>
        <button
          id='menuBtn'
          aria-label='Toggle Mobile Menu'
          className='hamburger block md:hidden focus:outline-none'
          type='button'
          onClick={toggleMenu}
        >
          <span className='hamburger__top-bun'></span>
          <span className='hamburger__bottom-bun'></span>
        </button>
      </div>
      <div
        id='menu'
        className='no-scrollbar w-full md:w-auto self-end md:self-center md:flex flex-col md:flex-row items-center h-screen md:h-auto px-8 sm:px-16 md:px-0 pb-4 hidden absolute left-0 -top-4 md:top-0 pt-28 md:pt-0 md:mt-0 md:relative bg-white dark:bg-dark-theme md:bg-transparent overflow-y-scroll md:overflow-auto'
      >
        <Link href='/' passHref>
          <MenuLink onClick={toggleMenu}>{t('navbar.home')}</MenuLink>
        </Link>
        <Link href='/blog' passHref>
          <MenuLink onClick={toggleMenu}>Blog</MenuLink>
        </Link>
        <Link href='/illustration' passHref>
          <MenuLink onClick={toggleMenu}>Illustration</MenuLink>
        </Link>
        <Link href='/about' passHref>
          <MenuLink onClick={toggleMenu}>{t('navbar.about')}</MenuLink>
        </Link>
        <a
          href={`/cv/CV_Jeremy_Gautrais${locale === 'en' ? 'EN' : 'FR'}.pdf`}
          target='_blank'
          className='text-gray-500 dark:text-gray-300 font-normal hover:text-black dark:hover:text-white text-base w-full no-underline md:w-auto md:px-4 pb-4 pt-8 md:py-1 md:pt-2 border-b md:border-b-0 border-gray-200 dark:border-gray-700 text-lg md:text-base'
          rel='noreferrer'
          onClick={toggleMenu}
        >
          CV
        </a>
      </div>
    </nav>
  );
};

export default Nav;
