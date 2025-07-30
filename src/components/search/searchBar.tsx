import { useState } from "react";
import searchCss from "./searchBar.module.scss";
import type { SearchComponentType } from "../../types/types";


const SearchBar = ({ searchId, sidebarOpen, onSearch, placeHolder, customClsform, customClsfocus, customClsinput, customClsbutton, icon }: SearchComponentType) => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!search.trim()) {
      setError('Please enter a search location.');
      return;
    }
    try {
      await onSearch?.(search);
      setIsFocused(false);
    } catch (err) {
      console.log(err);
      setError('Error searching for place.');
    }
  };

  // const handleFocus = () => {
  //   if (!isFocused) {
  //     setIsFocused(true);
  //   }
  // };

  // const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  //   const relatedTarget = e.relatedTarget as HTMLElement;
  //   if (relatedTarget && relatedTarget.closest('button')) {
  //     return;
  //   }
  //   setIsFocused(false);
  // };

  return (
    <>
      <form onSubmit={handleSearch} className={`${searchCss[`lip-search__${customClsform}`]} ${isFocused ? searchCss[`lip-search__form--${customClsfocus}`] : ''} ${sidebarOpen ? searchCss["lip-search__form--sidebar-open"] : ''}`}>
        <input type="text" id={searchId} value={search} onChange={e => setSearch(e.target.value)} placeholder={placeHolder} className={`${searchCss[`lip-search__${customClsinput}`]} ${isFocused ? searchCss[`lip-search__input--${customClsfocus}`] : ''}`} />
        <button type="submit" className={`${searchCss[`lip-search__${customClsbutton}`]}`}><img src={icon} alt="Search Icon" /></button>
      </form>
      {error && <div className={searchCss["lip-search__error"]}>{error}</div>}
    </>
  )
}

export default SearchBar