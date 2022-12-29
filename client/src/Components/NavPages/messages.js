import styled from "styled-components";
import Header from "../header";
import DOG from "../../Assets/backDog.png";
const Messages = () => {
  return (
    <MainDiv>
      <Header />
      <Section>
        <Content></Content>
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
  justify-content: center;
  padding: 10px 20px;
`;

const Content = styled.div`
  display: flex;
  width: 90%;
  border: 2px solid black;
  border-radius: 10px;
  min-height: 90vh;
`;

export default Messages;
