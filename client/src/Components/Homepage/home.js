import styled from "styled-components";
import Header from "../header";
import { useContext } from "react";
import { DetailsContext } from "../Context/detailsContext";

const Home = () => {
  const { allPostsButYours } = useContext(DetailsContext);

  return (
    <MainDiv>
      <Header />
      <Section>
        <PostSection>
          {allPostsButYours.length !== 0
            ? allPostsButYours.map((post, index) => {
                return (
                  <div style={{ marginTop: "15px" }} key={index}>
                    {post.user.profileImage ? (
                      <ThumbImage src={`/image/${post.user.profileImage}`} />
                    ) : (
                      <NoThumbnail />
                    )}
                    <FullName>
                      {post.user.firstName} {post.user.lastName}
                    </FullName>
                    <UserName>{post.user.username}</UserName>
                    <Description>{post.description}</Description>
                    <Age>Age: {post.petAge}</Age>
                    <PostImage src={`/image/${post.image}`} />
                  </div>
                );
              })
            : null}
        </PostSection>
      </Section>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  height: 100vh;
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
`;

const NoThumbnail = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: coral;
`;

const ThumbImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const FullName = styled.h2`
  font-family: "Acme";
  font-size: 18px;
  position: relative;
  left: 60px;
  top: -40px;
`;

const UserName = styled.h3`
  font-family: "Abel";
  font-size: 17px;
  position: relative;
  left: 60px;
  top: -38px;
  color: grey;
`;

const Description = styled.p`
  font-family: "Open Sans";
  font-size: 18px;
  position: relative;
  left: 60px;
  top: -20px;
`;

const Age = styled.p`
  font-family: "Open Sans";
  font-size: 18px;
  position: relative;
  left: 60px;
  top: -20px;
`;

const PostImage = styled.img`
  width: 90%;
  height: 300px;
  margin-left: 60px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export default Home;
