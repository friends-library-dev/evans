import React, { useEffect } from 'react';
import cx from 'classnames';
import FocusLock from 'react-focus-lock';
import { InstantSearch } from 'react-instantsearch-dom';
import { getClient } from '../lib/algolia';
import Search from '../algolia/TopNavSearchInput';
import DropdownSearchResults from './DropdownSearchResults';
import { LANG } from '../env';

const searchClient = getClient();

interface Props {
  searching: boolean;
  className?: string;
  setSearching: (newValue: boolean) => any;
}

const SearchLazy: React.FC<Props> = ({ searching, setSearching, className }) => {
  useEffect(() => {
    searching && focusInput();
  }, [searching]);
  return (
    <FocusLock
      disabled={!searching}
      returnFocus
      autoFocus={false}
      className={cx(
        className,
        `TopNavSearch flex-col justify-center items-end relative`,
        searching && `searching flex-grow pl-4 sm:pl-8 md:pl-16`,
        !searching && `flex-grow-0`,
      )}
      lockProps={{ onClick: () => !searching && setSearching(true) }}
    >
      <InstantSearch indexName={`${LANG}_docs`} searchClient={searchClient}>
        <Search searching={searching} defaultRefinement="" />
        {searching && <DropdownSearchResults />}
      </InstantSearch>
    </FocusLock>
  );
};

export default SearchLazy;

function focusInput(): void {
  const input: HTMLInputElement | null = document.querySelector(
    `.TopNavSearch .SearchInput__input`,
  );
  input && input.focus();
}
