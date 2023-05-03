import { AiOutlineSearch } from "react-icons/ai";
import "./SearchBar.scss";

const SearchBar = (props) => {
  return (
    <form className="searchBar">
      <input
        type="text"
        placeholder="Search Location"
        className="searchBar__input"
      />
      <button className="searchBar__btn">
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default SearchBar;