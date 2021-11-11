import Link from 'next/link';
import Image from 'next/image';
import Highlight, { defaultProps } from 'prism-react-renderer';
import Prism from 'prism-react-renderer/prism';
import codeTheme from '../styles/codeTheme';

(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-php');

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
  const className = props.children.props.className;
  const language = className.replace(/language-/, '');

  return (
    <Highlight
      {...defaultProps}
      code={props.children.props.children}
      language={language}
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
