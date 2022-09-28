import { useEffect } from "react";
import socket from "../../socket";
import { AccountContext } from "../AccountContext";
import { useContext } from "react";

const useSocketSetup = (setFriendList) => {
  const { setUser } = useContext(AccountContext);
  useEffect(() => {
    socket.connect();
    setFriendList(["juan"]);
    socket.on("friends", (friendList) => {
      setFriendList(friendList);
      console.log("friendList");
      console.log(friendList);
    });

    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    });
    return () => {
      socket.off("connect_error");
    };
  }, [setUser, setFriendList]);
};

export default useSocketSetup;
