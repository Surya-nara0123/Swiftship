"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NavbarLogin from "../components/NavbarLogin";
import axios from "axios";
import { Button } from "../../components/ui/button";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [foodItems, setFoodItems] = useState([]);
  const [windowLoaded, setWindowLoaded] = useState(false);

  const getCart = async () => {
    try {
      const cartItems = await localStorage.getItem("cart");
      if (cartItems) {
        const cart = JSON.parse(cartItems);
        setCart(cart);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    // Example items for demonstration
    await getCart();
  };

  useEffect(() => {
    calculateTotalPrice(cart);
  }, [cart]);

  const calculateTotalPrice = async (cartItems) => {
    if (cart) {
      setWindowLoaded(true)
    }
    console.log(cart)
    const res = await fetch("http://localhost:8080/getFooditems", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json();
    console.log(data);
    setFoodItems(data["food_items"]);
    let TotalPrice = 0;
    for (let item of cartItems) {
      console.log(typeof item, typeof data["food_items"]);
      for (let food of data["food_items"]) {
        console.log(food.Item);
        if (food.Item === item.name) {
          TotalPrice += food.Price * item.count;
        }
      }
    }
    console.log(TotalPrice);
    setPrice(TotalPrice);
  };

  const getPriceIndividual = (item) => {
    for (let food of foodItems) {
      if (food.Item === item.name) {
        return food.Price;
      }
    }
  }

  const incrementItem = (index) => {
    const newCart = [...cart];
    newCart[index].count += 1;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    calculateTotalPrice(newCart);
  };

  const decrementItem = (index) => {
    const newCart = [...cart];
    if (newCart[index].count > 1) {
      newCart[index].count -= 1;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      calculateTotalPrice(newCart);
    }
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    calculateTotalPrice(newCart);
  };

  return (
    <div className="gradient-bg2 items-left justify-center">
      {userName.length > 0 ? <NavbarLogin item={userName} /> : <Navbar />}
      {windowLoaded &&
        <div className="flex flex-col items-left justify-left min-h-screen pt-40 ml-10 pb-20">
          <div className="text-3xl font-bold mb-4">Cart</div>
          <div className="w-full flex flex-col gap-2">
            {cart.length > 0 &&
              cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white/20 backdrop-blur-lg rounded-lg p-3 border-2 border-red-200 mr-10"
                >
                  <div>
                    <div className="text-sm font-bold">{item.name}</div>
                    <div className="text-sm">Unit Price: ₹{getPriceIndividual(item)}</div>
                    <div className="text-sm">
                      Total: ₹{getPriceIndividual(item) * item.count}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      className="text-white bg-red-500 p-1 rounded"
                      onClick={() => decrementItem(index)}
                    >
                      -
                    </Button>
                    <div className="text-sm font-bold">{item.count}</div>
                    <Button
                      className="text-white bg-green-500 p-1 rounded"
                      onClick={() => incrementItem(index)}
                    >
                      +
                    </Button>
                    <Button
                      className="text-black bg-transparent hover:scale-125 hover:text-white p-1 rounded"
                      onClick={() => removeItem(index)}
                    >
                      X
                    </Button>
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-4">
            <div className="font-light">Final Bill Amount: ₹{price}</div>
            <Button className="bg-red-500 text-white rounded-2xl mt-5 cursor-pointer hover:bg-red-400 mx-auto">
              <a href="/checkout">Proceed to Payment</a>
            </Button>
          </div>
        </div>
      }
    </div>
  );
}
