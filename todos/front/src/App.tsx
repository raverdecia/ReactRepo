import StyledApp from "./component/styled/Styled.app";
import { TodoHandler } from "./component/TodoHandler";

const appStyle = {
  backgroundColor: "whitesmoke",
  border: "2px solid black",
  width: "500px",
  margin: "20px",
  borderRadius: "10px",
};

const App = () => {
  return (
    <StyledApp>
      <TodoHandler />
    </StyledApp>
  );
};

export default App;
