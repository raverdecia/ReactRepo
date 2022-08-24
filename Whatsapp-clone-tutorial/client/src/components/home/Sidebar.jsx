import { ChatIcon } from "@chakra-ui/icons";
import { Button, Divider, Heading, HStack, VStack, Text, Circle } from "@chakra-ui/react";
import { Tab, TabList } from "@chakra-ui/tabs";
import { useContext } from "react";
import { FriendContext } from "./Home";

const Sidebar = () => {
  const { friendList, setFriendList } = useContext(FriendContext);

  return (
    <VStack py="1.4rem">
      <HStack justify="space-evenly" w="100%">
        <Heading size="md">Add friend</Heading>
        <Button>
          <ChatIcon />
        </Button>
      </HStack>
      <Divider />
      <VStack as={TabList}>
        {friendList.map(({ username, connected }) => (
          <HStack as={Tab}>
            <Circle bg={connected ? "green.700" : "red.500"} h="15px" w="15px" />
            <Text>{username}</Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default Sidebar;
