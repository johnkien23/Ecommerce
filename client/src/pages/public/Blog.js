import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "components";
import { apiGetBlogs } from "apis";
import Masonry from "react-masonry-css";
import path from "ultils/path";

const Blog = () => {
  const breakpointColumnsObj = {
    default: 2,
    1100: 3,
    700: 2,
    500: 1,
  };
  const [blogs, setBlogs] = useState(null);
  const { blog } = useParams();
  const fetchBlogs = async (queries) => {
    const response = await apiGetBlogs(queries);
    if (response.success) setBlogs(response.blogs);
  };
  useEffect(() => {
    fetchBlogs();
  });
  return (
    <div className="w-full ">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase">blogs</h3>
          <Breadcrumb blog={blog} />
        </div>
      </div>
      <div className="mt-8 w-main m-auto ">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex mx-[-10px]"
          columnClassName="my-masonry-grid-column"
        >
          {blogs?.map((el) => (
            <div key={el.id} className="rounded-md border my-6">
              <img
                src={el.image}
                alt=""
                className="w-full h-48 object-cover rounded-tl-md rounded-tr-md"
              />
              <div className="p-3">
                <Link
                  to={`/${path.BLOGS}/${el.id}/${el.title}`}
                  className="text-main hover:underline line-clamp-2 cursor-pointer"
                >
                  {el.title}
                </Link>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Blog;
