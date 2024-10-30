import { Breadcrumb } from "components";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const FAQ = () => {
  const { faq } = useParams();
  useEffect(() => {
    const faqs = document.querySelectorAll(".faq");
    faqs.forEach((faq) => {
      faq.addEventListener("click", toggleAnswer);
    });

    return () => {
      faqs.forEach((faq) => {
        faq.removeEventListener("click", toggleAnswer);
      });
    };
  }, []);

  const toggleAnswer = (event) => {
    event.currentTarget.classList.toggle("active");
  };

  return (
    <div>
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase">faqs</h3>
          <Breadcrumb faq={faq} />
        </div>
      </div>
      <section>
        <h2 className="title">FAQs</h2>
        <div className="faq">
          <div className="question">
            <h3>1. What payment you accept?</h3>
            <svg width="15" height="10" viewBox="0 0 42 25">
              <path
                d="M3 3L21 21L39 3"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="answer">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="faq">
          <div className="question">
            <h3>2. In what country can you deliver?</h3>
            <svg width="15" height="10" viewBox="0 0 42 25">
              <path
                d="M3 3L21 21L39 3"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="answer">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="faq">
          <div className="question">
            <h3>3. what payments you accept?</h3>

            <svg width="15" height="10" viewBox="0 0 42 25">
              <path
                d="M3 3L21 21L39 3"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="answer">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
