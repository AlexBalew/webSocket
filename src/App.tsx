import React, {useState} from 'react';
import './App.css';

function App() {

    const [messages, setMessages] = useState([
        {message: 'hey hey Kate', id: 123948, user: {id: 'jnjkfvlf', name: 'Alex'}},
        {message: 'hello Alex', id: 456, user: {id: '35hyhy', name: 'Kate'}}
    ])


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
            <div className= 'messageBlock'>
                <textarea >

                </textarea>
                <button>
                    Send
                </button>
            </div>
        </div>
    );
}

export default App;
