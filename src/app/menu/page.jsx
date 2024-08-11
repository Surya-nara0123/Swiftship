"use client";
import React, { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Page() {
  const [userName, setUserName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const trendingScrollContainerRef = useRef(null);
  const bfScrollContainerRef = useRef(null);
  const modalRef = useRef(null);

  const items = [
    { id: 1, name: "Item 1", description: "Description 1", price: 10 },
    { id: 2, name: "Item 2", description: "Description 2", price: 15 },
    { id: 3, name: "Item 3", description: "Description 3", price: 20 },
    { id: 4, name: "Item 4", description: "Description 4", price: 25 },
    { id: 5, name: "Item 5", description: "Description 5", price: 30 },
  ];

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

    const addEventListeners = (containerRef, leftBtnClass, rightBtnClass) => {
      const scrollLeftBtn = document.querySelector(leftBtnClass);
      const scrollRightBtn = document.querySelector(rightBtnClass);

      scrollLeftBtn?.addEventListener("click", () =>
        handleScrollLeft(containerRef)
      );
      scrollRightBtn?.addEventListener("click", () =>
        handleScrollRight(containerRef)
      );

      return () => {
        scrollLeftBtn?.removeEventListener("click", () =>
          handleScrollLeft(containerRef)
        );
        scrollRightBtn?.removeEventListener("click", () =>
          handleScrollRight(containerRef)
        );
      };
    };

    const cleanupTrending = addEventListeners(
      trendingScrollContainerRef,
      ".trendingScrollLeft",
      ".trendingScrollRight"
    );

    const cleanupBreakfast = addEventListeners(
      bfScrollContainerRef,
      ".bfScrollLeft",
      ".bfScrollRight"
    );

    return () => {
      cleanupTrending();
      cleanupBreakfast();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (modalVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalVisible]);

  const handleItemClick = (item) => {
    setModalItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalItem(null);
  };

  const Modal = ({ item, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg w-1/2 max-w-md relative"
      >
        <button
          className="absolute top-2 right-2 text-gray-500 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">{item.name}</h2>
        <p className="mb-4">{item.description}</p>
        <p className="mb-4">Price: ${item.price}</p>
        <div className="flex items-center mb-4">
          <button
            className="bg-gray-500 text-white p-2 rounded-l"
            onClick={() => handleQuantityChange(-1)}
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="w-16 text-center"
          />
          <button
            className="bg-gray-500 text-white p-2 rounded-r"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => handleAddToCart(item)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(prevQuantity + delta, 1));
  };

  const handleAddToCart = (item) => {
    console.log(`Added ${quantity} of ${item.name} to cart.`);
    handleCloseModal();
  };

  return (
    <div>
      <Navbar />
      <div className="gradient-bg2 items-left justify-center">
        <div className="flex flex-col items-left justify-left min-h-screen pt-40 ml-10 pb-20">
          <h1 className="text-3xl lg:text-5xl font-bold">
            Rishabh's Food Court
          </h1>
          {/* Section start */}
          <div id="trending">
            <h1 className="text-2xl lg:text-3xl mt-10">Trending foods</h1>
            <div className="relative flex items-center mt-4">
              <button className="trendingScrollLeft absolute left-0 bg-gray-500 text-white p-2 mb-7 rounded-full focus:outline-none">
                &lt;
              </button>
              <div
                ref={trendingScrollContainerRef}
                className="flex overflow-x-auto space-x-2 p-4 mx-8 w-full"
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4 cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                    <p className="text-center mt-2">{item.name}</p>
                  </div>
                ))}
              </div>
              <button className="trendingScrollRight absolute right-0 bg-gray-500 text-white p-2 mr-5 mb-7 rounded-full focus:outline-none">
                &gt;
              </button>
            </div>
          </div>
          {/* Section end */}
          {/* Section start */}
          <div id="breakfast">
            <h1 className="text-2xl lg:text-3xl mt-10">Breakfast</h1>
            <div className="relative flex items-center mt-4">
              <button className="bfScrollLeft absolute left-0 bg-gray-500 text-white p-2 mb-7 rounded-full focus:outline-none">
                &lt;
              </button>
              <div
                ref={bfScrollContainerRef}
                className="flex overflow-x-auto space-x-2 p-4 mx-8 w-full"
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4 cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                    <p className="text-center mt-2">{item.name}</p>
                  </div>
                ))}
              </div>
              <button className="bfScrollRight absolute right-0 bg-gray-500 text-white p-2 mr-5 mb-7 rounded-full focus:outline-none">
                &gt;
              </button>
            </div>
          </div>
          {/* Section end */}
        </div>
      </div>
      {modalVisible && modalItem && (
        <Modal item={modalItem} onClose={handleCloseModal} />
      )}
    </div>
  );
}
