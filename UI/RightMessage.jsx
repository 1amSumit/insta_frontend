/* eslint-disable react/prop-types */
import { BsEmojiSunglasses } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

import MessagesComponentSender from "./MessagesComponentSender";
import MessagesComponentReciever from "./MessagesComponentReciever";

export default function RightMessage({ recieverUserName, recieverProfilePic }) {
  const [emojiopen, setEmojiOpen] = useState(false);
  const [enteredMessage, setEnteredMessage] = useState("");

  const formSubmited = (e) => {
    e.preventDefault();
    console.log(enteredMessage);
    setEnteredMessage("");
  };
  return (
    <div className="flex flex-col">
      <div className="h-[10vh] border-b-[1px] border-gray-200 px-2 py-1 flex items-center">
        <div className="bg-green-500 w-[3rem] h-[3rem] rounded-full flex-row gap-4">
          <img
            className="h-[100%] w-[100%] rounded-full"
            src={recieverProfilePic}
            alt={recieverUserName}
          />
        </div>
        <h2>{recieverUserName}</h2>
      </div>
      <div className="h-[80vh] px-[2rem] flex flex-col justify-end py-1 overflow-y-auto">
        <div className="flex flex-col gap-[1rem] justify-end">
          <MessagesComponentSender message="hi" />
          <MessagesComponentSender message="hallo" />
          <MessagesComponentReciever message="bye" />
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
              className="outline-none"
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
