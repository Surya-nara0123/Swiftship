"use client";
import React, { useRef, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { notFound } from "next/navigation";
import axios from "axios";

export default function Page({ params }) {
  const [userName, setUserName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const trendingScrollContainerRef = useRef(null);
  const bfScrollContainerRef = useRef(null);
  const modalRef = useRef(null);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <h2 className="text-xl font-bold mb-4">{item.Item}</h2>
        <p className="mb-4">{item.Ingredients}</p>
        <p className="mb-4">Price: ₹{item.Price}</p>
        <div className="flex items-center mb-4">
          <button
            className="bg-gray-500 text-white p-2 rounded-l"
            onClick={() => handleQuantityChange(item, -1)}
          >
            -
          </button>
          <input
            type="text"
            value={cart.find((i) => i.name === item.Item)?.count || 1}
            readOnly
            className="w-16 text-center"
          />
          <button
            className="bg-gray-500 text-white p-2 rounded-r"
            onClick={() => handleQuantityChange(item, 1)}
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

  const handleQuantityChange = (item, delta) => {
    const newCart = [...cart];
    console.log(item);
    const index = newCart.findIndex((i) => i.name === item.Item);
    if (index == -1) {
      console.log("hi")
      newCart.push({ name: item.Item, count: 1 });
      console.log(newCart);
      setCart(newCart);
      // localStorage.setItem("cart", JSON.stringify(newCart));
      return;
    }
    console.log(newCart);
    console.log("hiii")
    newCart[index].count += delta;
    setCart(newCart);
    // localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleAddToCart = (item) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(`Added ₹{quantity} of ₹{item.Item} to cart.`);
    handleCloseModal();
  };

  const [restaurant, setRestaurant] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [windowLoaded, setWindowLoaded] = useState(false);
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const data = await JSON.parse(cart);
      setCart(data);
    }
  };


  const getRestaurant = async () => {
    // console.log(params);
    const res = await fetch("https://swiftshipbackend-production.up.railway.app/getrestaurantbyid",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "id": Number(params.id) }),
      }
    );
    // console.log(res);
    const body = await res.json();
    if (res.status !== 200) {
      console.log(body);
      return;
    }
    // console.log(body);
    setIsValid(true);
    setRestaurant(body["result"]);
  };

  const getFoodItems = async () => {
    const response = await fetch("https://swiftshipbackend-production.up.railway.app/getfooditemsbyrestaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "rest_id": Number(params.id) }),
    }
    );
    const body = await response.json();
    console.log(body["food_items"][0]);
    setFoodItems(body["food_items"]);
  }

  useEffect(() => {
    getRestaurant();
    getFoodItems();
    setWindowLoaded(true);
    getCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const isSpecialsPresent = foodItems.some((item) => !item.IsRegular);

  return (
    <>
      {isValid ? (
        <div>
          <Navbar />
          <div className="gradient-bg2 items-left justify-center">
            <div className="flex flex-col items-left justify-left min-h-screen pt-40 ml-10 pb-20">
              <h1 className="text-3xl lg:text-5xl font-bold">
                {restaurant.name}
              </h1>
              {/* Section start */}
              <div id="trending">
                {isSpecialsPresent ?
                  <>
                    <h1 className="text-2xl lg:text-3xl mt-10">Special foods</h1>
                    <div className="relative flex items-center mt-4">
                      <button className="trendingScrollLeft absolute left-0 bg-gray-500 text-white p-2 mb-7 rounded-full focus:outline-none">
                        &lt;
                      </button>
                      <div
                        ref={trendingScrollContainerRef}
                        className="flex overflow-x-auto space-x-2 p-4 mx-8 w-full"
                      >
                        {foodItems.map((item) =>
                          !item.IsRegular && (
                            <div
                              key={item.id}
                              className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4 cursor-pointer"
                              onClick={() => handleItemClick(item)}
                            >
                              <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                              <p className="text-center mt-2">{item.Item}</p>
                            </div>
                          ))}
                      </div>
                      <button className="trendingScrollRight absolute right-0 bg-gray-500 text-white p-2 mr-5 mb-7 rounded-full focus:outline-none">
                        &gt;
                      </button>
                    </div>
                  </>
                  : (<></>)}
              </div>
              {/* Section end */}
              <div id="breakfast">
                <h1 className="text-2xl lg:text-3xl mt-10">Available at all times</h1>
                <div className="relative flex items-center mt-4">
                  <button className="bfScrollLeft absolute left-0 bg-gray-500 text-white p-2 mb-7 rounded-full focus:outline-none">
                    &lt;
                  </button>
                  <div
                    ref={bfScrollContainerRef}
                    className="flex overflow-x-auto space-x-2 p-4 mx-8 w-full"
                  >
                    {foodItems.map((item) =>
                      (item.IsRegular && item.AvailableTime == 0) &&(
                        <div
                          key={item.id}
                          className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4 cursor-pointer"
                          onClick={() => handleItemClick(item)}
                        >
                          <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                          <p className="text-center mt-2">{item.Item}</p>
                        </div>
                      ))}
                  </div>
                  <button className="bfScrollRight absolute right-0 bg-gray-500 text-white p-2 mr-5 mb-7 rounded-full focus:outline-none">
                    &gt;
                  </button>
                </div>
              </div>
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
                    {foodItems.map((item) => 
                    (item.IsRegular && item.AvailableTime == 1) &&(
                      <div
                        key={item.id}
                        className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4 cursor-pointer"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                        <p className="text-center mt-2">{item.Item}</p>
                      </div>
                    ))}
                  </div>
                  <button className="bfScrollRight absolute right-0 bg-gray-500 text-white p-2 mr-5 mb-7 rounded-full focus:outline-none">
                    &gt;
                  </button>
                </div>
              </div>
              <div id="breakfast">
                <h1 className="text-2xl lg:text-3xl mt-10">Lunch</h1>
                <div className="relative flex items-center mt-4">
                  <button className="bfScrollLeft absolute left-0 bg-gray-500 text-white p-2 mb-7 rounded-full focus:outline-none">
                    &lt;
                  </button>
                  <div
                    ref={bfScrollContainerRef}
                    className="flex overflow-x-auto space-x-2 p-4 mx-8 w-full"
                  >
                    {foodItems.map((item) =>
                    (item.IsRegular && item.AvailableTime == 2) && (
                      <div
                        key={item.id}
                        className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4 cursor-pointer"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                        <p className="text-center mt-2">{item.Item}</p>
                      </div>
                    ))}
                  </div>
                  <button className="bfScrollRight absolute right-0 bg-gray-500 text-white p-2 mr-5 mb-7 rounded-full focus:outline-none">
                    &gt;
                  </button>
                </div>
              </div>
              <div id="breakfast">
                <h1 className="text-2xl lg:text-3xl mt-10">Dinner</h1>
                <div className="relative flex items-center mt-4">
                  <button className="bfScrollLeft absolute left-0 bg-gray-500 text-white p-2 mb-7 rounded-full focus:outline-none">
                    &lt;
                  </button>
                  <div
                    ref={bfScrollContainerRef}
                    className="flex overflow-x-auto space-x-2 p-4 mx-8 w-full"
                  >
                    {foodItems.map((item) => 
                    (item.IsRegular && item.AvailableTime == 3) &&(
                      <div
                        key={item.id}
                        className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4 cursor-pointer"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                        <p className="text-center mt-2">{item.Item}</p>
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
      ) : (
        <></>
      )}
    </>
  );
}
