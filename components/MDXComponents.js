import Link from 'next/link';
import Image from 'next/image';
import Highlight, { defaultProps } from 'prism-react-renderer';
import palenight from 'prism-react-renderer/themes/palenight';
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight';
import { useTheme } from 'next-themes';

const CustomLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return <a target='_blank' rel='noopener noreferrer' {...props} />;
};

const CodeBlock = (props) => {
  const { resolvedTheme } = useTheme();
  const className = props.children.props.className;
  const language = className.replace(/language-/, '');
  const theme = resolvedTheme === 'light' ? nightOwlLight : palenight;

  return (
    <Highlight
      {...defaultProps}
      code={props.children.props.children}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

const MDXComponents = {
  Image,
  a: CustomLink,
  pre: CodeBlock,
};

export default MDXComponents;
