"use client";
import React from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

export default function Page({ params }) {
  const [user, setUser] = React.useState([]);
  const [windowLoaded, setWindowLoaded] = React.useState(true);

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
        setUser1(data.decodedToken);
      }
    } catch (error) {
      console.log(error);
    }
    // await getOrders();
  }

  const [user1, setUser1] = React.useState([]);
  React.useEffect(() => {
    getOrders();
  }, [user]);

  React.useEffect(() => {
    getUserName();
    getCompletedOrders();
  }, []);

  const [orders, setOrders] = React.useState([]);
  const getOrders = async () => {
    if (user.length === 0) {
      return;
    }
    console.log("hiii1", user);
    try {
      const res1 = await fetch("http://localhost:8080/getuserid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: user.name })
        }
      );
      const data1 = await res1.json();
      console.log("hii", data1);
      const res = await fetch("http://localhost:8080/getordersbyuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id: data1.uid })
        }
      );

      if (params.id !== user.name) {
        setWindowLoaded(false);
      }

      if (res.status !== 200) {
        setOrders([]);
        // console.log(res);
      }

      const data = await res.json();
      console.log(data);
      setOrders(data.orders);
    }
    catch (error) {
      console.log(error);
    }
  }

  const [completedOrders, setCompletedOrders] = React.useState([]);
  const [completedOrdersWindow, setCompletedOrdersWindow] = React.useState(false);
  const getCompletedOrders = async () => {
    try {
      const res = await fetch("http://localhost:8080/getcompletedorders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (res.status !== 200) {
        setCompletedOrders([]);
        // console.log(res);
      }
      const data = await res.json();
      console.log(data);
      setCompletedOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const req = {
      originalName: user.name,
      name: user1.name,
      email: user1.email,
      mobile: Number(user1.mobile)
    }
    console.log(req);
    try {
      const res = await fetch("http://localhost:8080/updateUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(req)
        }
      )
      if (res.status !== 200) {
        const data = await res.json();
        console.log(data);
        console.log(res);
      } else {
        const data = await res.json();
        console.log(data);
        // change the user data in the jwt token
        const req1 = {
          name: user1.name,
          email: user1.email,
          mobile: user1.mobile
        }
        const res1 = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: req1 })
        })
        const body = await res1.json();
        console.log(body);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {!windowLoaded && (
        <div>
          <Navbar />
          <div className="bg-white min-h-screen py-20 px-10 pt-40">
            <div className="flex flex-col items-left justify-left min-h-screen">
              <h1 className="text-3xl lg:text-5xl font-bold mb-8">Your Profile</h1>

              <div
                id="orders"
                className="mb-12 p-6 bg-white border border-red-600 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
                <ul>
                  {orders.map((_, index) => (
                    <li key={index} className="border-b border-red-200 py-2">
                      Order #{index + 1} -{" "}
                      <a href="/track" className="text-gray-700 underline">
                        Details
                      </a>
                    </li>
                  ))}

                </ul>
                <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700" onClick={() => setCompletedOrdersWindow(!completedOrdersWindow)}>
                  {completedOrdersWindow ? "Hide" : "View Completed Orders"}
                </button>
                {completedOrdersWindow && (
                  <ul>
                    {completedOrders.map((_, index) => (
                      <li key={index} className="border-b border-red-200 py-2">
                        Order #{index + 1} -{" "}
                        <a href="/track" className="text-gray-700 underline">
                          Details
                        </a>
                      </li>
                    ))}

                  </ul>
                )}
              </div>

              <div
                id="edit"
                className="p-6 bg-white border border-red-600 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-gray-700">
                      Name
                    </label>
                    <input
                      value={user1.name}
                      placeholder={user1.name}
                      onChange={(e) => setUser1({ ...user1, name: e.target.value })}
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700">
                      Email
                    </label>
                    <input
                      value={user1.email}
                      placeholder={user1.email}
                      onChange={(e) => setUser1({ ...user1, email: e.target.value })}
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700">
                      Phone
                    </label>
                    <input
                      value={user1.mobile}
                      placeholder={user1.mobile}
                      onChange={(e) => setUser1({ ...user1, mobile: e.target.value })}
                      type="tel"
                      id="phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
