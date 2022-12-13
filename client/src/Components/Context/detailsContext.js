import { createContext } from "react";
import { useEffect, useState } from "react";

export const DetailsContext = createContext();

export const DetailsContextProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem("userId"));

  const [userData, setUserData] = useState([]);

  const [allPostsButYours, setAllPostsButYours] = useState([]);

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
  }, []);

  useEffect(() => {
    if (userId) {
      const getUser = async () => {
        const respond = await fetch(`/api/getAllPostButYours/${userId}`);
        const result = await respond.json();
        setAllPostsButYours(result.data);
      };
      getUser();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <DetailsContext.Provider value={{ userData, allPostsButYours }}>
      {children}
    </DetailsContext.Provider>
  );
};
