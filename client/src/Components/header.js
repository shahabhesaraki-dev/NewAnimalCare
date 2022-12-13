import styled from "styled-components";
import {
  FiHome,
  FiBookmark,
  FiMessageSquare,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { NavLink, useHistory } from "react-router-dom";
import { DetailsContext } from "./Context/detailsContext";
import { useContext } from "react";

const Header = () => {
  const { userData } = useContext(DetailsContext);

  const history = useHistory();

  const logOutHandler = () => {
    window.localStorage.removeItem("userId");
    history.push("/");
    window.location.reload();
  };

  return (
    <>
      <RightWrapper>
        <Button
          onClick={() => {
            history.push("/newPost");
          }}
        >
          Add your post
        </Button>
      </RightWrapper>
      <LeftWrapper>
        <nav>
          <ul>
            <Li>
              <StyledNavlink to="/home">
                <StyledFiHome size={30} />
                Home
              </StyledNavlink>
            </Li>
            <Li>
              <StyledNavlink to="/bookmarks">
                <StyledFiBookmark size={30} />
                Bookmarks
              </StyledNavlink>
            </Li>
            <Li>
              <StyledNavlink to="/messages">
                <StyledFiMessageSquare size={30} />
                Messages
              </StyledNavlink>
            </Li>
            <Li>
              <StyledNavlink to="/profile">
                <StyledFiUser size={30} />
                Profile
              </StyledNavlink>
            </Li>
            <Li>
              <LogoutBox onClick={logOutHandler}>
                <FiLogOut size={25} style={{ position: "relative" }} />
                <Logout>LogOut({userData.firstName})</Logout>
              </LogoutBox>
            </Li>
          </ul>
        </nav>
      </LeftWrapper>
    </>
  );
};

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  position: fixed;
  min-width: 30%;
  top: 50px;
  left: 30px;
`;

const Button = styled.button`
  font-family: "Abel";
  width: 180px;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 22px;
  background-color: lightgrey;
  border: 1px solid white;
  &:hover {
    transition: 200ms ease-in-out;
    font-size: 25px;
    box-shadow: 0px 0px 3px 1px grey;
    font-weight: 200;
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  position: fixed;
  min-width: 30%;
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

const StyledFiBookmark = styled(FiBookmark)`
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
  }
  &:hover {
    background-color: #f0f0f0;
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
