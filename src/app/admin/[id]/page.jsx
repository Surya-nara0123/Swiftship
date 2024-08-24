"use client";
import React, { useRef, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

export default function Page({ params }) {
  const [user, setUser] = useState([]);
  const [windowLoaded, setWindowLoaded] = useState(true);
  const [foodItems, setFoodItems] = useState([]);

  const Modal = ({ onClose }) => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [isRegular, setIsRegular] = useState(false);

    const handleSubmit = async () => {
      const req = {
        name: name,
        price: price,
        description: description,
        isVegetarian: isVegetarian,
        isRegular: isRegular
      }
      console.log(req);
      try {
        const res = await fetch("https://swiftshipbackend-production.up.railway.app/addfooditems",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: name,
              price: Number(price),
              is_veg: isVegetarian,
              rest_id: Number(params.id),
              ingredients: description,
              is_regular: isRegular
            })
          }
        );
        if (res.status !== 200) {
          console.log(res);
          const data = await res.json();
          console.log(data);
        } else {
          console.log("Food Item Added");
        }
      } catch (error) {
        console.log(error);
      }
      handleCloseModal();
    }
    return (
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

          <input type="text" placeholder="Food Item" value={name} onChange={(e) => setName(e.target.value)}></input>
          <input type="text" placeholder="Ingredients" value={description} onChange={(e) => setDescription(e.target.value)}></input>
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
          <br></br>
          <input type="checkbox" placeholder="Vegetarian" value={isVegetarian} onChange={(e) => setIsVegetarian(e.target.checked)}></input>Is Vegetarian?
          <br></br>
          <input type="checkbox" placeholder="Vegetarian" value={isRegular} onChange={(e) => setIsRegular(e.target.checked)}></input>Is Regular?
          <br></br>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleSubmit}
          >
            Add to Cart
          </button>


        </div>
      </div>
    );
  }

  const getUserName = async () => {
    try {
      const res = await fetch("/api/getToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (res.status !== 200) {
        setUser([]);
        // console.log(res);
      } else {
        const data = await res.json();
        console.log(data);
        setUser(data.decodedToken);
      }
    } catch (error) {
      console.log(error);
    }
    // await getOrders();
  }

  const getFoodItems = async () => {
    try {
      const res = await fetch("https://swiftshipbackend-production.up.railway.app/getfooditemsbyrestaurant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            rest_id: Number(params.id)
          })
        }
      );
      const data = await res.json();
      console.log(data);
      setFoodItems(data["food_items"]);
      if (res.status !== 200) {
        setFoodItems([]);
        // console.log(res);
      } else {
        const data = await res.json();
        console.log(data["food_items"]);
        setFoodItems([{
          name: "No Food Items",
          price: "0",
          description: "No Food Items Available"
        }]);
        if (data["food_items"] == []) {
          // setFoodItems([{
          //   name: "No Food Items",
          //   price: "0",
          //   description: "No Food Items Available"
          // }]);
          return;
        }
        // setFoodItems(data["food_items"]);
      }
    } catch {

    }
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const modalRef = useRef(null);
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

  useEffect(() => {
    getUserName();
    getFoodItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const handleItemClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      {/* FoodItems */}
      <div className="flex flex-col items-left justify-left min-h-screen pt-40 ml-10 pb-20">
        {foodItems.map((foodItem) => {
          return (
            <div className="bg-white p-4 rounded-md shadow-md">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold">{foodItem.Item}</h1>
                <div className="flex gap-3">
                  {/**this button should be like a toggle or smt*/}<button className="text-2xl font-bold bg-green-500 rounded-lg px-3">Available</button>
                  <h1 className="text-2xl font-bold">${foodItem.Price}</h1>
                  <button className="text-2xl font-bold">&#9998;</button>
                </div>
              </div>
              <p className="text-lg">{foodItem.Ingredients}</p>
            </div>
          )
        })}
        {/* there should be like a save changes button after the availabilty statuses of teh items are changed */}
        <button onClick={handleItemClick}>Add Food Item</button>
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseModal} />
      )}

    </div>
  )


}