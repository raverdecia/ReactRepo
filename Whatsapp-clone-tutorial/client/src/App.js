import ToggleColorMode from "./components/ToggleColorMode";
import Views from "./components/Views";
import UserContext from "./components/AccountContext";
import socket from "./socket";

const App = () => {
  socket.connect();
  return (
    <div className="App">
      <UserContext>
        <Views></Views>
        <ToggleColorMode />
      </UserContext>
    </div>
  );
};

export default App;
