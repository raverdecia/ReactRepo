import ToggleColorMode from "./components/ToggleColorMode";
import Views from "./components/Views";
import UserContext from "./components/AccountContext";

const App = () => {
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
