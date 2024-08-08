"use client";
import Navbar from "../components/Navbar";
import NavbarLogin from "../components/NavbarLogin";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";

const Page = () => {
  const [userName, setUserName] = useState("");
  const [menus, setMenus] = useState([]);
  const [count, setCount] = useState();
  const getUserName = async () => {
    try {
      const res = await axios.get("/api/getcookies");
      console.log(res.data.result.value);
      try {
        if (res.data.result.value) {
          setUserName(res.data.result.value);
        }
      } catch (e) { }
    } catch (e) { }
  };

  const loadMenus = async () => {
    const res = await axios.get("/api/getmenus");
    console.log(res.data);
    try {
      if (res.data) {
        setMenus(res.data);
        setCount(Array(res.data.length).fill(0));
      }
    } catch (e) { }
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      const newCount = Array(cart.length).fill(0);
      for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < res.data.length; j++) {
          if (cart[i].name === res.data[j].name) {
            newCount[j] = cart[i].count;
          }
        }
      }
      setCount(newCount);
    }
  };


  const handeClick = async (isPositive, index) => {
    const newCount = [...count];
    if (isPositive) { newCount[index] += 1; }
    else { newCount[index] -= 1; }
    newCount[index] = Math.max(0, newCount[index]);
    await setCount(newCount);
    const cart = [];
    for (let i = 0; i < menus.length; i++) {
      cart.push({ name: menus[i].name, count: newCount[i] });
    }
    await localStorage.setItem("cart", JSON.stringify(cart));
  };


  useEffect(() => {
    try {
      getUserName();
      loadMenus();
    } catch (e) { }
  }, []);

  return (
    <ScrollArea className="h-screen">
      {userName.length > 0 ? <NavbarLogin item={userName} cart={setCount} /> : <Navbar />}
      <div className=" flex flex-col gradient-bg-footer w-screen min-h-screen pt-[100px] overflow-auto">
        {/* See all the menus */}
        <h1 className="text-white text-4xl font-bold ml-10 p-5">Rishabhs Menu</h1>
        {/* <RishabhMenu /> */}
        <div className="flex justify-left gap-8 ml-10">
          <Dialog className="select-none">
            <DialogTrigger asChild>
              <div onClick={
                () => {
                  const cart = JSON.parse(localStorage.getItem("cart"));
                  if (cart) {
                    const newCount = Array(menus.length).fill(0);
                    for (let i = 0; i < cart.length; i++) {
                      for (let j = 0; j < menus.length; j++) {
                        console.log(cart[i], menus[j]);
                        if (cart[i].name === menus[j].name) {
                          newCount[j] = cart[i].count;
                        }
                      }
                    }
                    setCount(newCount);
                  }
                }
              } className=" flex justify-center items-center gradient-bg-services border-2 border-[#282828] hover:border-[#202020] active:border-black select-none cursor-pointer w-[300px] p-3 rounded-lg">
                <div>
                </div>
                <div className=" px-7">
                  <div className="text-white font-mono font-black text-2xl">Main Menu</div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="white-glassmorphism text-white">
              <DialogHeader>
                <DialogTitle className="select-none">Main Menu</DialogTitle>
                <DialogDescription className="flex items-center justify-center p-3">
                  <ScrollArea className="h-[500px] w-full">
                    {menus.length > 0 &&
                      menus.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-row items-center justify-between blue-glassmorphism select-none mb-2 p-3"
                        >
                          <div className="flex">
                            <div className="flex items-start justify-start flex-col w-full">
                              <h1 className="text-white font-black font-mono mr-auto text-sm">
                                {item.name}
                              </h1>
                              <p className="text-white text-xs font-extralight mr-auto">
                                {item.contents}
                              </p>
                              <h1 className="text-white text-md font-bold mr-auto">
                                Price: {item.price}
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
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <div className=" flex justify-center items-center gradient-bg-services border-2 border-[#282828] hover:border-[#202020] active:border-black select-none cursor-pointer w-[300px] p-3 rounded-lg">
                <div>
                </div>
                <div className="px-7">
                  <div className="text-white font-mono font-black text-2xl">Specials</div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="white-glassmorphism text-white">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <div className=" flex justify-center items-center gradient-bg-services border-2 border-[#282828] hover:border-[#202020] active:border-black select-none cursor-pointer w-[300px] p-3 rounded-lg">
                <div>
                </div>
                <div className="px-7">
                  <div className="text-white font-mono font-black text-2xl">Ice Cube</div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="white-glassmorphism text-white">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="h-0.5 w-3/4 bg-[#303030] mt-10 m-5"></div>
        {/* See all the popular items in a carousel */}
        <h1 className="text-white text-4xl font-bold ml-10 p-5">
          Popular Right Now
        </h1>
        <div className="max-w-screen mt-2 mb-20 px-20 ">
          <Carousel className="text-white mt-5">
            <CarouselPrevious className="text-white bg-[#323232] p-0 m-0" />
            <CarouselNext className="text-white bg-[#323232] m-0 p-0" />
            <CarouselContent className="ml-1 gap-1">
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <CarouselItem className="basis-1/4 p-0" key={index}>
                    <Card className="gradient-bg-transactions border-[#282828] select-none p-0">
                      <CardContent className="p-0 flex items-center justify-center">
                        <Image
                          alt="hii surya"
                          src={"/dummyPhoto.jpg"}
                          width={200}
                          height={100}
                          className="rounded-2xl m-2 w-1/2"
                        />
                      </CardContent>
                      <CardFooter className="flex-col">
                        <CardTitle className="text-white font-mono p-0 m-0">
                          Laundramat {index}
                        </CardTitle>
                        <CardDescription className="text-white font-mono p-0 m-0">
                          4.5
                        </CardDescription>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};

export default Page;
