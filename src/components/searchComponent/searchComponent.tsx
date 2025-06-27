  import { useEffect, useRef, useState } from "react";
  import styles from './searchComponent.module.scss';
  import { Images } from "../../assets/assets"


  type SearchComponentProps = {
    onPositionChange: (newPosition: [number, number]) => void;
    onZoomChange: (newZoom: number) => void;
  };


  const SearchComponent = ({onPositionChange, onZoomChange} : SearchComponentProps) => {
      const [search, setSearch] = useState('');
      const [error, setError] = useState('');
      const [isFocused, setIsFocused] = useState(false);
      const inputRef = useRef<HTMLInputElement>(null);

      useEffect(() => {
        inputRef.current?.focus();
      }, []);

      const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');
      if (!search.trim())
      {
        setError('Please enter a search location.');
        return;
      }
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          onPositionChange([lat, lon]);
          onZoomChange(15);
          // setSearch('');
          setIsFocused(false);

        } else {
          setError('Place not found.');
        }
      } catch (err) {
          console.log(err);
          setError('Error searching for place.');
      }
    };

    const handleFocus = () => {
      if (!isFocused) {
        setIsFocused(true);
        console.log('Input focused');
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (relatedTarget && relatedTarget.closest('button')) {
        return;
      }
      console.log('Input blurred'); 
      setIsFocused(false);
    };

    return (
      <div>
          <form
              onSubmit={handleSearch}
              className={`${styles["search-component__form"]} ${isFocused ? styles["search-component__form--focused"] : ''}`}
          >
              <input 
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Search"
                  className={`${styles["search-component__input"]} ${isFocused ? styles["search-component__input--focused"] : ''}`}
              />
              <button type="submit" className={styles["search-component__button"]}>
                  <img src={Images?.searchIcon} alt="Search Icon" />
              </button>
          </form>
          {error && <div className={styles["search-component__error"]}>{error}</div>}
      </div>
    )
  }

  export default SearchComponent