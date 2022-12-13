import styled from "styled-components";
import Header from "../header";
import { useContext } from "react";
import { DetailsContext } from "../Context/detailsContext";
import AddNewProfileImage from "./addNewImage";
import AddNewBackgroundImage from "./addNewBackground";
import UpdateProfileImage from "./updateProfileImage";
import UpdateBackgroundImage from "./updateBackgroundImg";

const ProfilePage = () => {
  const { userData } = useContext(DetailsContext);

  return (
    <>
      <Header />
      <Wrapper>
        <ImageSection>
          <BackgroundFrame>
            {userData.length !== 0 && userData.backgroundImage !== undefined ? (
              <>
                <BackgroundImage src={`/image/${userData.backgroundImage}`} />
                <UpdateBackgroundImage />
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
                <UpdateProfileImage />
              </>
            ) : (
              <NoProfile>
                <AddNewProfileImage />
              </NoProfile>
            )}
          </ProfileFrame>
        </ImageSection>
        <PostSection>
          {userData.length !== 0 && userData.posts !== undefined
            ? userData.posts.map((post, index) => {
                return (
                  <div style={{ marginTop: "15px" }} key={index}>
                    {userData.profileImage ? (
                      <ThumbImage src={`/image/${userData.profileImage}`} />
                    ) : (
                      <NoThumbnail />
                    )}
                    <FullName>
                      {userData.firstName} {userData.lastName}
                    </FullName>
                    <UserName>{`@${userData.username}`}</UserName>
                    <Description>{post.description}</Description>
                    <PostImage src={`/image/${post.image}`} />
                  </div>
                );
              })
            : null}
        </PostSection>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  justify-content: center;
  padding: 50px 10px;
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  min-width: 40%;
  margin-left: 300px;
  position: relative;
`;

const BackgroundFrame = styled.div`
  width: 100%;
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
  width: 90%;
  height: 100%;
  border-radius: 10px;
`;

const ProfileFrame = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  position: relative;
  top: -100px;
  left: 50px;
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

const PostSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  min-width: 40%;
  margin-left: 300px;
  position: relative;
  top: -50px;
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

const PostImage = styled.img`
  width: 70%;
  height: 300px;
  margin-left: 60px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export default ProfilePage;

// const convert = new Date(isoStr1.slice(0, -1));
