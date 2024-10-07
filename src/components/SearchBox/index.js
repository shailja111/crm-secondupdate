import { IoSearch } from "react-icons/io5";
import "./style.css";

const SearchBox = () => {
    return (
        <div className="searchBox d-flex align-items-center">
            <IoSearch className="searchIcon" />
            <input type="text" placeholder="Search" />
        </div>
    );
};

export default SearchBox;
