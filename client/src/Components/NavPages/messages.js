import styled from "styled-components";
import Header from "../header";
const Messages = () => {
  return (
    <>
      <Header />
      <Section>
        <Content></Content>
      </Section>
    </>
  );
};

const Section = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: center;
  padding: 50px 10px;
`;

const Content = styled.div`
  display: flex;
  min-width: 60%;
  border: 1px solid black;
  border-radius: 10px;
  height: 2000px;
  margin-left: 250px;
`;

export default Messages;
