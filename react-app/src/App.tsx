import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

import { Socket } from "socket.io-client";
import SocketClass from "./services/socket";
import reactLogo from "./assets/react.svg";
import { useState } from "react";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);
  const error = () => toast.error("Socket Connection Error");
  const success = () => toast.success("Socket connection Success");

  const handleClick = async () => {
    try {
      let socket: Socket | null;

      if (!SocketClass.getSocket()) {
        socket = await SocketClass.connect();

        // On Upload files
        socket.emit("upload", ["file name1", "file name2"]);
      }
    } catch (err) {
      error();
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={handleClick}>Emit message</button>
      <ToastContainer />
    </>
  );
}

export default App;
