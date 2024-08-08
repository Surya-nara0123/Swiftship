"use client";
import NavbarLogin from "../components/NavbarLogin";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

let windowClose1 = false;
let myTasks = [
  {
    _id: {
      $oid: "65bc7bcbe8a81a5959904b39",
    },
    taskTitle: "task3",
    type: "delivery of books",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bc7bd2e8a81a5959904b3c",
    },
    taskTitle: "task3",
    type: "delivery of books",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bc7bd3e8a81a5959904b3f",
    },
    taskTitle: "task3",
    type: "delivery of books",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bc7d97e8a81a5959904b4a",
    },
    taskTitle: "task3",
    type: "delivery of books",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bc7f3de8a81a5959904b51",
    },
    taskTitle: "task4",
    type: "priority delivery",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bc7f60e8a81a5959904b54",
    },
    taskTitle: "task10",
    type: "delivery of books",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bcf3a8175a810ae50aee95",
    },
    taskTitle: "food venum",
    type: "delivery of food",
    fromLocation: "rishabhs",
    toLocation: "gh5",
    fromUsername: "sajit",
    toUsername: "",
    __v: 0,
  },
];
const l = [
  {
    _id: {
      $oid: "65bc7bcbe8a81a5959904b39",
    },
    taskTitle: "task3",
    type: "delivery of books",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bc7bd2e8a81a5959904b3c",
    },
    taskTitle: "task3",
    type: "delivery of books",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bc7bd3e8a81a5959904b3f",
    },
    taskTitle: "task3",
    type: "delivery of books",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bc7d97e8a81a5959904b4a",
    },
    taskTitle: "task3",
    type: "delivery of books",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bc7f3de8a81a5959904b51",
    },
    taskTitle: "task4",
    type: "priority delivery",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bc7f60e8a81a5959904b54",
    },
    taskTitle: "task10",
    type: "delivery of books",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bcf3a8175a810ae50aee95",
    },
    taskTitle: "food venum",
    type: "delivery of food",
    fromLocation: "rishabhs",
    toLocation: "gh5",
    fromUsername: "sajit",
    toUsername: "",
    __v: 0,
  },
];

const TaskWindow = ({ item }) => {
  const [windowClose, setWindowClose] = useState(false);
  return (
    <div className="">
      {!windowClose && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 white-glassmorphism rounded-md shadow-md p-5 px-7 border-black border-2 mx-auto">
          <AiOutlineClose
            className="absolute top-3 right-3 cursor-pointer font-black z-0"
            onClick={() => {
              setWindowClose(true);
              windowClose1 = true;
            }}
          />
          <h1 className="font-black text-white text-1xl">{item.type}</h1>
          <h1 className="font-black text-white text-1xl">
            From: {item.fromLocation}
          </h1>
          <h1 className="font-black text-white text-1xl">
            To: {item.toLocation}
          </h1>
          <h1 className="font-black text-white text-1xl">
            From: {item.fromUsername}
          </h1>
          <h1 className="font-black text-white text-1xl">
            To: {item.toUsername}
          </h1>
          <button
            className="bg-[#A952e3] py-2 px-12 ml-4 mr-7 rounded-md cursor-pointer hover:bg-[#A546bd]"
            onClick={() => {
              setWindowClose(true);
              windowClose1 = true;
              myTasks.push(item);
              let index = l.indexOf(item);
              l.splice(index, 1);
            }}
          >
            Accept
          </button>
        </div>
      )}
    </div>
  );
};

const Page = ({ params }) => {
  const [userLoggiedIn, setUserLoggedIn] = useState(false);

  // refresh the page
  const [counter, setCounter] = useState(0);
  const [taskToggle, settaskToggle] = useState([false, 0]);
  const [userName, setUserName] = useState("");
  const getUserName = async () => {
    const res = await axios.get("/api/getcookies");
    console.log(res.data.result.value);
    try {
      if (res.data.result.value) {
        setUserName(res.data.result.value);
        setUserLoggedIn(true);
      }
    } catch (e) {}
  };

  useEffect(() => {
    // get the user name from the token using the get method from /api/me
    getUserName();

    const intervalId = setInterval(() => {
      // Increment the counter
      setCounter((prevCounter) => prevCounter + 1);
    }, 500); // Interval in milliseconds (e.g., 1000ms = 1 second)

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      {userLoggiedIn ? (
        <>
          <div>
            <NavbarLogin item={userName} />
            <div className="min-h-screen gradient-bg-footer">
              <div className="gradient-bg2 flex flex-col h-[500px] items-center justify-center">
                <h1 className="font-black text-3xl">Welcome {userName}</h1>
                <h1 className="font-bold text-1xl">
                  See all tasks you are eligible for in this page
                </h1>
              </div>
              {/* display the tasks */}
              {/* Heading */}
              <div className="white-glassmorphism flex flex-col items-center justify-center py-3 mx-2 mt-4">
                <h1 className="font-bold text-white text-2xl">Active Tasks</h1>
              </div>
              {/* Acutal Tasks */}
              <div className="min-w-screen gradient-bg3 p-2 mt-4 rounded-md">
                {/* grid tag */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {l.map((items, index) => {
                    return (
                      <div key={index}>
                        <div
                          className="white-glassmorphism rounded-md shadow-md p-4 cursor-pointer hover:bg-[#FFFFFF22] text-black font-black"
                          onClick={() => {
                            settaskToggle([true, items]);
                            windowClose1 = false;
                          }}
                        >
                          {items.taskTitle}
                        </div>
                      </div>
                    );
                  })}
                  {taskToggle[0] & !windowClose1 ? (
                    <TaskWindow item={taskToggle[1]} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Page;
