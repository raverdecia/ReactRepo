import { ArrowBackIcon } from "@chakra-ui/icons";
import { VStack, ButtonGroup, Button, Heading } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { AccountContext } from "../AccountContext";
import TextField from "./TextField";
import { useContext } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AccountContext);
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required("Username require!")
          .min(6, "Username too short!")
          .max(28, "Username too large!"),
        password: Yup.string()
          .required("Password require!")
          .min(6, "Password too short!")
          .max(28, "Password too large!"),
      })}
      onSubmit={(values, actions) => {
        const vals = { ...values };
        fetch("http://localhost:4000/auth/register", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vals),
        })
          .catch((err) => {
            return;
          })
          .then((res) => {
            if (!res || !res.ok || res.status >= 400) return;
            return res.json();
          })
          .then((data) => {
            if (!data) return;
            setUser({ ...data });
            navigate("/home");
          });
        actions.resetForm();
      }}
    >
      <VStack as={Form} w={{ base: "90%", md: "500px" }} m="auto" justify="center" h="100vh" spacing="1rem">
        <Heading>Sign Up</Heading>

        <TextField name="username" placeholder="Enter the username" autoComplete="off" label="Username"></TextField>
        <TextField
          name="password"
          placeholder="Enter the password"
          autoComplete="off"
          label="Password"
          type="password"
        ></TextField>

        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="submit">
            Create Account
          </Button>
          <Button onClick={() => navigate("/")}>
            <ArrowBackIcon /> Back
          </Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
};
export default Signup;
