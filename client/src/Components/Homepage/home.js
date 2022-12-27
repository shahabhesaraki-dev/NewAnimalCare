import styled from "styled-components";
import Header from "../header";
import { useContext } from "react";
import { DetailsContext } from "../Context/detailsContext";
import DOG from "../../Assets/backDog.png";
// import CAT from "../../Assets/backCat.png";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const { allPostsButYours } = useContext(DetailsContext);

  return (
    <MainDiv>
      <Header />
      <Section>
        {allPostsButYours.length !== 0
          ? allPostsButYours.map((post, index) => {
              return (
                <PostSection
                  key={index}
                  // style={{
                  //   backgroundImage: `${
                  //     post.petType === "Cat" ? `url(${CAT})` : `url(${CAT})`
                  //   }`,
                  // }}
                >
                  <div>
                    {post.user.profileImage ? (
                      <ThumbImage
                        onClick={() => {
                          history.push("/user-profile", {
                            id: post.user.id,
                          });
                        }}
                        src={`/image/${post.user.profileImage}`}
                      />
                    ) : (
                      <NoThumbnail
                        onClick={() => {
                          history.push("/user-profile", {
                            id: post.user.id,
                          });
                        }}
                      />
                    )}

                    <FullName
                      onClick={() => {
                        history.push("/user-profile", {
                          id: post.user.id,
                        });
                      }}
                    >
                      {post.user.firstName.replace(
                        /^./,
                        post.user.firstName[0].toUpperCase()
                      )}{" "}
                      {post.user.lastName.replace(
                        /^./,
                        post.user.lastName[0].toUpperCase()
                      )}
                    </FullName>
                    <UserName>{post.user.username}</UserName>
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
                      <DivButton>
                        <Button>Message me</Button>
                      </DivButton>
                    </ImageDiv>
                  </FlexDiv>
                </PostSection>
              );
            })
          : null}
      </Section>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  min-height: 100vh;
  background-image: url(${DOG});
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  justify-content: center;
  padding: 30px 50px;
`;

const PostSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  min-width: 40%;
  margin-left: 250px;
  position: relative;
  top: 20px;
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
  cursor: pointer;
`;

const ThumbImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid black;
  cursor: pointer;
`;

const FullName = styled.h2`
  font-family: "Acme";
  font-size: 18px;
  position: relative;
  left: 80px;
  top: -50px;
  cursor: pointer;
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
  left: 60px;
  top: -20px;
  margin-top: 10px;
  border: none;
  border-radius: 60px;
  background-color: #a18763;
  padding: 20px;
  padding-left: 30px;
  width: 65%;
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
  margin-left: 30px;
  border-radius: 10px;
  border: 2px solid white;
`;

const FlexDiv = styled.div`
  display: flex;
  width: 90%;
`;

const DetailsDiv = styled.div`
  width: 65%;
`;

const ImageDiv = styled.div`
  width: 40%;
  margin-top: -10px;
`;

const DivButton = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  font-family: "Abel";
  width: 180px;
  height: 50px;
  border-radius: 10px;
  font-size: 22px;
  background-color: white;
  border: 1px solid #5f4024;
  color: #5f4024;
  margin-left: 30px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    transition: 200ms ease-in-out;
    font-size: 24px;
    box-shadow: 0px 0px 3px 1px white;
    font-weight: 200;
  }
`;

export default Home;
