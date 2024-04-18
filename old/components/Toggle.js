const Toggle = ({ children, handleClick, value, aria }) => {
  return (
    <button
      aria-label={aria}
      value={value}
      type='button'
      className={`${
        !value
          ? 'z-50 absolute right-24 sm:right-32 md:right-0 md:relative '
          : ''
      } order-1 md:order-1 w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center text-xs flex-shrink-0 self-center hover:ring-2 ring-gray-300  transition-all m-w-max ${
        value ? 'ml-auto sticky top-20' : ''
      }`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Toggle;
