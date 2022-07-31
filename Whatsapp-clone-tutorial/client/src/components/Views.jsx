import { Routes, Route } from "react-router-dom";
import Loguin from "./login/Login";
import Signup from "./login/Signup";

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Loguin />} />
      <Route path="/registrer" element={<Signup />} />
      <Route path="*" element={<Loguin />} />
    </Routes>
  );
};
export default Views;
