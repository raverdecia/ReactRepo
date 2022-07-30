import { VStack, ButtonGroup, Button, Heading } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import TextField from "./TextField";

const Loguin = () => {
  const navigate = useNavigate();
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
        alert(JSON.stringify(values));
        actions.resetForm();
      }}
    >
      <VStack as={Form} w={{ base: "90%", md: "500px" }} m="auto" justify="center" h="100vh" spacing="1rem">
        <Heading>Log In</Heading>

        <TextField name="username" placeholder="Enter the username" autoComplete="off" label="Username"></TextField>
        <TextField name="password" placeholder="Enter the password" autoComplete="off" label="Password"></TextField>

        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="submit">
            Log In
          </Button>
          <Button onClick={() => navigate("/registrer")}>Create Account</Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
};
export default Loguin;
