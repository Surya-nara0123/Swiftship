"use client";
import React, { useState, useEffect } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import {
  AiOutlineClose,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import { toast } from "sonner";
import axios from "axios";

const NavBarItem = ({ title, classprops, userName }) => {
  return (
    <li
      className={`mx-4 cursor-pointer ${classprops}`}
      onClick={() => {
        //(userName);
        if (title === "Contact Us") {
          window.location.href = "/contact";
        } else if (title === "Services") {
          window.location.href = "/services";
        } else if (title === "My Cart") {
          //(userName);
          if (userName === "") {
            toast.error("Please login to view your cart");
            return;
          }
          window.location.href = "/cart";
        } else if (title === "Account") {
          // //(userName);
          window.location.href = `/profile/${userName}`;
        } else if (title == "Logout") {
          fetch("/api/logout", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            if (res.status === 200) {
              //(res);
              toast.success("Logged out successfully");
              window.location.href = "/";
            } else {
              toast.error("Error logging out");
            }
          }
          );
          // axios.post("/api/logout").then((res) => {
          //   if (res.status === 200) {
          //     console.log(res);
          //     toast.success("Logged out successfully");
          //     // window.location.href = "/";
          //   } else {
          //     toast.error("Error logging out");
          //   }
          // });
        }
      }}
    >
      {title === "My Cart" ? (
        <AiOutlineShoppingCart className="mr-1" size={30} />
      ) : title === "Account" ? (
        <AiOutlineUser className="mr-1" size={30} />
      ) : title === "Logout" ? (
        <>
          <AiOutlineLogout
            className="mr-1 lg: hidden"
            size={30}
            color="black"
          />
          <AiOutlineLogout className="mr-1 " size={30} />
        </>
      ) : (
        title
      )}
    </li>
  );
};

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);

  const [userId, setUserId] = useState("");
  const getUserId = async () => {
    if (userName === "") {
      return;
    }
    //(window.location.href);
    let res = await fetch(
      "https://swiftshipbackend-production.up.railway.app/getuserid",
      {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
        }),
      }
    );
    let data = await res.json();
    // //(data);
    if (data["uid"] == 0) {
      res = await fetch(
        "https://swiftshipbackend-production.up.railway.app/getresturantid",
        {
          method: "POST",
          // mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userName,
          }),
        }
      );
      data = await res.json();
      //(data.result);
      data = data["result"];
    }
    setUserId(data["uid"]);
  };
  useEffect(() => {
    // //(userName);
    getUserId();
  }, [userName]);

  const getUserName = async () => {
    try {
      const res = await fetch("/api/getToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 200) {
        setUserName("");
        // //(res);
        return;
      }
      const body = await res.json();
      if (body["message"] == "Token Expired") {
        // //("Token Expired");
        setUserName("");
        return;
      }
      // //(body);
      setUserName(body["decodedToken"]["name"]);
    } catch (error) {
      //(error);
    }
  };

  useEffect(() => {
    getUserName();
    getUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="select-none z-10 fixed gradient-bg-welcome w-full flex md:justify-center justify-between items-center p-2">
      <div className="md:flex-[0.5] flex-initial justify-center items-center lg:ml-10">
        <img
          src={"/SwiftShip-logos_red.png"}
          alt="logo"
          className="w-20 h-20 cursor-pointer rounded-full"
          onClick={() => {
            window.location.href = "/";
          }}
        />
      </div>
      <ul className="text-black md:flex hidden list-none flex-row justify-between items-center flex-initial ml-auto">
        {userName === "" ? (
          <>
            <li
              className="text-black py-2 pl-4 rounded-full cursor-pointer hover:text-red-500"
              onClick={() => {
                window.location.href = "/signup";
              }}
            >
              Sign up
            </li>
            <li
              className="text-black py-2 px-7 rounded-full cursor-pointer hover:text-red-500"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Log in
            </li>
          </>
        ) : (
          (window.location.href.includes("profile") ||
            window.location.href.includes("admin")) && (
            <NavBarItem key={"Logout"} title={"Logout"} />
          )
        )}
        <NavBarItem key={"Account"} title={"Account"} userName={userId} />
        <NavBarItem key={"My Cart"} title={"My Cart"} />
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-black md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-black md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
              flex flex-col justify-start items-center rounded-md bg-red-400 text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            <NavBarItem
              key={"Account"}
              title={"Account"}
              classprops="my-2 text-lg"
            />
            <NavBarItem
              key={"My Cart"}
              title={"My Cart"}
              classprops="my-2 text-lg"
            />
            {userName === "" ? (
              <>
                <li
                  className="text-black py-2 pl-4 rounded-full cursor-pointer hover:text-red-500"
                  onClick={() => {
                    window.location.href = "/signup";
                  }}
                >
                  Sign up
                </li>
                <li
                  className="text-black py-2 px-7 rounded-full cursor-pointer hover:text-red-500"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  Log in
                </li>
              </>
            ) : (
              window.location.href.includes("profile") ||
              (window.location.href.includes("admin") && (
                <NavBarItem key={"Logout"} title={"Logout"} />
              ))
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
