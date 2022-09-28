import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";
import { Button, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import TextField from "../../components/login/TextField";

import * as Yup from "yup";
import socket from "../../socket";
import { useContext, useState } from "react";
import { useCallback } from "react";
import { FriendContext } from "./Home";

const AddFriendModal = ({ isOpen, onClose }) => {
  const [error, setError] = useState("");
  const closeModal = useCallback(() => {
    setError("");
    onClose();
  }, [onClose]);
  const { setFriendList } = useContext(FriendContext);
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a friend</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ friendName: "" }}
          onSubmit={(values) => {
            socket.emit("add_friend", values.friendName, ({ errorMsg, done }) => {
              if (done) {
                setFriendList((c) => [values.friendName, ...c]);
                closeModal();
                return;
              }
              setError(errorMsg);
            });
          }}
          validationSchema={friendSchema}
        >
          <Form>
            <ModalBody>
              <Heading as="p" fontSize="xl" color="red.500" textAlign="center">
                {error}
              </Heading>
              <TextField label="Friend's name" placeholder="Enter friend's name" autoComplete="off" name="friendName" />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};
export const friendSchema = Yup.object({
  friendName: Yup.string().required("Username require!").min(6, "Username too short!").max(28, "Username too large!"),
});
export default AddFriendModal;
