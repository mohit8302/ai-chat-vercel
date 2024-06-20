// src/ChatBox.jsx
import React, { useState, useEffect, useRef } from "react";
import sicon from "../src/assets/setting.svg";
import send from "../src/assets/send.svg";
import cross from "../src/assets/cross.svg";
import chat from "../src/assets/chat.svg";
import "./ChatBox.css";



const ChatBox = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatContainerRef = useRef(null);

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

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = { text: inputValue, timestamp: new Date(), sender: "user" };
      setMessages([...messages, newMessage]);
      setInputValue("");
      setIsLoading(true);

      // Simulate API call with a delay
      setTimeout(() => {
        fetchScrapedData(inputValue).then(() => {
          const clientResponse = { text: "This is a response from the AI Assistant.", timestamp: new Date(), sender: "client" };
          setMessages((prevMessages) => [...prevMessages, clientResponse]);
          setIsLoading(false);
        });
      }, 2000);
    }
  };

  const fetchScrapedData = async (url) => {
    try {
      const response = await axios.post('http://localhost:3001/scrape', { url });
      const data = response.data.data;
      console.log('Scraped data:', data); // Log the scraped data for testing purposes
    } catch (error) {
      console.error('Error fetching scraped data:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <div className="chat-bot font-montserrat fixed bottom-4 right-4 sm:bottom-2 sm:right-2 md:bottom-6 md:right-6">
      {isChatVisible ? (
        <div className="relative">
          <div className="bg-[#EFEFEF] w-80 h-80 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-lg overflow-hidden shadow-lg flex flex-col bg-white">
            {/* Header */}
            <div className="bg-[#D9D9D9] flex items-center justify-between p-3 h-14">
              <div className="flex items-center">
                <div className="bg-[#7C7C7C] rounded-full w-6 h-6"></div>
                <span className="ml-4 text-gray-700">
                  {isSettingsVisible ? "AI Assistant Setting" : "AI Assistant"}
                </span>
              </div>
              <button className="text-gray-500 hover:text-gray-700" onClick={toggleSettings}>
                <img className="setting-icon" src={isSettingsVisible ? chat : sicon} alt="icon" />
              </button>
            </div>

            {/* Main Content */}
            {isSettingsVisible ? (
              <div className="flex-1 bg-[#EFEFEF] p-4 overflow-y-auto">
                {/* Settings Panel */}
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
              <div className="chat-text flex-1 bg-[#EFEFEF] p-4 overflow-y-auto chat-box" ref={chatContainerRef}>
                {messages.map((message, index) => (
                  <div key={index} className={`message-container mb-2 flex flex-col ${message.sender === "client" ? "items-start" : "items-end"}`}>
                    <div className={`message-text p-2 rounded-md max-w-xs w-auto break-words ${message.sender === "client" ? "bg-[#FFFFFF]" : "bg-[#D9D9D9]"}`}>
                      <p className="text-gray-700 m-0">{message.text}</p>
                    </div>
                    <span className="message-timestamp text-[9px] text-gray-500 mt-1">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                ))}
                {isLoading && (
                  <div className="message-container mb-2 flex flex-col items-start">
                    <div className="loading-dots">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Input Area */}
            {!isSettingsVisible && (
              <div className="bg-[#EFEFEF] flex items-center p-2">
                <input
                  type="text"
                  placeholder="Talk to our assistant..."
                  className="flex-1 rounded-full py-2 px-4 text-gray-700 placeholder-gray-500 bg-[#FFFFFF] focus:outline-none"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button className="text-gray-500 hover:text-gray-700 ml-2" onClick={handleSendMessage}>
                  <img className="w-6 h-6" src={send} alt="send-icon" />
                </button>
              </div>
            )}
          </div>
          <button
            className="cross-btn mt-8 sm:mt-8 md:ml-320 rounded-full w-12 h-12 bg-[#D9D9D9] text-gray-500 hover:text-gray-700 flex items-center justify-center"
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
export default ChatBox