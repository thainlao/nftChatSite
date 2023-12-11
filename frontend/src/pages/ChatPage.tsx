import '../styles/chatpage.css';
import { useEffect, useState } from 'react';

const ChatPage = () => {
    
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:5001/ws');

        ws.addEventListener('open', () => {
            console.log('WebSocket Connected');
        });

        ws.addEventListener('message', (event) => {
            console.log('Received:', event.data);
        });

        ws.addEventListener('close', () => {
            console.log('WebSocket Closed');
        });

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div className='chat'>
            <div className='chat_container'>
                <div className='left_section_chat'>
                    <h2>LEFT</h2>
                </div>

                <div className='right_section_chat'>
                    <h2>RIGHT</h2>
                </div>                  
            </div>     
        </div>
    )
}

export default ChatPage