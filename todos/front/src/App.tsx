import { TodoHandler } from "./component/TodoHandler";
import logo from "./logo.svg";
//import "./App.css";

const appStyle = {
  backgroundColor: "whitesmoke",
  border: "2px solid black",
  width: "500px",
  margin: "20px",
  borderRadius: "10px",
};

const App = () => {
  return (
    <div className="App" style={appStyle}>
      <TodoHandler />
    </div>
  );
};

export default App;
