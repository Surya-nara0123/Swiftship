"use client";
import { useEffect, useRef } from "react";

const Welcome = () => {
  const trendingScrollContainerRef = useRef(null);
  const againScrollContainerRef = useRef(null);

  useEffect(() => {
    const handleScrollLeft = (containerRef) => {
      containerRef.current.scrollBy({
        left: -containerRef.current.clientWidth,
        behavior: "smooth",
      });
    };

    const handleScrollRight = (containerRef) => {
      containerRef.current.scrollBy({
        left: containerRef.current.clientWidth,
        behavior: "smooth",
      });
    };

    const scrollLeftBtns = document.querySelectorAll(".scrollLeft");
    const scrollRightBtns = document.querySelectorAll(".scrollRight");

    scrollLeftBtns[0]?.addEventListener("click", () =>
      handleScrollLeft(trendingScrollContainerRef)
    );
    scrollRightBtns[0]?.addEventListener("click", () =>
      handleScrollRight(trendingScrollContainerRef)
    );
    scrollLeftBtns[1]?.addEventListener("click", () =>
      handleScrollLeft(againScrollContainerRef)
    );
    scrollRightBtns[1]?.addEventListener("click", () =>
      handleScrollRight(againScrollContainerRef)
    );

    // Cleanup event listeners on unmount
    return () => {
      scrollLeftBtns[0]?.removeEventListener("click", () =>
        handleScrollLeft(trendingScrollContainerRef)
      );
      scrollRightBtns[0]?.removeEventListener("click", () =>
        handleScrollRight(trendingScrollContainerRef)
      );
      scrollLeftBtns[1]?.removeEventListener("click", () =>
        handleScrollLeft(againScrollContainerRef)
      );
      scrollRightBtns[1]?.removeEventListener("click", () =>
        handleScrollRight(againScrollContainerRef)
      );
    };
  }, []);

  return (
    <div className="gradient-bg2 items-left justify-center">
      <div className="flex flex-col items-left justify-left min-h-screen pt-40 ml-10 pb-20">
        <h1 className="text-3xl lg:text-5xl font-bold">Welcome!</h1>
        <div id="trending">
          <h1 className="text-2xl lg:text-3xl mt-10">Trending foods</h1>
          <div className="relative flex items-center mt-4">
            {/* Left Scroll Button */}
            <button className="scrollLeft absolute left-0 z-10 bg-gray-500 text-white p-2 mb-7 rounded-full focus:outline-none">
              &lt;
            </button>

            {/* Scrollable Boxes Container */}
            <div
              ref={trendingScrollContainerRef}
              className="flex overflow-x-auto space-x-2 p-4 mx-8 w-full"
            >
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                <p className="text-center mt-2">Description 1</p>
              </div>
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                <p className="text-center mt-2">Description 2</p>
              </div>
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                <p className="text-center mt-2">Description 1</p>
              </div>
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                <p className="text-center mt-2">Description 2</p>
              </div>{" "}
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                <p className="text-center mt-2">Description 1</p>
              </div>
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                <p className="text-center mt-2">Description 2</p>
              </div>
              {/* Add more items here */}
            </div>

            {/* Right Scroll Button */}
            <button className="scrollRight absolute right-0 z-10 bg-gray-500 text-white p-2 mr-5 mb-7 rounded-full focus:outline-none">
              &gt;
            </button>
          </div>
        </div>
        <div id="again">
          <h1 className="text-2xl lg:text-3xl mt-10">Order again</h1>
          <div className="relative flex items-center mt-4">
            {/* Left Scroll Button */}
            <button className="scrollLeft absolute left-0 z-10 bg-gray-500 text-white p-2 mb-7 rounded-full focus:outline-none">
              &lt;
            </button>

            {/* Scrollable Boxes Container */}
            <div
              ref={againScrollContainerRef}
              className="flex overflow-x-auto space-x-2 p-4 mx-8 w-full"
            >
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                <p className="text-center mt-2">Description 1</p>
              </div>
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                <p className="text-center mt-2">Description 2</p>
              </div>
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                <p className="text-center mt-2">Description 1</p>
              </div>
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                <p className="text-center mt-2">Description 2</p>
              </div>
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                <p className="text-center mt-2">Description 1</p>
              </div>
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                <p className="text-center mt-2">Description 2</p>
              </div>
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                <p className="text-center mt-2">Description 1</p>
              </div>
              <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                <p className="text-center mt-2">Description 2</p>
              </div>
              {/* Add more items here */}
            </div>

            {/* Right Scroll Button */}
            <button className="scrollRight absolute right-0 z-10 bg-gray-500 text-white p-2 mr-5 mb-7 rounded-full focus:outline-none">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
