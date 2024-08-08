"use client";
import React, { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import {
  Minus, Plus
} from "lucide-react"
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Button } from "../../components/ui/button";


const NavBarItem = ({ title, classprops }) => {
  const [count, setCount] = useState([]);
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);

  const pay = async () => {
    const response = await fetch("/api/makepayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: price }),
    });
    const data = await response.json();
    console.log(data);
  }

  const handeClick = async (isPositive, index) => {
    // console.log(count);
    const newCount = [...count];
    if (isPositive) { newCount[index] += 1; }
    else { newCount[index] -= 1; }
    newCount[index] = Math.max(0, newCount[index]);
    if (newCount[index] == 0) {
      const newCart = [];
      for (let i = 0; i < cart.length; i++) {
        if (i != index) {
          newCart.push(cart[i]);
        }
      }
      await setCart(newCart);
    }
    await setCount(newCount);
    const cart1 = [];
    for (let i = 0; i < cart.length; i++) {
      cart1.push({ name: cart[i].name, count: newCount[i] });
    }
    await localStorage.setItem("cart", JSON.stringify(cart1));
    await getPrice(cart1);
    await handleClick();
  };

  const getPrice = async (cart) => {
    const response = await fetch("/api/billCalculator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: cart }),
    }
    )
    const data = await response.json();
    console.log(data);
    await setPrice(data);
  }
  const handleClick = async () => {
    const response = await localStorage.getItem("cart");
    console.log(response);
    await setCart(JSON.parse(response));
    const cart = JSON.parse(response);
    const newCount = [];
    for (let i = 0; i < cart.length; i++) {
      newCount.push(cart[i]["count"]);
    }
    console.log(newCount);
    setCount(newCount);
    await getPrice(cart);
  }
  return title != "My Cart" ? (
    <li
      className={`mx-4 cursor-pointer ${classprops}`}
      onClick={() => {
        if (title === "Contact Us") {
          window.location.href = "/contact";
        } else if (title === "Services") {
          window.location.href = "/services";
        }
      }}
    >
      {title == "My Cart" ? (
        <AiOutlineShoppingCart className="mr-1" size={30} />
      ) : title}
    </li>
  ) : (
    <Drawer className="blue-glassmorphism text-white">
      <DrawerTrigger asChild>
        <li
          className={`mx-4 cursor-pointer ${classprops}`}
          onClick={handleClick}
        >
          <AiOutlineShoppingCart className="mr-1" size={30} />
        </li>
      </DrawerTrigger>
      <DrawerContent className="blue-glassmorphism text-white">
        <DrawerHeader>
          <DrawerTitle>Cart</DrawerTitle>
          <DrawerDescription>
            <ScrollArea className=" w-full">
              {cart.length > 0 &&
                cart.map((item, index) =>
                  item.count != 0 && (
                    <div
                      key={index}
                      className="flex flex-row items-center justify-between blue-glassmorphism select-none mb-2 p-2 px-3"
                    >
                      <div className="flex">
                        <div className="flex items-start justify-start flex-col w-full">
                          <h1 className="text-white font-black font-mono mr-auto text-sm">
                            {item.name}
                          </h1>
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <Minus
                          className="w-4 h-4 m-4 bg-[#282828] hover:bg-[#202020] active:bg-black text-white font-bold rounded-xl"
                          onClick={() => {
                            handeClick(false, index);
                          }}
                        />
                        <span className="w-[10px]">{count[index]}</span>
                        <Plus
                          className="w-4 h-4 m-4 bg-[#282828] hover:bg-[#202020] active:bg-black text-white font-bold rounded-xl"
                          onClick={() => {
                            handeClick(true, index);
                          }}
                        />
                      </div>
                    </div>
                  ))}
              <ScrollBar />
            </ScrollArea>
            <div className="flex gap-4 dark text-white font-extralight">
              Final Bill Amount:
              <div className="red-glassmorphism flex w-[100px] justify-center items-center dark font-normal">
                {price}
              </div>
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button className="gradient-bg-footer text-white" onClick={pay}>checkout</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer >
  );
}

const NavbarLogin = ({ item }) => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="fixed gradient-bg-welcome w-full flex md:justify-center justify-between items-center p-2">
      <div className="md:flex-[0.5] flex-initial justify-center items-center lg:ml-10">
        <img
          src={"/SwiftShip-logos_white.png"}
          alt="logo"
          className="w-20 h-20 cursor-pointer rounded-full"
          onClick={() => {
            window.location.href = "/";
          }}
        />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial ml-auto">
        {["My Cart", "Services", "Contact Us"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        <li
          className="bg-[#A952e3] py-2 px-12 ml-4 mr-7 rounded-md cursor-pointer hover:bg-[#A546bd]"
          onClick={() => {
            window.location.href = `/dashboard`;
          }}
        >
          {item}
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
              flex flex-col justify-start items-center rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["My Cart", "Services", "Contact Us"].map((item, index) => (
              <NavBarItem
                key={item + index}
                title={item}
                classprops="my-2 text-lg"
              />
            ))}
            <li
              className="bg-[#A952e3] py-2 px-12 ml-4 mr-7 rounded-md cursor-pointer hover:bg-[#A546bd]"
              onClick={() => {
                window.location.href = `/dashboard`;
              }}
            >
              {item}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavbarLogin;
