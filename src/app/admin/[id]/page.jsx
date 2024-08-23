"use client";
import React from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

export default function Page({ params }) {
  const [user, setUser] = React.useState([]);
  const [windowLoaded, setWindowLoaded] = React.useState(true);
  const [foodItems, setFoodItems] = React.useState([]);

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
      if (res.status !== 200) {
        setFoodItems([]);
        // console.log(res);
      } else {
        const data = await res.json();
        console.log(data["food_items"]);
        setFoodItems(data["food_items"]);
      }
    } catch {

    }
  }

  React.useEffect(() => {
    getUserName();
    getFoodItems();
  }, []);


  return (
    <div>
      <Navbar />
    </div>
  )


}