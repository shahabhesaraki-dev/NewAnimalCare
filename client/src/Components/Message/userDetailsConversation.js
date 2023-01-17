import styled from "styled-components";
import { useState, useEffect } from "react";
import DeleteMessage from "./deleteMessage";
import { useHistory } from "react-router-dom";

const UserDetailsConversation = ({ row, id, conversationId }) => {
  const history = useHistory();

  const [user, setUser] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const respond = await fetch(`/api/getUser/${id}`);
      const result = await respond.json();
      setUser(result.data);
    };
    getUser();
  }, [row, id]);

  useEffect(() => {
    if (conversationId) {
      const getMessages = async () => {
        const respond = await fetch(
          `/api/getMessagesByConversationId/${conversationId}`
        );
        const result = await respond.json();
        setMessages(result.data[result.data.length - 1]);
      };
      getMessages();
    }
  }, [conversationId]);

  return (
    user &&
    user.length !== 0 && (
      <tr>
        <TD style={{ width: "1%", textAlign: "center" }}>{row + 1}</TD>
        <TD style={{ textAlign: "center", width: "30%" }}>
          {user &&
            user.length !== 0 &&
            user.firstName.replace(/^./, user.firstName[0].toUpperCase())}{" "}
          {user &&
            user.length !== 0 &&
            user.lastName.replace(/^./, user.lastName[0].toUpperCase())}
        </TD>
        <TD>{messages && messages.message}</TD>
        <TD style={{ textAlign: "center", width: "40%" }}>
          <ButtonAnswer
            onClick={() =>
              history.push("/conversation", {
                senderId: id,
              })
            }
          >
            Answer
          </ButtonAnswer>
          <DeleteMessage />
        </TD>
      </tr>
    )
  );
};

const TD = styled.td`
  font-family: Abel;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid #5f4024;
  padding: 20px;
`;

const ButtonAnswer = styled.a`
  font-family: Abel;
  font-size: 18px;
  font-weight: 100;
  color: white;
  background-color: #3f8d49;
  border: 1px solid #5f4024;
  padding: 8px 18px;
  margin-right: 5px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

export default UserDetailsConversation;
