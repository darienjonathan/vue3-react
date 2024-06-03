import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Top } from "@/components/pages/Top";
import { useState } from "react";

export const App: React.FC = () => {
  const [foo, setFoo] = useState(10);
  let bar = 10 + foo;

  const handleClick = () => {
    setFoo((prev) => prev + 10);
    bar = 20;
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
        <Top />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>{bar}</div>
      <button onClick={handleClick}>{foo}</button>
    </>
  );
};
