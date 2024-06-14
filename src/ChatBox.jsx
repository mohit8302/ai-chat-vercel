// src/ChatBox.jsx
import React, { useState } from "react";
import sicon from "../src/assets/setting.svg";
import send from "../src/assets/send.svg";
import cross from "../src/assets/cross.svg";
import chat from "../src/assets/chat.svg";
import "./ChatBox.css";

 const ChatBox = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5);


  const handleCloseChat = () => {
    setIsChatVisible(false);
  };

  const handleOpenChat = () => {
    setIsChatVisible(true);
    setNotificationCount(0);
  };

  const toggleSettings = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  return (
    <div className="chat-bot font-montserrat fixed bottom-4 right-8 z-50">
      {isChatVisible ? (
        <div className="relative">
          <div className="bg-[#EFEFEF] w-96 h-96 rounded-lg overflow-hidden shadow-lg flex flex-col bg-white">
            <div className="bg-[#D9D9D9] font-medium flex items-center justify-between p-3 h-14">
              <div className="flex items-center">
                <div className="bg-[#7C7C7C] rounded-full w-6 h-6"></div>
                <span className="ml-4 text-[#7C7C7C] ">
                  {isSettingsVisible ? "AI Assistant Setting" : "AI Assistant"}
                </span>
              </div>
              <button className="text-gray-500 hover:text-gray-700" onClick={toggleSettings}>
                <img className="setting-icon" src={isSettingsVisible ? chat : sicon} alt="icon" />
              </button>
            </div>
            {isSettingsVisible ? (
              <div className="flex-1 bg-[#EFEFEF] p-4 overflow-y-auto">
                <div className="font-semibold text-[#7C7C7C] flex flex-col space-y-4">
                  <div className="bg-[#D9D9D9] flex items-center justify-between p-2 rounded-lg">
                    <span>Suggest in real time</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="bg-[#D9D9D9] flex items-center justify-between p-2 rounded-lg">
                    <span>Remember my choices</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="bg-[#D9D9D9] flex items-center justify-between p-2 rounded-lg">
                    <span>Stop suggestions completely</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="bg-[#D9D9D9] flex items-center justify-between p-2 rounded-lg">
                    <span>Remove assistant for me</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 bg-[#EFEFEF] p-4 overflow-y-auto">
              </div>
            )}
            {!isSettingsVisible && (
              <div className="text-[#CBCBCB] bg-[#EFEFEF] flex items-center p-2">
                <input
                  type="text"
                  placeholder="Talk to our assistant..."
                  className="flex-1 rounded-full py-2 px-4 text-gray-700 placeholder-gray-500 bg-[#FFFFFF] focus:outline-none"
                />
                <button className="text-gray-500 hover:text-gray-700 ml-2 ">
                  <img className="w-6 h-6" src={send} alt="send-icon" />
                </button>
              </div>
            )}
          </div>
          <button
            className="cross-btn mt-6 rounded-full w-12 h-12 bg-[#D9D9D9] text-gray-500 hover:text-gray-700 bottom[-16px] right-[-14px] flex items-center justify-center"
            onClick={handleCloseChat}
          >
            <img className="w-6 h-6" src={cross} alt="close-icon" />
          </button>
        </div>
      ) : (
        <button
          className="relative rounded-full w-12 h-12 bg-[#D9D9D9] text-gray-500 hover:text-gray-700 flex items-center justify-center"
          onClick={handleOpenChat}
        >
          <img className="w-6 h-6" src={chat} alt="chat-icon" />
          {notificationCount > 0 && (
            <div className="notification-badge">
              {notificationCount}
            </div>
          )}
        </button>
      )}
    </div>
  );
};

export default ChatBox;