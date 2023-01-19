import { createContext } from "react";
import { useEffect, useState } from "react";

export const DetailsContext = createContext();

export const DetailsContextProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem("userId"));

  const service = JSON.parse(localStorage.getItem("service"));

  const [userData, setUserData] = useState([]);
  const [allPostsButYours, setAllPostsButYours] = useState([]);
  const [getService, setGetService] = useState(service);
  const [allMessages, setAllMessages] = useState([]);
  const [conversations, setConverstains] = useState([]);

  useEffect(() => {
    if (userId) {
      const getUser = async () => {
        const respond = await fetch(`/api/getUser/${userId}`);
        const result = await respond.json();
        setUserData(result.data);
      };
      getUser();
    }
    // eslint-disable-next-line
  }, [service]);

  useEffect(() => {
    if (userId) {
      const getUser = async () => {
        const respond = await fetch(
          `/api/getAllPostButYours/${userId}/${getService}`
        );
        const result = await respond.json();
        setAllPostsButYours(result.data);
      };
      getUser();
    }
    // eslint-disable-next-line
  }, [getService, userData]);

  useEffect(() => {
    if (userId) {
      const getMessages = async () => {
        const respond = await fetch(`/api/getMessage/${userId}`);
        const result = await respond.json();
        setAllMessages(result.data);
      };
      getMessages();
    }
    // eslint-disable-next-line
  }, [userId, userData]);

  useEffect(() => {
    if (userId) {
      const getConversations = async () => {
        const respond = await fetch(`/api/getConversations/${userId}`);
        const result = await respond.json();
        setConverstains(result.data);
      };
      getConversations();
    }
    // eslint-disable-next-line
  }, [userData, userId, allMessages]);

  return (
    <DetailsContext.Provider
      value={{
        userData,
        allPostsButYours,
        setGetService,
        allMessages,
        setAllMessages,
        conversations,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};
