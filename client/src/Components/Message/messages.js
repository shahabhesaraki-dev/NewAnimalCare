import styled from "styled-components";
import Header from "../header";
import DOG from "../../Assets/backDog.png";
import { useContext } from "react";
import { DetailsContext } from "../Context/detailsContext";
import AnswerButton from "./answerButton";
import DeleteMessage from "./deleteMessage";

const Messages = () => {
  const { userData } = useContext(DetailsContext);

  return (
    <MainDiv>
      <Header />
      <Section>
        <Title>Messages</Title>
        <Content>
          <Table>
            <tbody>
              <tr>
                <TH>Row</TH>
                <TH>Name</TH>
                <TH>Message</TH>
                <TH>Action</TH>
              </tr>

              {userData && userData.messages
                ? userData.messages.map((message, index) => {
                    return (
                      <tr key={index}>
                        <TD style={{ width: "1%", textAlign: "center" }}>
                          {index + 1}
                        </TD>
                        <TD style={{ width: "21%" }}>
                          {message.senderFirstName.replace(
                            /^./,
                            message.senderFirstName[0].toUpperCase()
                          )}{" "}
                          {message.senderLastName.replace(
                            /^./,
                            message.senderLastName[0].toUpperCase()
                          )}
                        </TD>
                        <TD
                          style={{ width: "60%" }}
                          dangerouslySetInnerHTML={{ __html: message.message }}
                        />
                        <TD style={{ textAlign: "center", width: "20%" }}>
                          <AnswerButton
                            name={message.senderFirstName.replace(
                              /^./,
                              message.senderFirstName[0].toUpperCase()
                            )}
                            id={message.senderId}
                          />
                          <DeleteMessage message={message.message} />
                        </TD>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  border: 1px solid #5f4024;
  border-radius: 10px;
  padding: 10px;
`;

const Title = styled.h1`
  font-family: "Acme";
  font-size: 70px;
  text-align: center;
  margin-bottom: 50px;
  margin-right: 150px;
  color: #5f4024;
  letter-spacing: 1.5px;
`;

const Table = styled.table`
  width: 90%;
`;

const TH = styled.th`
  font-family: Acme;
  font-size: 20px;
  padding: 20px;
`;

const TD = styled.td`
  font-family: Abel;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid #5f4024;
  padding: 20px;
`;

export default Messages;
