import { createContext } from "react";
import { useEffect, useState } from "react";

export const DetailsContext = createContext();

export const DetailsContextProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem("userId"));

  const service = JSON.parse(localStorage.getItem("service"));

  const [userData, setUserData] = useState([]);
  const [allPostsButYours, setAllPostsButYours] = useState([]);
  const [getService, setGetService] = useState(service);

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

  return (
    <DetailsContext.Provider
      value={{ userData, allPostsButYours, setGetService }}
    >
      {children}
    </DetailsContext.Provider>
  );
};
