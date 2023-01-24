import styled from "styled-components";
import BACK from "../../Assets/backDog.png";
import { FaFastBackward } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { DetailsContext } from "../Context/detailsContext";
import { useState, useContext } from "react";
import PETOWNER from "../../Assets/petOwner.png";
import PETSITTER from "../../Assets/petSitter.png";
import PETLOVER from "../../Assets/petLover.png";
import ADDPET from "../../Assets/addPet.png";
import LOVEPET from "../../Assets/lovePet.png";
import VISITEPET from "../../Assets/VisitPet.png";
import PETWALK from "../../Assets/petWalk.png";
import DAYCARE from "../../Assets/dayCare.png";
import PETPRO from "../../Assets/petPro.png";

const Service = () => {
  const history = useHistory();

  const { setGetService } = useContext(DetailsContext);
  const [answered, setAnswered] = useState(false);

  return (
    <MainDiv>
      <Wrapper>
        <Title>Welcome to the Animal Cares family</Title>
        {answered === false ? (
          <>
            <Paragraph>Who are you?</Paragraph>
            <Services
              onClick={() => {
                setAnswered(null);
              }}
            >
              <FlexDiv>
                <Logo src={PETOWNER} />
                <H2>Pet's owner</H2>
              </FlexDiv>
            </Services>

            <Services
              onClick={() => {
                setAnswered(true);
              }}
            >
              <FlexDiv>
                <Logo src={PETSITTER} />
                <H2>Pet sitter</H2>
              </FlexDiv>
            </Services>

            <Services
              onClick={() => {
                localStorage.setItem("service", JSON.stringify("All"));
                setGetService("All");
                setAnswered(false);
                history.push("/home");
              }}
            >
              <FlexDiv>
                <Logo src={PETLOVER} />
                <H2>Visitor</H2>
              </FlexDiv>
            </Services>
          </>
        ) : answered === true ? (
          <>
            <Paragraph>What do you offer?</Paragraph>

            <Services
              onClick={() => {
                localStorage.setItem("service", JSON.stringify("Day-Care"));
                setGetService("Day-Care");
                setAnswered(false);
                history.push("/home");
              }}
            >
              <FlexDiv>
                <Logo src={DAYCARE} />
                <H2>Day care (at the nurse's home)</H2>
              </FlexDiv>
            </Services>
            <Services
              onClick={() => {
                localStorage.setItem("service", JSON.stringify("Pet-Walk"));
                setGetService("Pet-Walk");
                setAnswered(false);
                history.push("/home");
              }}
            >
              <FlexDiv>
                <Logo src={PETWALK} />
                <H2>Pet walking (in your neighborhood)</H2>
              </FlexDiv>
            </Services>
            <Services
              onClick={() => {
                localStorage.setItem("service", JSON.stringify("House-Visit"));
                setGetService("House-Visit");
                setAnswered(false);
                history.push("/home");
              }}
            >
              <FlexDiv>
                <Logo src={VISITEPET} />
                <H2>Visit your pet (at your home)</H2>
              </FlexDiv>
            </Services>
            <Services
              onClick={() => {
                localStorage.setItem("service", JSON.stringify("All"));
                setGetService("All");
                setAnswered(false);
                history.push("/home");
              }}
            >
              <FlexDiv>
                <Logo src={PETPRO} />
                <H2>Abel to provide all the services</H2>
              </FlexDiv>
            </Services>
            <Services
              onClick={() => {
                setAnswered(false);
              }}
            >
              <FlexDiv>
                <StyledFaFastBackward size={30} />
                <H2 style={{ marginTop: "13px" }}>Previous question</H2>
              </FlexDiv>
            </Services>
          </>
        ) : answered === null ? (
          <>
            <Paragraph>What are you looking for?</Paragraph>
            <Services
              onClick={() => {
                localStorage.setItem("service", JSON.stringify("All"));
                setGetService("All");
                setAnswered(false);
                history.push("/newPost");
              }}
            >
              <FlexDiv>
                <Logo style={{ marginLeft: "-5px" }} src={ADDPET} />
                <H2>Add my pet</H2>
              </FlexDiv>
            </Services>
            <Services
              onClick={() => {
                localStorage.setItem("service", JSON.stringify("All"));
                setGetService("All");
                setAnswered(false);
                history.push("/home");
              }}
            >
              <FlexDiv>
                <Logo src={LOVEPET} />
                <H2>Visit the website</H2>
              </FlexDiv>
            </Services>
            <Services
              onClick={() => {
                setAnswered(false);
              }}
            >
              <FlexDiv>
                <StyledFaFastBackward size={30} />
                <H2 style={{ marginTop: "13px" }}>Previous question</H2>
              </FlexDiv>
            </Services>
          </>
        ) : null}
      </Wrapper>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  background-image: url(${BACK});
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const Title = styled.h1`
  font-family: Acme;
  font-size: 65px;
  color: #5f4024;
  @media (max-width: 900px) {
    font-size: 55px;
  }
`;

const Paragraph = styled.p`
  font-family: Abel;
  font-size: 40px;
  color: #3e3031;
  margin-top: 50px;
  font-weight: bold;
`;

const FlexDiv = styled.div`
  display: flex;
  width: 90%;
`;

const H2 = styled.h2`
  font-family: Abel;
  font-size: 25px;
  margin-top: 15px;
`;

const Services = styled.span`
  padding: 5px 10px;
  background-color: #fde9eb;
  border: 1px solid #5f4024;
  border-radius: 10px;
  width: 60%;
  margin-top: 20px;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const StyledFaFastBackward = styled(FaFastBackward)`
  margin-top: 2px;
  margin-left: 5px;
  margin-right: 10px;
  padding: 9px 0px;
`;

export default Service;
