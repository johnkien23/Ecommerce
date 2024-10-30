import { apiGetProducts } from "apis";
import { Product } from "components";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { useParams } from "react-router-dom";

const ProductSearch = () => {
  let { query } = useParams();
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    try {
      let par = {
        title: query,
      };
      const response = await apiGetProducts(par);
      if (response.success) setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    fetchProducts();
  }, [query]);

  useEffect(() => {
    if (products?.length > 0) {
    }
  }, [products]);
  return (
    <div className="min-h-screen p-4">
      <h2 className="text-2xl font-medium text-center">
        Your search for "{query}" revealed the following
      </h2>
      <div className="mt-8 w-main m-auto ">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex mx-[-10px]"
          columnClassName="my-masonry-grid-column"
        >
          {products?.products?.map((el) => (
            <Product key={el._id} pid={el._id} productData={el} normal={true} />
          ))}
        </Masonry>
        {products?.products.length === 0 && <>No product information</>}
      </div>
    </div>
  );
};

export default ProductSearch;
