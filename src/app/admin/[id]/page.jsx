"use client";
import React, { useRef, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

export default function Page({ params }) {
  const [user, setUser] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isRegular, setIsRegular] = useState(false);
  const [availableTime, setAvailableTime] = useState("0");

  const getUserName = async () => {
    try {
      const res = await fetch("/api/getToken", {
        method: "POST",
        headers: {
          "X-API-Key": process.env.API_KEY,
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 200) {
        setUser([]);
      } else {
        const data = await res.json();
        setUser(data.decodedToken);
      }
    } catch (error) {
      //(error);
    }
  };

  const getFoodItems = async () => {
    try {
      const res = await fetch(
        "https://swiftshipbackend-production.up.railway.app/getfooditemsbyrestaurant",
        {
          method: "POST",
          headers: {
            "X-API-Key": process.env.API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rest_id: Number(params.id),
          }),
        }
      );
      const data = await res.json();
      const items = data["food_items"];
      setFoodItems(items);
      setFilteredFoodItems(items);
      if (res.status !== 200 || items.length === 0) {
      }
    } catch (error) {
      //(error);
    }
  };

  useEffect(() => {
    getUserName();
    getFoodItems();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredFoodItems(foodItems);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredFoodItems(
        foodItems.filter((item) =>
          (item.Item ? item.Item.toLowerCase() : "").includes(query)
        )
      );
    }
  }, [searchQuery, foodItems]);

  const handleEditClick = (item) => {
    setEditingItem(item);
    setName(item.Item);
    setPrice(item.Price);
    setDescription(item.Ingredients);
    setIsVegetarian(item.IsVeg);
    setIsRegular(item.IsRegular);
    setIsModalOpen(true);
  };

  const handleToggleAvailability = async (item) => {
    let updatedItem = { ...item, IsAvailable: !item.IsAvailable };
    setFoodItems((prevItems) =>
      prevItems.map((i) => (i.UID === item.UID ? updatedItem : i))
    );
    setFilteredFoodItems((prevItems) =>
      prevItems.map((i) => (i.UID === item.UID ? updatedItem : i))
    );
    try {
      const res = await fetch(
        "https://swiftshipbackend-production.up.railway.app/changeavailability",
        {
          method: "POST",
          headers: {
            "X-API-Key": process.env.API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            food_id: item.UID,
          }),
        }
      );
      updatedItem = { ...item, IsAvailable: !item.IsAvailable };
      // //(res);
      if (res.status != 200) {
        setFoodItems((prevItems) =>
          prevItems.map((i) => (i.UID === item.UID ? updatedItem : i))
        );
        setFilteredFoodItems((prevItems) =>
          prevItems.map((i) => (i.UID === item.UID ? updatedItem : i))
        );
      }
    } catch (error) {
      updatedItem = { ...item, IsAvailable: !item.IsAvailable };
      setFoodItems((prevItems) =>
        prevItems.map((i) => (i.UID === item.UID ? updatedItem : i))
      );
      setFilteredFoodItems((prevItems) =>
        prevItems.map((i) => (i.UID === item.UID ? updatedItem : i))
      );
      //(error);
    }
  };

  const handleSubmit = async () => {
    if (editingItem == null) {
      const newItem = {
        name: name,
        price: Number(price),
        is_veg: isVegetarian,
        rest_id: Number(params.id),
        ingredients: description,
        is_regular: isRegular,
        available_time: Number(availableTime),
      };
      //(newItem);
      try {
        const res = await fetch(
          "https://swiftshipbackend-production.up.railway.app/addfooditems",
          {
            method: "POST",
            headers: {
              "X-API-Key": process.env.API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
          }
        );
        //(res);
        if (res.status === 200) {
          const data = await res.json();
          const item = data["food_item"];
          setFoodItems((prevItems) => [...prevItems, item]);
          setFilteredFoodItems((prevItems) => [...prevItems, item]);
          setIsModalOpen(false);
        }
      } catch (error) {
        //(error);
      }
    } else {
      const updatedItem = {
        uid: editingItem.UID,
        name: name,
        price: Number(price),
        is_veg: isVegetarian,
        rest_id: Number(params.id),
        ingredients: description,
        is_regular: isRegular,
        available_time: Number(availableTime),
      };

      try {
        const res = await fetch(
          "https://swiftshipbackend-production.up.railway.app/editfooditem",
          {
            method: "POST",
            headers: {
              "X-API-Key": process.env.API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedItem),
          }
        );
        if (res.status === 200) {
          setFoodItems((prevItems) =>
            prevItems.map((item) =>
              item.UID === updatedItem.uid ? updatedItem : item
            )
          );
          setFilteredFoodItems((prevItems) =>
            prevItems.map((item) =>
              item.UID === updatedItem.uid ? updatedItem : item
            )
          );
          setIsModalOpen(false);
        }
      } catch (error) {
        //(error);
      }

      setEditingItem(null);
    }
  };

  const handleDelete = async () => {
    //(editingItem);
    setFoodItems((prevItems) =>
      prevItems.filter((item) => item.id !== editingItem.id)
    );
    setFilteredFoodItems((prevItems) =>
      prevItems.filter((item) => item.id !== editingItem.id)
    );
    try {
      const res = await fetch(
        "https://swiftshipbackend-production.up.railway.app/deletefooditem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ foodItemID: editingItem.UID }),
        }
      );
      if (res.status != 200) {
        setFoodItems((prevItems) => [...prevItems, editingItem]);
        setFilteredFoodItems((prevItems) => [...prevItems, editingItem]);
      }
      setIsModalOpen(false);
    } catch (error) {
      //(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-left justify-left min-h-screen pt-40 pb-20 px-10 bg-gray-100">
        <div className="text-3xl font-bold">{user.name}</div>
        <div className="text-5xl font-bold mt-5">Admin Dashboard</div>
        <div className="mb-10 mt-5 flex items-start gap-4">
          <button
            onClick={() => (window.location.href = `/vendor/${params.id}`)}
            className="border-2 border-red-500 text-red-500 font-bold py-10 px-8 text-xl rounded-lg bg-white hover:bg-red-500 hover:text-white w-full max-w-lg"
          >
            Check Paid Orders
          </button>
          <button
            onClick={() =>
              (window.location.href = `/vendorincoming/${params.id}`)
            }
            className="border-2 border-red-500 text-red-500 font-bold py-10 px-8 text-xl rounded-lg bg-white hover:bg-red-500 hover:text-white w-full max-w-lg"
          >
            Check Unpaid Orders
          </button>
        </div>

        <div className="flex items-center mb-5">
          <div className="text-3xl font-bold">Items</div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-600 ml-5"
          >
            Add New Item
          </button>
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search Food Items"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {filteredFoodItems.length > 0 ? (
          filteredFoodItems.map((foodItem, index) => (
            <div
              key={foodItem.id || index}
              className="bg-white p-6 mb-4 rounded-lg shadow-md border-l-4 border-red-500"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  {foodItem.Item || "Food Item"}
                </h1>
                <div className="flex gap-4">
                  <button
                    className={`text-lg font-bold ${
                      foodItem.IsAvailable ? "bg-green-500" : "bg-gray-500"
                    } text-white rounded-lg px-4 py-1 hover:bg-green-600`}
                    onClick={() => handleToggleAvailability(foodItem)}
                  >
                    {foodItem.IsAvailable ? "Available" : "Unavailable"}
                  </button>
                  <button
                    onClick={() => handleEditClick(foodItem)}
                    className="text-lg font-bold bg-yellow-500 text-white rounded-lg px-4 py-1 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </div>
              </div>
              <p className="text-gray-700">
                {foodItem.Ingredients || "Description"}
              </p>
              <p className="text-gray-900 text-xl font-semibold">
                Price: ₹{foodItem.Price || "0"}
              </p>
              <p className="text-gray-700">
                {foodItem.IsVeg ? "Vegetarian" : "Non-Vegetarian"}
              </p>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center">No items found.</div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/2 max-w-md relative border-2 border-red-500 shadow-lg">
              <button
                className="absolute top-2 right-2 text-gray-500 text-2xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Edit Food Item</h2>
              <input
                type="text"
                placeholder="Food Item"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Ingredients"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <select
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              >
                <option value="0">Available At All Times</option>
                <option value="1">BreakFast</option>
                <option value="2">Lunch</option>
                <option value="3">Dinner</option>
              </select>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={isVegetarian}
                    onChange={(e) => setIsVegetarian(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-red-500"
                  />
                  <span className="ml-2 text-gray-700">Is Vegetarian?</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={isRegular}
                    onChange={(e) => setIsRegular(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-red-500"
                  />
                  <span className="ml-2 text-gray-700">Is Regular?</span>
                </label>
              </div>
              <div className="flex gap-4">
                <button
                  className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-600"
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white p-2 rounded w-full hover:bg-gray-600"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
