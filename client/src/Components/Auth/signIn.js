import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import authImage from "../../Assets/authImage.png";
import SignUp from "./signUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import GoogleLoginButton from "./google-Login-Button";

const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInHandler = () => {
    if (handleValidation()) {
      fetch("/api/signIn", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.status === 200) {
            localStorage.setItem("userId", JSON.stringify(result.id));
            history.push("/services");
            window.location.reload();
          } else {
            toast.error(`${result.message}`, tostOption);
          }
        });
    }
  };

  const splitEmail = email.split("");

  const tostOption = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    if (password.length === 0 || email.length === 0) {
      toast.error("Email and Password are required!", tostOption);
      return false;
    } else if (!splitEmail.includes("@")) {
      toast.error("Email address is not valid!", tostOption);
      return false;
    }
    return true;
  };

  return (
    <Section>
      <ImageSection>
        <Image src={authImage} />
      </ImageSection>
      <FormSection>
        <Title>Join and take care of animals</Title>

        <InputBox>
          <Input
            type="email"
            placeholder="Email"
            value={email || ""}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                return signInHandler();
              }
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password || ""}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                return signInHandler();
              }
            }}
          />
          <SigninButton onClick={signInHandler}>Sign in</SigninButton>
        </InputBox>

        {/* <GoogleLoginButton /> */}

        <SignupBox>
          <H2>Are you a new user?</H2>
          <SignUp />
        </SignupBox>
      </FormSection>
      <ToastContainer />
    </Section>
  );
};

const Section = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
`;

const ImageSection = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  padding: 60px 10px;
`;

const Title = styled.h1`
  font-family: "Acme";
  font-size: 55px;
  text-align: center;
  margin-top: 50px;
  color: #5f4024;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  margin-left: 20px;
`;

const Input = styled.input`
  height: 50px;
  width: 50%;
  font-size: 18px;
  margin-top: 10px;
  outline: none;
  border-radius: 30px;
  padding: 0 0 0 15px;
  border: 2px solid #825e3a;
  font-family: "Abel";
  font-size: 20px;
  color: #240d01;
  &::placeholder {
    color: #240d01;
    opacity: 0.5;
  }
  &:focus {
    outline: none;
    border: 2px solid #240d01;
    &::placeholder {
      position: absolute;
      transition: 400ms ease-in-out;
      top: -3px;
      margin-left: 5px;
      font-size: 17px;
      opacity: 0.7;
    }
  }
`;

const SigninButton = styled.button`
  height: 50px;
  width: 40%;
  font-size: 18px;
  margin-top: 25px;
  margin-left: 5px;
  outline: none;
  border-radius: 30px;
  font-family: "Abel";
  font-size: 21px;
  background-color: #825e3a;
  border: none;
  color: white;
  &:hover {
    background-color: #240d01;
    transition: 200ms ease-in-out;
  }
`;

// const StyledGoogle = styled(GoogleLogin)`
//   height: 50px;
//   width: 40%;
//   font-size: 18px;
//   margin-top: 25px;
//   margin-left: 25px;
//   outline: none;
//   border-radius: 30px !important;
//   font-family: "Abel" !important;
//   font-size: 21px !important;
//   color: black !important;
//   box-shadow: none !important;
//   border: 2px solid #825e3a !important;
//   padding: 25px 15px !important;
// `;

const SignupBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-top: 100px;
  margin-left: 15px;
`;

const H2 = styled.h2`
  font-family: "Abel";
  font-size: 20px;
  margin-left: 10px;
`;

export default SignIn;
