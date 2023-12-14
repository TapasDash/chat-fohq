import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:5000", {
  auth: {
    token: "abc",
  },
  query: {
    x: 45,
  },
});

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const joinRoom = () => {
    console.log(room, username);
    if (username && room) {
      console.log("kkrs");
      socket.emit(
        "join_room",
        {
          employer: "65526f78e3ddd88fd56acbdd",
          jobSeeker: "65649741570328d1c09b5f4d",
        },
        ({ chatId }) => console.log(`CHTA ID: ${chatId} has been recieved`)
      );
      setIsJoined(true);
    }
  };
  return (
    <div className="App">
      {isJoined ? (
        <Chat socket={socket} username={username} room={room} />
      ) : (
        <div className="joinChatContainer">
          <h3>Join a Chat</h3>
          <input
            type="text"
            placeholder="Tapas..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room Id..."
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      )}
    </div>
  );
}

export default App;
