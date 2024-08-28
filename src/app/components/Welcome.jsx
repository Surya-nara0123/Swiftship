"use client";
import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const trendingScrollContainerRef = useRef(null);
  const shopsScrollContainerRef = useRef(null);
  const againScrollContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const router = useRouter();

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

    // Add event listeners for each section
    const cleanupTrending = addEventListeners(
      trendingScrollContainerRef,
      ".trendingScrollLeft",
      ".trendingScrollRight"
    );
    const cleanupShops = addEventListeners(
      shopsScrollContainerRef,
      ".shopsScrollLeft",
      ".shopsScrollRight"
    );
    const cleanupAgain = addEventListeners(
      againScrollContainerRef,
      ".againScrollLeft",
      ".againScrollRight"
    );

    // Cleanup event listeners on unmount
    return () => {
      cleanupTrending();
      cleanupShops();
      cleanupAgain();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [restaurants, setRestaurants] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const getRestaurants = async () => {
    const response = await fetch("https://swiftshipbackend-production.up.railway.app/getrestaurants");
    // console.log(response);
    const data = await response.json();
    // console.log(data["result"][0]);
    setRestaurants(data["result"]);
  };

  const getFoodItems = async () => {
    const response = await fetch("https://swiftshipbackend-production.up.railway.app/getfooditems", {
      method: "GET",
      headers: {
        
        "Content-Type": "application/json",
      },
    }
    );
    const body = await response.json();
    // console.log(body["food_items"][0]);
    // console.log(locationName(body["food_items"][0]));
    setFoodItems(body["food_items"]);
  }

  useEffect(() => {
    getRestaurants();
    getFoodItems();
    setWindowLoaded(true);
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleItemClick = (name, description, price) => {
    setModalContent({ name, description, price });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleCloseModal();
    }
  };
  const locationName = (foodItem) => {
    for (let i = 0; i < restaurants.length; i++) {
      if (restaurants[i]["UID"] == foodItem.RestuarantId) {
        return restaurants[i]["Name"];
      }
    }
  }

  const [cart, setCart] = useState([]);
  const getCart = async () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const data = await JSON.parse(cart);
      // console.log(data);
      setCart(data);
    }
  };

  const [windowLoaded, setWindowLoaded] = useState(false);
  return (
    <div className="gradient-bg2 items-left justify-center">
      {windowLoaded && (
        <>
          <div className="flex flex-col items-left justify-left min-h-screen pt-40 ml-10 pb-20">
            <h1 className="text-3xl lg:text-5xl font-bold">Welcome!</h1>

            {/* Trending Foods */}
            <div id="trending">
              <h1 className="text-2xl lg:text-3xl mt-10">Specials Today</h1>
              <div className="relative flex items-center mt-4">
                <button className="trendingScrollLeft absolute left-0 bg-gray-500 text-white p-2 mb-7 rounded-full focus:outline-none">
                  &lt;
                </button>
                <div
                  ref={trendingScrollContainerRef}
                  className="flex overflow-x-auto space-x-2 p-4 mx-8 w-full"
                >
                  {foodItems.map((foodItem, index) =>
                    foodItem.IsRegular == false && (
                      <>
                        <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4" key={index}>
                          <div
                            className="h-48 w-full bg-gray-300 rounded-lg cursor-pointer text-black"
                            onClick={() => {
                              console.log(locationName(foodItem));
                              handleItemClick(foodItem.Item, foodItem.Ingredients, foodItem.Price);
                            }
                            }
                          >
                            {locationName(foodItem)}
                          </div>
                          <p className="text-center mt-2">{foodItem.Item}</p>
                        </div>
                      </>
                    ))}
                </div>
                <button className="trendingScrollRight absolute right-0 bg-gray-500 text-white p-2 mr-5 mb-7 rounded-full focus:outline-none">
                  &gt;
                </button>
              </div>
            </div>

            {/* Restaurants */}
            <div id="shops">
              <h1 className="text-2xl lg:text-3xl mt-10">Restaurants</h1>
              <div className="relative flex items-center mt-4">
                <button className="shopsScrollLeft absolute left-0 bg-gray-500 text-white p-2 mb-7 rounded-full focus:outline-none">
                  &lt;
                </button>
                <div
                  ref={shopsScrollContainerRef}
                  className="flex overflow-x-auto space-x-2 p-4 mx-8 w-full"
                >
                  {restaurants.map((restaurant, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4 cursor-pointer"
                      onClick={() => router.push(`/menu/${restaurant["UID"]}`)}
                    >
                      <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                      <p className="text-center mt-2">{
                        restaurant["Name"]
                      }
                      </p>
                    </div>
                  ))}
                </div>
                <button className="shopsScrollRight absolute right-0 bg-gray-500 text-white p-2 mr-5 mb-7 rounded-full focus:outline-none">
                  &gt;
                </button>
              </div>
            </div>

            {/* Order Again */}
            <div id="again">
              <h1 className="text-2xl lg:text-3xl mt-10">Order again</h1>
              <div className="relative flex items-center mt-4">
                <button className="againScrollLeft absolute left-0 bg-gray-500 text-white p-2 mb-7 rounded-full focus:outline-none">
                  &lt;
                </button>
                <div
                  ref={againScrollContainerRef}
                  className="flex overflow-x-auto space-x-2 p-4 mx-8 w-full"
                >
                  <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                    <div
                      className="h-48 w-full bg-gray-300 rounded-lg cursor-pointer"
                      onClick={() =>
                        handleItemClick("Item 6", "Description 6", "₹35")
                      }
                    ></div>
                    <p className="text-center mt-2">Description 6</p>
                  </div>
                  <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                    <div
                      className="h-48 w-full bg-gray-300 rounded-lg cursor-pointer"
                      onClick={() =>
                        handleItemClick("Item 7", "Description 7", "₹40")
                      }
                    ></div>
                    <p className="text-center mt-2">Description 7</p>
                  </div>
                  <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                    <div
                      className="h-48 w-full bg-gray-300 rounded-lg cursor-pointer"
                      onClick={() =>
                        handleItemClick("Item 8", "Description 8", "₹45")
                      }
                    ></div>
                    <p className="text-center mt-2">Description 8</p>
                  </div>
                  <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                    <div
                      className="h-48 w-full bg-gray-300 rounded-lg cursor-pointer"
                      onClick={() =>
                        handleItemClick("Item 9", "Description 9", "₹50")
                      }
                    ></div>
                    <p className="text-center mt-2">Description 9</p>
                  </div>
                  <div className="flex-shrink-0 w-64 sm:w-80 lg:w-1/4">
                    <div
                      className="h-48 w-full bg-gray-300 rounded-lg cursor-pointer"
                      onClick={() =>
                        handleItemClick("Item 10", "Description 10", "₹55")
                      }
                    ></div>
                    <p className="text-center mt-2">Description 10</p>
                  </div>
                </div>
                <button className="againScrollRight absolute right-0 bg-gray-500 text-white p-2 mr-5 mb-7 rounded-full focus:outline-none">
                  &gt;
                </button>
              </div>
            </div>
          </div>

          {isModalOpen && (
            <div
              className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
              onClick={handleOutsideClick}
            >
              <div className="modal-content bg-white p-8 rounded-lg relative">
                <button
                  className="modal-close absolute top-2 right-2 text-2xl"
                  onClick={handleCloseModal}
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold">{modalContent.name}</h2>
                <p className="mt-2">{modalContent.description}</p>
                <p className="mt-2 text-lg font-semibold">{modalContent.price}</p>
                <div className="mt-4 flex items-center">
                  <button
                    className="bg-gray-200 p-2 rounded-l"
                    onClick={() =>
                      setModalContent((prev) => ({
                        ...prev,
                        quantity: Math.max(1, (prev.quantity || 1) - 1),
                      }))
                    }
                  >
                    &minus;
                  </button>
                  <input
                    type="text"
                    value={modalContent.quantity || 1}
                    readOnly
                    className="w-12 text-center"
                  />
                  <button
                    className="bg-gray-200 p-2 rounded-r"
                    onClick={() =>
                      setModalContent((prev) => ({
                        ...prev,
                        quantity: (prev.quantity || 1) + 1,
                      }))
                    }
                  >
                    +
                  </button>
                </div>
                <button className="mt-4 bg-blue-500 text-white p-2 rounded"
                  onClick={
                    () => {
                      let newCart = cart;
                      let found = false;
                      // console.log(newCart, cart);
                      for (let i = 0; i < newCart.length; i++) {
                        if (newCart[i].name == modalContent.name) {
                          newCart[i].count += modalContent.quantity;
                          found = true;
                          break;
                        }
                      }
                      if (!found) {
                        newCart.push({
                          name: modalContent.name,
                          count: modalContent.quantity,
                        });
                      }
                      // console.log(newCart);
                      localStorage.setItem("cart", JSON.stringify(newCart));
                      setCart(newCart);
                      setIsModalOpen(false);
                    }
                  }>
                  Add to cart
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Welcome;
