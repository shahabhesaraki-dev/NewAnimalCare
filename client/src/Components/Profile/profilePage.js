import styled from "styled-components";
import Header from "../header";
import { useContext, useState } from "react";
import { DetailsContext } from "../Context/detailsContext";
import AddNewProfileImage from "./addNewImage";
import AddNewBackgroundImage from "./addNewBackground";
import UpdateProfileImage from "./updateProfileImage";
import UpdateBackgroundImage from "./updateBackgroundImg";
import DOG from "../../Assets/backDog.png";
import EditInfoButton from "./editInfo";

const ProfilePage = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const { userData } = useContext(DetailsContext);

  const [postActive, setPostActive] = useState(true);
  const [infoActive, setInfoActive] = useState(false);

  return (
    <MainDiv>
      <Header />
      <Wrapper>
        <ImageSection>
          <BackgroundFrame>
            {userData.length !== 0 && userData.backgroundImage !== undefined ? (
              <>
                <BackgroundImage src={`/image/${userData.backgroundImage}`} />
                {userData && userId && userData._id === userId ? (
                  <UpdateBackgroundImage />
                ) : null}
              </>
            ) : (
              <NoBackground>
                <AddNewBackgroundImage />
              </NoBackground>
            )}
          </BackgroundFrame>
          <ProfileFrame>
            {userData.length !== 0 && userData.profileImage ? (
              <>
                <ProfileImage src={`/image/${userData.profileImage}`} />
                {userData && userId && userData._id === userId ? (
                  <UpdateProfileImage />
                ) : null}
              </>
            ) : (
              <NoProfile>
                <AddNewProfileImage />
              </NoProfile>
            )}
          </ProfileFrame>
          <Name>
            {userData.length !== 0
              ? userData.firstName.replace(
                  /^./,
                  userData.firstName[0].toUpperCase()
                )
              : null}{" "}
            {userData.length !== 0
              ? userData.lastName.replace(
                  /^./,
                  userData.lastName[0].toUpperCase()
                )
              : null}
          </Name>
        </ImageSection>

        <ButtonFlexDiv>
          <Button
            style={{
              borderBottom: `${
                postActive === true ? "3px solid black" : `none`
              }`,
            }}
            onClick={() => {
              setPostActive(true);
              setInfoActive(false);
            }}
          >
            Posts
          </Button>
          <Button
            onClick={() => {
              setInfoActive(true);
              setPostActive(false);
            }}
            style={{
              borderBottom: `${
                infoActive === true ? "3px solid black" : `none`
              }`,
            }}
          >
            Info
          </Button>
        </ButtonFlexDiv>

        {userData.length !== 0 &&
        userData.posts !== undefined &&
        userData.posts.length !== 0 &&
        postActive === true ? (
          userData.posts.map((post, index) => {
            return (
              <PostSection key={index}>
                <div style={{ marginTop: "15px" }}>
                  {userData.profileImage ? (
                    <ThumbImage src={`/image/${userData.profileImage}`} />
                  ) : (
                    <NoThumbnail />
                  )}
                  <FullName>
                    {userData
                      ? userData.firstName.replace(
                          /^./,
                          userData.firstName[0].toUpperCase()
                        )
                      : null}{" "}
                    {userData
                      ? userData.lastName.replace(
                          /^./,
                          userData.lastName[0].toUpperCase()
                        )
                      : null}
                  </FullName>
                  <UserName>{`@${userData.username}`}</UserName>
                </div>
                <FlexDiv style={{ marginTop: "15px" }}>
                  <DetailsDiv>
                    <FlexDiv>
                      <Title>Name:</Title>
                      <Detail>
                        {post.petName
                          ? post.petName.replace(
                              /^./,
                              post.petName[0].toUpperCase()
                            )
                          : null}
                      </Detail>
                    </FlexDiv>

                    <FlexDiv>
                      <Title>Age:</Title>
                      <Detail>
                        {post.petAge} {post.yearOrMonth}
                      </Detail>
                    </FlexDiv>

                    <FlexDiv>
                      <Title>Required service:</Title>
                      <Detail>{post.service}</Detail>
                    </FlexDiv>

                    <FlexDiv>
                      <FirstLabel>Start date:</FirstLabel>
                      <SecondLabel>End date:</SecondLabel>
                    </FlexDiv>

                    <FlexDiv>
                      <Start>{post.startDate}</Start>
                      <Detail>{post.endDate}</Detail>
                    </FlexDiv>

                    <FlexDiv>
                      <FirstLabel>Start time:</FirstLabel>
                      <SecondLabel>End time:</SecondLabel>
                    </FlexDiv>

                    <FlexDiv>
                      <Start>{post.startTime}</Start>
                      <Detail>{post.endTime}</Detail>
                    </FlexDiv>

                    <AboutDiv>
                      <AboutTitle>
                        About{" "}
                        {post.petName
                          ? post.petName.replace(
                              /^./,
                              post.petName[0].toUpperCase()
                            )
                          : null}
                        :
                      </AboutTitle>
                      <AboutDetail>{post.description}</AboutDetail>
                    </AboutDiv>
                  </DetailsDiv>
                  <ImageDiv>
                    <DivButton>
                      <PostImage src={`/image/${post.image}`} />
                    </DivButton>
                  </ImageDiv>
                </FlexDiv>
              </PostSection>
            );
          })
        ) : userData.length !== 0 &&
          userData.posts !== undefined &&
          userData.posts &&
          userData.posts.length === 0 &&
          postActive === true ? (
          <OtherPostSection>
            <NoPostMessage>Sorry! There are no posts to show.</NoPostMessage>
          </OtherPostSection>
        ) : infoActive === true ? (
          <OtherPostSection>
            <InfoTitle>About:</InfoTitle>
            {userData && userData.info ? (
              <InfoDescription
                dangerouslySetInnerHTML={{ __html: userData.info }}
              />
            ) : (
              <InfoDescription>Tell people about yourself...</InfoDescription>
            )}
            {userData && userId && userData._id === userId ? (
              <EditInfoButton />
            ) : null}
          </OtherPostSection>
        ) : null}
      </Wrapper>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-image: url(${DOG});
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 78%;
  justify-content: center;
  padding: 10px 20px;
  @media (max-width: 900px) {
    width: 88%;
    margin-left: 20px;
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  min-width: 40%;
  position: relative;
`;

const BackgroundFrame = styled.div`
  width: 95%;
  height: 350px;
  border-radius: 10px;
  position: relative;
`;

const NoBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #ccc;
  border-radius: 10px;
`;

const BackgroundImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const ProfileFrame = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  position: relative;
  top: -100px;
  left: 30px;
`;

const NoProfile = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: lightgray;
`;

const ProfileImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const Name = styled.h1`
  font-family: Acme;
  font-size: 28px;
  position: relative;
  top: -160px;
  margin-left: 220px;
  color: black;
`;

const PostSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  min-width: 40%;
  position: relative;
  padding: 10px;
  border-radius: 15px;
  margin-top: 20px;
  background-color: #d3bfa1;
  border: 2px solid black;
`;

const NoThumbnail = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: coral;
`;

const ThumbImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid black;
`;

const FullName = styled.h2`
  font-family: "Acme";
  font-size: 18px;
  position: relative;
  left: 80px;
  top: -50px;
`;

const UserName = styled.h3`
  font-family: "Abel";
  font-size: 17px;
  position: relative;
  left: 80px;
  top: -48px;
  color: #3e3031;
`;

const FirstLabel = styled.h4`
  position: relative;
  left: 60px;
  top: -20px;
  font-family: Abel;
  font-size: 21px;
  margin-top: 10px;
`;

const SecondLabel = styled.p`
  font-family: "Abel";
  font-size: 21px;
  position: relative;
  left: 60px;
  top: -20px;
  margin-top: 10px;
  margin-left: 10px;
  font-weight: bold;
  text-align: right;
  width: 35%;
`;

const Start = styled.p`
  position: relative;
  left: 60px;
  top: -20px;
  font-family: "Abel";
  font-size: 21px;
  margin-top: 10px;
  border: none;
  border-radius: 30px;
  background-color: #a18763;
  padding: 10px;
  text-align: center;
  width: 35%;
  color: white;
  border: 2px solid white;
`;

const Title = styled.h4`
  position: relative;
  left: 60px;
  top: -20px;
  font-family: Abel;
  font-size: 21px;
  margin-top: 10px;
  border: none;
  border-radius: 30px;
  background-color: #a18763;
  padding: 10px;
  text-align: center;
  width: 35%;
  border: 2px solid white;
`;

const Detail = styled.p`
  font-family: "Abel";
  font-size: 21px;
  position: relative;
  left: 60px;
  top: -20px;
  margin-top: 10px;
  margin-left: 10px;
  border: none;
  border-radius: 30px;
  background-color: #a18763;
  padding: 8px;
  text-align: center;
  width: 35%;
  color: white;
  border: 2px solid white;
`;

const AboutDiv = styled.div`
  position: relative;
  left: 55px;
  top: -20px;
  margin-top: 10px;
  border: none;
  border-radius: 60px;
  background-color: #a18763;
  padding: 20px;
  padding-left: 25px;
  width: 70%;
  border: 2px solid white;
`;

const AboutTitle = styled.h4`
  font-family: Abel;
  font-size: 21px;
  text-align: left;
  color: black;
  margin-bottom: 10px;
`;

const AboutDetail = styled.p`
  font-family: "Abel";
  font-size: 21px;
  color: white;
`;

const PostImage = styled.img`
  width: 100%;
  height: 300px;
  margin-left: 20px;
  border-radius: 10px;
  border: 2px solid white;
`;

const FlexDiv = styled.div`
  display: flex;
  width: 95%;
`;

const DetailsDiv = styled.div`
  width: 75%;
`;

const ImageDiv = styled.div`
  width: 40%;
`;

const DivButton = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonFlexDiv = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  width: 90%;
  margin-bottom: 10px;
`;

const Button = styled.button`
  font-family: "Acme";
  width: 300px;
  height: 50px;
  border: none;
  font-size: 22px;
  background-color: transparent;
  color: black;
  margin-top: -50px;
  cursor: pointer;
`;

const OtherPostSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  min-width: 40%;
  position: relative;
  padding: 30px;
  border-radius: 15px;
  margin-top: 20px;
  background-color: #d3bfa1;
  border: 2px solid black;
  margin-bottom: 50px;
`;

const NoPostMessage = styled.h2`
  font-family: "Abel";
  font-size: 21px;
  position: relative;
  text-align: center;
`;

const InfoTitle = styled.h4`
  font-family: Acme;
  font-size: 22px;
  text-align: left;
  color: black;
  margin-bottom: 10px;
`;

const InfoDescription = styled.p`
  font-family: "Abel";
  font-size: 21px;
  color: black;
  margin-bottom: 10px;
  line-height: 30px;
`;

export default ProfilePage;
