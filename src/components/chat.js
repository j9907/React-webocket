import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { useSelector} from 'react-redux';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const loginStatus = useSelector((state)=> state.auth.user);
    console.log(message)

    useEffect(() => {
        const client = new Client();
        client.brokerURL = 'ws://localhost:8080/chat';
        client.onConnect = () => {
            setStompClient(client);
            client.subscribe('/topic/public', message => {
                const newMessage = JSON.parse(message.body);            
                setMessages(prevMessages => [...prevMessages, newMessage]);
            });
        };

        client.activate();

        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, []);

    const handleSend = () => {
    if (stompClient && message.trim() !== '' && message !== messages[messages.length - 1]?.content) {
        stompClient.publish({
            destination: '/app/sendMessage',
            body: JSON.stringify({
                sender : loginStatus,
                content: message
            })
        });
        setMessage(''); // 메시지 상태 초기화
    }
};

    console.log(message)

    return (
        <div className="chatcontainer">
            <h1>Chat Room</h1>
            <div className="MessageContainer">
                {messages.map((msg, index) => ( 
                 
                    <div className="chat" key={index}>{msg.sender === loginStatus ? 'You' : msg.sender} : {msg.content}</div>
                ))}
            </div>
            <div className="inputContainer">
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
