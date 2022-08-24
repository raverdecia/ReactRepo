import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import { useState, createContext } from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

export const FriendContext = createContext();

const Home = () => {
  const [friendList, setFriendList] = useState([
    { username: "John Doe", connected: false },
    { username: "Jane Doe", connected: true },
    { username: "Jack Doe", connected: true },
  ]);
  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs}>
        <GridItem colSpan="3" borderRight="1px solid gray">
          <Sidebar />
        </GridItem>
        <GridItem colSpan="7">
          <Chat />
        </GridItem>
      </Grid>
    </FriendContext.Provider>
  );
};

export default Home;
