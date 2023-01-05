import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const signUpHandler = () => {
    if (handleValidation()) {
      fetch("/api/addUser", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          username: username,
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
    if (
      password.length === 0 ||
      email.length === 0 ||
      firstName.length === 0 ||
      lastName.length === 0 ||
      username.length === 0
    ) {
      toast.error("All the fields are required!", tostOption);
      return false;
    } else if (!splitEmail.includes("@")) {
      toast.error("Email address is not valid!", tostOption);
      return false;
    } else if (password.length < 3) {
      toast.error("Password must be at least 4 characters!", tostOption);
      return false;
    }
    return true;
  };

  return (
    <>
      <SignupButton onClick={handleClickToOpen}>Sign up</SignupButton>
      <Dialog open={open} onClose={handleToClose}>
        <Title style={{ marginBottom: "50px" }}>Create your account</Title>
        <DialogContent>
          <SignupInput
            type="text"
            placeholder="First name"
            value={firstName || ""}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                firstName.length !== 0 &&
                lastName.length !== 0 &&
                email.length !== 0 &&
                password.length !== 0 &&
                splitEmail.includes("@")
              ) {
                return signUpHandler();
              }
            }}
          />
          <SignupInput
            type="text"
            placeholder="Last name"
            value={lastName || ""}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                firstName.length !== 0 &&
                lastName.length !== 0 &&
                email.length !== 0 &&
                password.length !== 0 &&
                splitEmail.includes("@")
              ) {
                return signUpHandler();
              }
            }}
          />
          <SignupInput
            type="email"
            placeholder="Email"
            value={email || ""}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                firstName.length !== 0 &&
                lastName.length !== 0 &&
                email.length !== 0 &&
                password.length !== 0 &&
                splitEmail.includes("@")
              ) {
                return signUpHandler();
              }
            }}
          />
          <SignupInput
            type="text"
            placeholder="Username"
            value={username || ""}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                firstName.length !== 0 &&
                lastName.length !== 0 &&
                email.length !== 0 &&
                username.length !== 0 &&
                password.length !== 0 &&
                splitEmail.includes("@")
              ) {
                return signUpHandler();
              }
            }}
          />
          <SignupInput
            type="password"
            placeholder="Password"
            value={password || ""}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                firstName.length !== 0 &&
                lastName.length !== 0 &&
                email.length !== 0 &&
                password.length !== 0 &&
                splitEmail.includes("@")
              ) {
                return signUpHandler();
              }
            }}
          />
          <br></br>
          <DialogButton onClick={signUpHandler}>Sign up</DialogButton>
          {/* {firstName.length !== 0 &&
          lastName.length !== 0 &&
          email.length !== 0 &&
          password.length !== 0 &&
          splitEmail.includes("@") ? (
            <DialogButton onClick={signUpHandler}>Sign up</DialogButton>
          ) : (
            <DialogButton disabled>Sign up</DialogButton>
          )} */}
        </DialogContent>
        <DialogActions>
          <CloseButton onClick={handleToClose}>Close</CloseButton>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

const Title = styled.h1`
  font-family: "Acme";
  font-size: 55px;
  text-align: center;
  margin-top: 50px;
  color: #5f4024;
`;

const SignupButton = styled.button`
  height: 50px;
  width: 40%;
  font-size: 18px;
  margin-top: 25px;
  margin-left: 5px;
  outline: none;
  border-radius: 30px;
  font-family: "Abel";
  font-size: 21px;
  border: 2px solid #825e3a;
  color: #825e3a;
  &:hover {
    background-color: #f6f7bf;
    color: black;
    transition: 200ms ease-in-out;
  }
`;

const SignupInput = styled.input`
  height: 50px;
  width: 400px;
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
    border: 2px solid #240d01;
    &::placeholder {
      transition: 400ms ease-in-out;
      position: absolute;
      top: -3px;
      margin-left: 5px;
      font-size: 17px;
      opacity: 0.7;
    }
  }
`;

const DialogButton = styled.button`
  height: 50px;
  width: 400px;
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
  &:hover:enabled {
    background-color: #240d01;
    transition: 200ms ease-in-out;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const CloseButton = styled(Button)`
  background-color: #240d01 !important;
  color: white !important ;
  margin-top: 20px !important;
  height: 30px;
`;

export default SignUp;
