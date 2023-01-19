import styled from "styled-components";
import Header from "../header";
import DOG from "../../Assets/backDog.png";
import { useContext, useEffect, useState, useRef } from "react";
import { DetailsContext } from "../Context/detailsContext";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

const Conversation = () => {
  const location = useLocation();

  const scrollRef = useRef();

  const { userData, allMessages, setAllMessages } = useContext(DetailsContext);

  const [partner, setPartner] = useState();

  const [message, setMessage] = useState();

  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [conversation, setConverstain] = useState([]);

  const [send, setSend] = useState(false);

  const socket = useRef();

  useEffect(() => {
    if (location) {
      const getPartner = async () => {
        const respond = await fetch(`/api/getUser/${location.state.senderId}`);
        const result = await respond.json();
        setPartner(result.data);
      };
      getPartner();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (partner) {
      const formData = new FormData();
      formData.append("senderId", userData._id);
      formData.append("receiverId", partner._id);

      fetch("/api/getSpecificConversation", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setConverstain(result.data);
        });
    }
  }, [userData, partner, send]);

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        conversationId: data.conversationId,
        receiverId: data.receiverId,
        senderId: data.senderId,
        message: data.text,
        createdAt: new Date(),
      });
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (arrivalMessage && arrivalMessage.conversationId === conversation._id) {
      setAllMessages((prev) => [...prev, arrivalMessage]);
      setArrivalMessage(null);
    }
    // eslint-disable-next-line
  }, [arrivalMessage, conversation]);

  useEffect(() => {
    socket.current.emit("addUser", userData._id);
    // socket.current.on("getUsers", (users) => {
    //   console.log(users);
    // });
  }, [userData]);

  const sendMessage = () => {
    const formData = new FormData();
    formData.append("message", message);
    formData.append("senderId", userData._id);
    formData.append("receiverId", partner._id);

    socket.current.emit("sendMessage", {
      conversationId: conversation && conversation._id,
      senderId: userData._id,
      receiverId: partner._id,
      text: message,
    });

    fetch("/api/sendMessage", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setSend(true);
        setAllMessages([...allMessages, result.messageData]);
        setMessage("");
        return result;
      });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  return (
    <MainDiv>
      <Header />
      <Section>
        <Content>
          <Head>
            {partner &&
              `${partner.firstName.replace(
                /^./,
                partner.firstName[0].toUpperCase()
              )} ${partner.lastName.replace(
                /^./,
                partner.lastName[0].toUpperCase()
              )}`}
          </Head>
          <MessageDiv ref={scrollRef}>
            {userData &&
              allMessages &&
              conversation &&
              // eslint-disable-next-line
              allMessages.map((message, index) => {
                if (message.conversationId === conversation._id) {
                  if (message.receiverId === userData._id) {
                    return (
                      <LeftFrame ref={scrollRef} key={index}>
                        <LeftSample
                          dangerouslySetInnerHTML={{ __html: message.message }}
                        />
                      </LeftFrame>
                    );
                  } else if (message.senderId === userData._id) {
                    return (
                      <RightFrame ref={scrollRef} key={index}>
                        <RightSample
                          dangerouslySetInnerHTML={{ __html: message.message }}
                        />
                      </RightFrame>
                    );
                  }
                }
              })}
          </MessageDiv>
          <InputDiv>
            <Input
              value={message || ""}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              type="text"
            />
            <Button onClick={sendMessage}>Send</Button>
          </InputDiv>
        </Content>
      </Section>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-image: url(${DOG});
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 78%;
  margin-top: 50px;
  padding: 10px 20px;
`;

const Content = styled.div`
  display: grid;
  grid-template-rows: 8% 82% 10%;
  overflow: hidden;
  width: 90%;
  border: 5px solid #5f4024;
  border-radius: 10px;
  padding: 30px;
  height: 85vh;
`;

const MessageDiv = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  background-color: white;
  margin-top: 25px;
  border-radius: 10px;
`;

const Head = styled.h2`
  font-family: "Acme";
  font-size: 25px;
  text-align: center;
  color: #5f4024;
  letter-spacing: 1.5px;
  border-bottom: 5px solid #5f4024;
`;

const LeftFrame = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px 10px;
`;

const RightFrame = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px;
`;

const LeftSample = styled.h2`
  font-family: "Open Sans";
  font-size: 16px;
  color: black;
  border: none;
  padding: 15px 20px;
  border-radius: 30px;
  background-color: #c8c8c8;
`;

const RightSample = styled.h2`
  font-family: "Open Sans";
  font-size: 16px;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 30px;
  background-color: #168af6;
`;

const InputDiv = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  margin-top: 30px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  border-radius: 10px 0 0 10px;
  border: none;
  outline: none;
  font-family: "Abel";
  font-size: 17px;
`;
const Button = styled.button`
  width: 10%;
  border: none;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  font-family: "Abel";
  font-size: 20px;
  background-color: #d3bfa1;
`;

export default Conversation;
