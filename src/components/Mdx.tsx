import React from 'react';
import cx from 'classnames';

const components: { [key: string]: React.FC } = {
  h2: ({ children }) => (
    <h2
      className={cx(
        `bg-flprimary text-white font-sans text-2xl bracketed tracking-widest`,
        `my-12 -mx-10 py-4 px-10`,
        `sm:text-3xl`,
        `md:-mx-16 md:px-16 `,
        `lg:-mx-24 lg:px-24`,
      )}
    >
      {children}
    </h2>
  ),

  p: ({ children }) => (
    <p className="mb-6 pb-1 text-base sm:text-lg leading-loose">{children}</p>
  ),

  li: ({ children }) => <li className="py-2">{children}</li>,

  h3: ({ children }) => (
    <h3 className="font-sans text-flprimary mb-2 text-2xl">{children}</h3>
  ),

  a: (props) => (
    <a className="text-flprimary fl-underline" {...props}>
      {props.children}
    </a>
  ),

  blockquote: ({ children }) => (
    <blockquote
      className={cx(
        `italic tracking-wider bg-flgray-100 leading-loose`,
        `py-4 px-8 my-8`,
      )}
    >
      {children}
    </blockquote>
  ),

  ul: ({ children }) => (
    <ul
      className={cx(
        `diamonds leading-normal bg-flgray-100 text-base sm:text-lg`,
        `py-4 px-16 mb-8`,
      )}
    >
      {children}
    </ul>
  ),

  Lead: ({ children }) => <div className="Lead">{children}</div>,
};

export default components;
