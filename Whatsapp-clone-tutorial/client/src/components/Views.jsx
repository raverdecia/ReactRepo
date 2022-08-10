import { Routes, Route } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import Loguin from "./login/Login";
import Signup from "./login/Signup";
import PrivateRoutes from "./PrivateRoutes";

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Loguin />} />
      <Route path="/registrer" element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Text>welcome home</Text>} />
      </Route>
      <Route path="*" element={<Loguin />} />
    </Routes>
  );
};
export default Views;
