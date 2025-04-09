import { useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import "./SearchBar.scss";

const SearchBar = (props) => {
  const [query, setQuery] = useState("");

  // store search query
  const storeInputHander = (e) => {
    setQuery(e.target.value);
  };

  const clearInputHandler = () => {
    setQuery("");
  }

  return (
    <form
      className={props.className ? `searchBar ${props.className}` : "searchBar"}
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSubmit(e, query);
        clearInputHandler();
      }}
    >
      <input
        type="text"
        placeholder={!props.loading ? "Search Location" : "Please Wait..."}
        className="searchBar__input"
        required
        onChange={storeInputHander}
        value={query}
      />
      <button className="searchBar__btn">
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default SearchBar;