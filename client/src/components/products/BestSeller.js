import React, { useState, useEffect, memo } from "react";
import { apiGetProducts } from "apis/product";
import { CustomSlider } from "..";
import { getNewProducts } from "store/products/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

const tabs = [
  { id: 1, name: "best sellers" },
  { id: 2, name: "new arrivals" },
];

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [activedTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);
  const { isShowModal } = useSelector((state) => state.app);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: "-sold" });
    if (response.success) {
      setBestSellers(response.products);
      setProducts(response.products);
    }
  };
  useEffect(() => {
    fetchProducts();
    dispatch(getNewProducts());
  }, []);
  useEffect(() => {
    if (activedTab === 1) setProducts(bestSellers);
    if (activedTab === 2) setProducts(newProducts);
  }, [activedTab]);
  return (
    <div className={clsx(isShowModal ? "hidden" : "block")}>
      <div className="flex text-[20px] ml-[-32px]">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold uppercase px-8 border-r cursor-pointer text-gray-400 ${
              activedTab === el.id ? "text-gray-900" : " "
            }`}
            onClick={() => setActiveTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px] border-t-2 border-main pt-4">
        <CustomSlider products={products} activedTab={activedTab} />
      </div>
      <div className="w-full flex gap-4 mt-4">
        <img
          src="//cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture//News/News_1805/uu-dai-500000d-_363_364.png.webp"
          alt="banner"
          className="flex-1 object-contain w-[278px] h-[93px]"
        />
        <img
          src="//cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture//News/News_1845/huong-dan-khach-hang_364.png.webp"
          alt="banner"
          className="flex-1 object-contain w-[278px] h-[93px]"
        />
        <img
          src="//cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture//News/News_1845/huong-dan-khach-hang_364.png.webp"
          alt="banner"
          className="flex-1 object-contain w-[278px] h-[93px]"
        />
        <img
          src="//cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture//News/News_1845/huong-dan-khach-hang_364.png.webp"
          alt="banner"
          className="flex-1 object-contain w-[278px] h-[93px]"
        />
      </div>
    </div>
  );
};

export default memo(BestSeller);
