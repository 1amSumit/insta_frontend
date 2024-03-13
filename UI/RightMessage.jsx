import { BsEmojiSunglasses } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useState, useRef, useEffect } from "react";
``;

import { useMutation, useQuery } from "@tanstack/react-query";
import { sendMessages } from "../services/sendMessages";
import { useParams } from "react-router-dom";

import { getUserById } from "../services/getUserByUSerId";
import { getMessage } from "../services/getMessages";
import MessagesComponent from "./MessagesComponent";

export default function RightMessage() {
  const [emojiopen, setEmojiOpen] = useState(false);
  const [enteredMessage, setEnteredMessage] = useState("");
  const { messageId } = useParams();

  const messagesEndRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: [messageId],
    queryFn: () => getUserById(messageId),
  });

  const { data: messages, isLoading: messageLoading } = useQuery({
    queryKey: [messageId, "mesages"],
    queryFn: () => getMessage(messageId),
    staleTime: 5000,
    refetchInterval: 1000,
  });

  const { mutate } = useMutation({
    mutationFn: sendMessages,
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formSubmited = (e) => {
    e.preventDefault();
    mutate({ userId: messageId, message: enteredMessage });
    setEnteredMessage("");
  };

  if (isLoading || messageLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col">
      <div className="h-[10vh] border-b-[1px] border-gray-200 px-2 py-1 flex items-center gap-3">
        <div className=" w-[3rem] h-[3rem] rounded-full">
          <img
            className="h-[100%] w-[100%] rounded-full"
            src={data.user.profilePic}
            alt={data.user.username}
          />
        </div>
        <h2>{data.user.username}</h2>
      </div>
      <div className="h-[80vh] px-[2rem] no-scrollbar py-1 overflow-y-auto ">
        <div className="flex flex-col gap-[1rem] justify-end">
          {messages.messages.map((message) => (
            <MessagesComponent
              key={message._id}
              side={message.to === data.user._id ? "right" : "left"}
              message={message.message}
            />
          ))}
          <div ref={messagesEndRef} />{" "}
        </div>
      </div>

      <div className="h-[10vh] relative flex items-center">
        <div className="absolute top-[-28rem] px-[2rem] left-0">
          <EmojiPicker
            onEmojiClick={(emoji) =>
              setEnteredMessage((prev) => prev + emoji.emoji)
            }
            open={emojiopen}
          />
        </div>
        <form onSubmit={formSubmited} className="w-full px-[2rem]">
          <div className="rounded-xl flex flex-row items-center gap-2  border-[1px] px-[1rem] py-[0.5rem]  border-gray-800 w-full ">
            <BsEmojiSunglasses
              className="text-xl cursor-pointer"
              onClick={() => setEmojiOpen((prev) => !prev)}
            />

            <input
              className="outline-none w-full"
              value={enteredMessage}
              placeholder="Enter message..."
              onChange={(e) => setEnteredMessage(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
