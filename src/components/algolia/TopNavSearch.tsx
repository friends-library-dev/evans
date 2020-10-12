import React from 'react';
import cx from 'classnames';
import SearchInput from '../SearchInput';
import './TopNavSearch.css';

interface Props {
  searching: boolean;
  setSearching: (newValue: boolean) => any;
  className?: string;
}

const LazySearch = React.lazy(() => import(`./SearchLazy`));

const TopNavSearch: React.FC<Props> = ({ className, searching, setSearching }) => {
  if (!searching) {
    return <PlaceholderSearch searching={searching} onClick={() => setSearching(true)} />;
  }
  return (
    <React.Suspense fallback={<PlaceholderSearch searching={searching} />}>
      <LazySearch
        searching={searching}
        className={className}
        setSearching={setSearching}
      />
    </React.Suspense>
  );
};

export default TopNavSearch;

const PlaceholderSearch: React.FC<{ onClick?: () => any; searching: boolean }> = ({
  onClick,
  searching,
}) => (
  <div
    className={cx(
      `TopNavSearch w-10 flex flex-col justify-center items-end`,
      searching ? `flex-grow` : `flex-grow-0`,
    )}
    onClick={onClick}
  >
    <SearchInput
      small
      lineColor="flprimary"
      textColor="flgray-600"
      open={false}
      query=""
      setQuery={() => {}}
    />
  </div>
);
