import { Routes, Route } from "react-router-dom";
import Loguin from "./loguin/Login";
import Signup from "./loguin/Signup";

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
