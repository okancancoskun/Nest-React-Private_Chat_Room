import logo from "./logo.svg";
import "./App.css";
import useSocket from "use-socket.io-client";
import { Route } from "react-router-dom";
import Chat from "./components/chat.component";

const App = () => {
  const tk = window.localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [socket] = useSocket("http://localhost:5000", {
    query: {
      token: tk ? tk : "",
      userId: tk ? user._id : "",
    },
    "force new connection": false,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  });
  socket.connect();
  return (
    <div className="App">
      <Route path="/chat/:id" render={(props) => <Chat {...props} socket={socket} />} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
