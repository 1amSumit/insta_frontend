import { BsEmojiSunglasses } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useState, useRef, useEffect } from "react";
import { IoImageOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { FaPhone as Phone, FaVideo as Video } from "react-icons/fa";
import ReactPlayer from "react-player";

import { getUserById } from "../services/getUserByUSerId";
import { getMessage } from "../services/getMessages";
import MessagesComponent from "./MessagesComponent";
import Modal from "./Modal";
import ShowMessageImagePreview from "./ShowMessageImagePreview";
import { useQuery } from "@tanstack/react-query";
import { getCurrentLoggedInUser } from "../utils/getUserToken";
import { getPofileDetails } from "../services/getProfileDetails";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RightMessage() {
  const [modelOpen, setModalOpen] = useState(false);
  const [emojiopen, setEmojiOpen] = useState(false);
  const [enteredMessage, setEnteredMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [userMessages, setUserMessages] = useState([]);
  const [videoStream, setVideoStream] = useState(null);
  const [videoModel, setVideoModel] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const { messageId } = useParams();

  const messagesEndRef = useRef(null);
  const emojiRef = useRef(null);
  const fileInputRef = useRef(null);

  const [socket, setSocket] = useState(null);

  const loggedInUser = getCurrentLoggedInUser();

  const { data: logedUser, isLoading: loggedUSerLoading } = useQuery({
    queryKey: [loggedInUser],
    queryFn: () => getPofileDetails(loggedInUser),
  });

  useEffect(() => {
    if (logedUser) {
      const sortedUserIds = [messageId, logedUser.userProfile._id].sort();
      const newRoomId = sortedUserIds.join("-");
      setRoomId(newRoomId);
    }
  }, [logedUser]);

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_BASE_WS_URL;

    if (!socketUrl) {
      console.error("WebSocket URL is not defined.");
      return;
    }

    const socket = io(socketUrl);

    socket.on("connect", () => {
      console.log("Socket connected");
      if (roomId) {
        socket.emit("join-room", roomId);
      }
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    socket.on("receive-message", (message) => {
      setUserMessages((prevMessages) => [...prevMessages, message]);
    });

    setSocket(socket);

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [roomId]);

  const { data, isLoading } = useQuery({
    queryKey: [messageId],
    queryFn: () => getUserById(messageId),
  });

  const { data: messages, isLoading: messageLoading } = useQuery({
    queryKey: [messageId, "messages"],
    queryFn: () => getMessage(messageId),
  });

  useEffect(() => {
    if (!messageLoading && messages && messages.messages) {
      setUserMessages(messages.messages);
    }
  }, [messageLoading, messages]);

  const fileOpenHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClickOutside = (event) => {
    if (emojiRef.current && !emojiRef.current.contains(event.target)) {
      setEmojiOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [userMessages]);

  useEffect(() => {
    if (selectedFile) {
      setModalOpen(true);
    }
  }, [selectedFile]);

  const formSubmited = (e) => {
    e.preventDefault();
    socket.emit(
      "send-message",
      {
        to: messageId,
        message: enteredMessage,
        from: logedUser.userProfile._id,
      },
      roomId
    );
    setUserMessages((prev) => [
      ...prev,
      {
        to: messageId,
        message: enteredMessage,
        from: logedUser.userProfile._id,
      },
    ]);
    setEnteredMessage("");
  };

  const videoCallClicked = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setVideoStream(stream);
    console.log(videoStream);
    setVideoModel(true);
    makeCall();
  };

  const makeCall = async () => {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    socket.emit("video-call", { roomId, offer });
  };

  if (messageLoading || isLoading || loggedUSerLoading) {
    return (
      <div className="flex flex-col">
        <div className="h-[10vh] border-b-[1px] border-gray-200 px-2 py-1 flex items-center gap-3">
          <div className="w-[3rem] h-[3rem] rounded-full">
            <Skeleton circle height={48} width={48} />
          </div>
          <h2>
            <Skeleton width={100} />
          </h2>
        </div>
        <div className="h-[80vh] px-[2rem] py-1 overflow-y-auto">
          <div className="flex flex-col gap-[1rem] justify-end">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex items-start">
                <div>
                  <Skeleton width={200} />
                  <Skeleton count={2} width={300} />
                </div>
              </div>
            ))}
            <div style={{ minHeight: "5rem" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="h-[10vh] border-b-[1px] border-gray-200 px-4 py-1 flex flex-row justify-between ">
        <div className="flex items-center gap-3">
          <div className=" w-[3rem] h-[3rem] rounded-full">
            <img
              className="h-[100%] w-[100%] rounded-full"
              src={data.user.profilePic}
              alt={data.user.username}
            />
          </div>
          <h2 className="text-white">{data.user.username}</h2>
        </div>

        <div className="flex flex-row gap-3 items-center ">
          <div className="text-xl cursor-pointer">
            <Phone />
          </div>

          <div className="text-xl cursor-pointer" onClick={videoCallClicked}>
            <Video />
          </div>
        </div>
      </div>
      <div className="h-[80vh] px-[2rem] no-scrollbar py-1 overflow-y-auto ">
        <div className="flex flex-col gap-[1rem] justify-end">
          {userMessages.map((message, index) => (
            <MessagesComponent
              key={index}
              side={message.to === data.user._id ? "right" : "left"}
              message={message.message}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="h-[10vh] relative flex items-center">
        <div className="absolute top-[-28rem] px-[2rem] left-0" ref={emojiRef}>
          <EmojiPicker
            onEmojiClick={(emoji) =>
              setEnteredMessage((prev) => prev + emoji.emoji)
            }
            open={emojiopen}
          />
        </div>
        <form onSubmit={formSubmited} className="w-full">
          <div className="rounded-xl flex flex-row items-center gap-2 border-[1px] px-[1rem] py-[0.5rem] bg-stone-800 border-gray-200 w-full sm:fixed sm:bottom-4  md:absolute md:bottom-3 sm:z-10">
            <BsEmojiSunglasses
              className="text-xl text-white cursor-pointer"
              onClick={() => setEmojiOpen((prev) => !prev)}
            />

            <input
              className="bg-stone-800 text-gray-200 w-full focus:outline-none"
              value={enteredMessage}
              placeholder="Enter message..."
              onChange={(e) => setEnteredMessage(e.target.value)}
            />
            <div
              className="mr-[1rem] text-2xl text-white cursor-pointer"
              onClick={() => fileOpenHandler()}
            >
              <IoImageOutline />
            </div>

            <input
              onChange={(e) => setSelectedFile(e.target.files[0])}
              type="file"
              className="hidden"
              ref={fileInputRef}
            />
          </div>
        </form>
      </div>
      <Modal isOpen={modelOpen} onClose={() => setModalOpen(false)}>
        <ShowMessageImagePreview userId={messageId} file={selectedFile} />
      </Modal>

      <Modal
        isOpen={videoModel}
        onClose={() => {
          setVideoModel(false);
          setVideoStream(null);
        }}
      >
        <div>
          <ReactPlayer url={videoStream} playing />
        </div>
      </Modal>
    </div>
  );
}
