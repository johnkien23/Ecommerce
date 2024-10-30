import React, { memo } from "react";
import { navigation } from "ultils/contants";
import { NavLink } from "react-router-dom";
import SearchForm from "./../search/SearchForm";

const Navigation = () => {
  console.log(navigation);

  return (
    <div className="w-main h-[48px] py-2 border-y  text-sm flex items-center justify-between">
      <div>
        {navigation.map((el) => (
          <NavLink
            to={el.path}
            key={el.id}
            className={({ isActive }) =>
              isActive
                ? "pr-12 hover:text-main text-main"
                : "pr-12 hover:text-main"
            }
          >
            {el.value}
          </NavLink>
        ))}
      </div>
      <SearchForm />
    </div>
  );
};

export default memo(Navigation);
