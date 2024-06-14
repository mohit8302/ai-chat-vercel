// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import ChatBox from './ChatBox.jsx';
import './index.css';

const renderChatWidget = (containerId, props) => {
    const container = document.getElementById(containerId);
    if (container) {
        ReactDOM.render(<ChatBox {...props} />, container);
    } else {
        console.error(`Container with id ${containerId} not found.`);
    }
};

window.renderChatWidget = renderChatWidget;
export default renderChatWidget;
