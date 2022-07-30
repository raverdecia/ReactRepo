import ToggleColorMode from "./components/ToggleColorMode";
import Views from "./components/Views";

const App = () => {
  return (
    <div className="App">
      <>
        <Views></Views>
        <ToggleColorMode />
      </>
    </div>
  );
};

export default App;
