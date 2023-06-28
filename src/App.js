import { useState } from "react";
import Form from "./Page/Form";
import Dashboard from "./Page/Dashboard";

import "./App.css";

function App() {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="App">
      <button id="toggle"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {toggle ? "To Dashboard" : "To Book Travel"}
      </button>
      {toggle ? <Form /> : <Dashboard />}
    </div>
  );
}

export default App;
