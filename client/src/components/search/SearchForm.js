import React from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSubmit = (event) => {
    navigate(`/search/${searchTerm}`);
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          id="search"
          className="bg-gray-50     text-gray-900 text-sm rounded-lg   block w-full p-2.5 "
          placeholder="Search product"
          value={searchTerm}
          onChange={handleChange}
          required
        />
      </div>
    </form>
  );
};

export default SearchForm;
