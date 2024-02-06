import React, { useState, useEffect } from 'react';

// demo websocket用

function WebSocketComponent() {
    const [ws, setWs] = useState(null);
    const [message, setMessage] = useState('');

    function connect() {
        const newWs = new WebSocket('ws://localhost:8080');
        newWs.onopen = () => {
            console.log('[open connection]');
        };
        newWs.onmessage = (event) => {
            // 接收服务器的消息
            const receivedMessage = event.data;
            console.log(`[Received message from server]: ${receivedMessage}`);
        };
        setWs(newWs);
    };

    function disconnect() {
        if (ws) {
            ws.close();
            ws.onclose = () => console.log('[close connection]');
            setWs(null);
        }
    };

    function sendMessage() {
        if (ws && ws.readyState === WebSocket.OPEN && message.trim() !== '') {
            ws.send(message.toString());
            console.log(`[Sent message to server]: ${message}`);
            // ws.onmessage = event => console.log('[Received message from server]:', event.data);
        } else {
            console.error('WebSocket not connected');
        }
    };




    useEffect(() => {
        // Cleanup function to handle disconnection on unmount
        return () => {
            disconnect();
        };
    }, []);


    return (
        <div style={{ marginTop: '700px' }}>
            <h4 style={{ color: '#fff' }}>WebSocket & SignalR 測試區, 只有測試用</h4>
            <h5 style={{ color: '#dcdcdd' }}>WebSocket:</h5>
            <button id="connect" onClick={connect}>Connect</button>
            <button id="disconnect" onClick={disconnect}>Disconnect</button>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message"
                />
                <button id="sendBtn" onClick={sendMessage}>Send Message</button>
            </div>
        </div>
    );
};

export default WebSocketComponent;
