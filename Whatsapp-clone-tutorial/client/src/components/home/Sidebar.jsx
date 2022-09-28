import { ChatIcon } from "@chakra-ui/icons";
import { Button, Divider, Heading, HStack, VStack, Text, Circle, useDisclosure } from "@chakra-ui/react";
import { Tab, TabList } from "@chakra-ui/tabs";
import { useContext } from "react";
import AddFriendModal from "./AddFriendModal";
import { FriendContext } from "./Home";

const Sidebar = () => {
  const { friendList } = useContext(FriendContext);
  ///console.log(friendList);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack py="1.4rem">
        <HStack justify="space-evenly" w="100%">
          <Heading size="md">Add friend</Heading>
          <Button onClick={onOpen}>
            <ChatIcon />
          </Button>
        </HStack>
        <Divider />
        <VStack as={TabList}>
          {friendList.map((friend) => (
            <HStack key={friend + "" + Math.random(10)} as={Tab}>
              <Circle bg={false ? "green.700" : "red.500"} h="15px" w="15px" />
              <Text>{friend}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
      <AddFriendModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Sidebar;
