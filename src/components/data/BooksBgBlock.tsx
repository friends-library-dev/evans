import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import MultiBookBgBlock from '../blocks/MultiBookBgBlock';

type Props = Omit<React.ComponentProps<typeof MultiBookBgBlock>, 'bgImg'>;

const BooksBgBlock: React.FC<Props> = (props) => {
  const data = useStaticQuery(graphql`
    query BooksBgBlock {
      books: file(relativePath: { eq: "explore-books.jpg" }) {
        image: childImageSharp {
          fluid(quality: 90, maxWidth: 825) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);
  return <MultiBookBgBlock bgImg={data.books.image.fluid} {...props} />;
};

export default BooksBgBlock;

export const WhiteOverlay: React.FC = ({ children }) => (
  <div className="bg-white text-center py-12 md:py-16 lg:py-20 px-10 sm:px-16 my-6 max-w-screen-md mx-auto">
    {children}
  </div>
);
