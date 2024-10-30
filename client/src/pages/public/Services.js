import { Breadcrumb } from "components";
import React from "react";
import { useParams } from "react-router-dom";

const Services = () => {
  const { service } = useParams();
  return (
    <div className="">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase">services</h3>
          <Breadcrumb service={service} />
        </div>
      </div>
      <div className=" w-main flex   justify-center items-start gap-6 py-6">
        <img
          src="//cdn.shopify.com/s/files/1/1636/8779/files/9069783_orig.jpg?v=1491836163"
          alt=""
          className="flex-5  "
        />
        <div className="flex-5 gap-2 flex flex-col">
          <p>
            Cras magna tellus, congue vitae congue vel, facilisis id risus.
            Proin semper in lectus id faucibus. Aenean vitae quam eget mi
            aliquam viverra quis quis velit.
          </p>

          <p>
            Curabitur mauris diam, posuere vitae nunc eget, blandit pellentesque
            mi. Pellentesque placerat nulla at ultricies malesuada. Aenean mi
            lacus, malesuada at leo vel, blandit iaculis nisl.
          </p>

          <p>
            Praesent vestibulum nisl sed diam euismod, a auctor neque porta.
            Vestibulum varius ligula non orci tincidunt rutrum. Suspendisse
            placerat enim eu est egestas, aliquam venenatis elit accumsan. Donec
            metus quam, posuere sit amet odio et, ultricies consequat nibh.
          </p>
        </div>
      </div>
      <div className="w-main ">
        <h1 className="text-center text-2xl font-bold mt-4 ">
          We Offer Best Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="flex flex-col items-center text-center leading-7 gap-3 m-14 ">
            <img
              src="https://cdn.shopify.com/s/files/1/1636/8779/files/settings.png?v=1491835711"
              alt="ảnh setting"
            />
            <h5 className="text-xl mt-2">Customizable Page</h5>
            <p>
              Fusce arcu molestie eget libero consectetur congue consectetur in
              bibendum litora
            </p>
          </div>
          <div className="flex flex-col items-center text-center leading-7 gap-3 m-14 ">
            <img
              src="https://cdn.shopify.com/s/files/1/1636/8779/files/picture.png?v=1491835656"
              alt="ảnh setting"
            />{" "}
            <h5 className="text-xl mt-2">Customizable Page</h5>
            <p>
              Fusce arcu molestie eget libero consectetur congue consectetur in
              bibendum litora
            </p>
          </div>
          <div className="flex flex-col items-center text-center leading-7 gap-3 m-14 ">
            <img
              src="https://cdn.shopify.com/s/files/1/1636/8779/files/layout.png?v=1491835677"
              alt="ảnh setting"
            />{" "}
            <h5 className="text-xl mt-2">Customizable Page</h5>
            <p>
              Fusce arcu molestie eget libero consectetur congue consectetur in
              bibendum litora
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
