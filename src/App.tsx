import React, {ChangeEvent, useEffect, useState} from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket = io("https://samurai-chat-back.herokuapp.com")

function App() {

    const [messages, setMessages] = useState<Array<any>>([
        /*{message: 'hey hey Kate', id: 123948, user: {id: '345678', name: 'Alex'}},
        {message: 'hello Alex', id: 456, user: {id: '97656', name: 'Kate'}}*/
    ])

    const [message, setMessage] = useState<string>('hello')

    const onSetMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }

    const onSendMessageToBack = () => {
        socket.emit('client-message-sent', message)
        setMessage('')
        }

    useEffect(() => {

        socket.on('init-messages-published', (messages: any) => {
            setMessages(messages)
        })
        socket.on('new-message-sent', (message: any) => {
            setMessages( (messages) => [...messages, message])
        })

    }, [])

    return (
        <div className="App">
            <div className='chatWindow'>
                {messages.map(({message, id, user}) => {
                    return <div key={id}>
                        <b>{user.name}</b> : {message}
                        <hr/>
                    </div>
                })}
            </div>
            <div className='messageBlock'>
                <textarea placeholder={'your message'}
                          value={message}
                          onChange={onSetMessage}/>
                <button onClick={onSendMessageToBack}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default App;
