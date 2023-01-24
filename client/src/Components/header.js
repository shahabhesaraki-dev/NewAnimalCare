import styled from "styled-components";
import {
  FiHome,
  FiMessageSquare,
  FiUser,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { NavLink, useHistory } from "react-router-dom";
import { DetailsContext } from "./Context/detailsContext";
import { useContext } from "react";

const Header = () => {
  const { userData, conversations } = useContext(DetailsContext);

  const history = useHistory();

  const logOutHandler = () => {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("service");
    window.location.reload();
  };

  return (
    <MainDiv>
      <AddPostWrapper>
        <Button
          onClick={() => {
            history.push("/newPost");
          }}
        >
          Add your post
        </Button>
        <ResponsiveButton
          onClick={() => {
            history.push("/newPost");
          }}
        >
          Post
        </ResponsiveButton>
      </AddPostWrapper>
      <NavWrapper>
        <nav>
          <ul>
            <Li>
              <StyledNavlink to="/home">
                <StyledFiHome size={30} />
                Home
              </StyledNavlink>
            </Li>
            <Li>
              <StyledNavlink to="/messages">
                <StyledFiMessageSquare size={30} />

                {userData && conversations && conversations.length !== 0
                  ? `Messages(${conversations.length})`
                  : "Messages"}
              </StyledNavlink>
            </Li>
            <Li>
              <StyledNavlink to="/profile">
                <StyledFiUser size={30} />
                Profile
              </StyledNavlink>
            </Li>
            <Li>
              <StyledNavlink to="/services">
                <StyledFiSetting size={30} />
                Services
              </StyledNavlink>
            </Li>
            <Li>
              <LogoutBox onClick={logOutHandler}>
                <FiLogOut size={25} style={{ position: "relative" }} />
                <Logout>
                  LogOut(
                  {userData.firstName
                    ? userData.firstName.replace(
                        /^./,
                        userData.firstName[0].toUpperCase()
                      )
                    : null}
                  )
                </Logout>
              </LogoutBox>
            </Li>
          </ul>
        </nav>
      </NavWrapper>
      <ResponsiveNavWrapper>
        <nav>
          <ul>
            <Li>
              <StyledNavlink to="/home">
                <StyledFiHome size={30} />
              </StyledNavlink>
            </Li>
            <Li>
              <StyledNavlink to="/messages">
                <StyledFiMessageSquare
                  size={30}
                  style={{ marginRight: "0px", marginBottom: "-2px" }}
                />
              </StyledNavlink>
            </Li>
            <Li>
              <StyledNavlink to="/profile">
                <StyledFiUser size={30} />
              </StyledNavlink>
            </Li>
            <Li>
              <StyledNavlink to="/services">
                <StyledFiSetting size={30} />
              </StyledNavlink>
            </Li>
            <Li>
              <LogoutBox onClick={logOutHandler}>
                <FiLogOut size={25} style={{ position: "relative" }} />
                <Logout></Logout>
              </LogoutBox>
            </Li>
          </ul>
        </nav>
      </ResponsiveNavWrapper>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 22%;
  @media (max-width: 900px) {
    width: 10%;
  }
`;

const AddPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  position: fixed;
  top: 50px;
  left: 30px;
  @media (max-width: 900px) {
    left: 20px;
  }
`;

const Button = styled.button`
  @media (max-width: 900px) {
    display: none;
  }
  font-family: "Abel";
  width: 180px;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 22px;
  background-color: #d3bfa1;
  border: 1px solid white;
  &:hover {
    transition: 200ms ease-in-out;
    font-size: 25px;
    box-shadow: 0px 0px 3px 1px #5f4024;
    font-weight: 200;
  }
`;

const ResponsiveButton = styled.button`
  @media (min-width: 901px) {
    display: none;
  }
  font-family: "Abel";
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  background-color: #d3bfa1;
  border: 1px solid white;
  &:hover {
    transition: 200ms ease-in-out;
    font-size: 23px;
    box-shadow: 0px 0px 3px 1px #5f4024;
    font-weight: 200;
  }
`;

const NavWrapper = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
  display: flex;
  flex-direction: column;
  align-items: left;
  position: fixed;
  top: 120px;
  left: 0;
`;

const ResponsiveNavWrapper = styled.div`
  @media (min-width: 901px) {
    display: none;
  }
  display: flex;
  flex-direction: column;
  align-items: left;
  position: fixed;
  top: 120px;
  left: 0;
`;

const Li = styled.li`
  text-decoration: none;
  padding: 10px 20px;
  margin-bottom: 2px;
`;

const StyledFiHome = styled(FiHome)`
  margin-right: 20px;
  position: relative;
  top: 7px;
`;

const StyledFiMessageSquare = styled(FiMessageSquare)`
  margin-right: 20px;
  position: relative;
  top: 7px;
`;

const StyledFiUser = styled(FiUser)`
  margin-right: 20px;
  position: relative;
  top: 7px;
`;

const StyledFiSetting = styled(FiSettings)`
  margin-right: 20px;
  position: relative;
  top: 7px;
`;

const StyledNavlink = styled(NavLink)`
  font-family: "Abel";
  font-size: 22px;
  text-decoration: none;
  color: black;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  &.active {
    font-weight: bold;
    font-size: 23px;
  }
  &:hover {
    background-color: white;
  }
`;

const LogoutBox = styled.div`
  padding: 10px;
  border-radius: 10px;
  width: 50%;
  margin-bottom: 20px;
  position: relative;
  left: 4px;
  cursor: pointer;
`;

const Logout = styled.p`
  font-family: "Abel";
  font-size: 22px;
  position: absolute;
  left: 46px;
  right: 0;
  top: 10px;
  bottom: 0;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    color: darkred;
  }
`;

export default Header;
