import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useContext } from "react";
import { DetailsContext } from "../Context/detailsContext";

const AnswerButton = ({ name, id }) => {
  const { userData } = useContext(DetailsContext);

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState();

  const [success, setSuccsess] = useState("");

  const sendMessage = () => {
    const formData = new FormData();
    formData.append("message", message);
    formData.append("userId", id);
    formData.append("senderId", userData._id);
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);

    fetch("/api/sendMessage", {
      method: "PATCH",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .then(() => {
        setMessage("");
        setSuccsess(`${name} received your message.`);
      });
  };

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    if (success) {
      setSuccsess("");
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <ButtonAnswer onClick={handleClickToOpen}>Answer</ButtonAnswer>
      <Dialog open={open} onClose={handleToClose}>
        <Title style={{ marginBottom: "40px" }}>Contact {name}</Title>
        <StyledDialogContent>
          <label>
            <StyledReactQuill
              theme="snow"
              value={message || ""}
              onChange={setMessage}
            />
          </label>
          <br />
          {message ? (
            <FlexDiv>
              <DialogButton onClick={sendMessage}>Submit</DialogButton>
              <Success>{success ? success : null}</Success>
            </FlexDiv>
          ) : (
            <DialogButton disabled>Submit</DialogButton>
          )}
        </StyledDialogContent>
        <DialogActions>
          <CloseButton onClick={handleToClose}>Close</CloseButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

const StyledDialogContent = styled(DialogContent)`
  width: 500px;
`;

const Title = styled.h1`
  font-family: "Acme";
  font-size: 45px;
  text-align: center;
  margin-top: 50px;
  color: #5f4024;
  padding: 0px 20px;
`;

const StyledReactQuill = styled(ReactQuill)`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  padding: 10px;
  font-family: Abel;
  font-size: 17px;
  outline-color: #5f4024;
`;

const ButtonAnswer = styled.a`
  font-family: Abel;
  font-size: 18px;
  font-weight: 100;
  color: white;
  background-color: #3f8d49;
  border: 1px solid #5f4024;
  padding: 8px 18px;
  margin-right: 5px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const DialogButton = styled.button`
  font-family: "Abel";
  width: 160px;
  height: 45px;
  border: none;
  border-radius: 10px;
  font-size: 22px;
  background-color: #825e3a;
  border: 1px solid white;
  margin-top: 10px;
  margin-left: 10px;
  color: white;
  cursor: pointer;
  &:hover:enabled {
    transition: 200ms ease-in-out;
    font-size: 25px;
    box-shadow: 0px 0px 3px 1px #5f4024;
    font-weight: 200;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const CloseButton = styled(Button)`
  background-color: #5f4024 !important;
  color: white !important ;
  margin-top: 20px !important;
  height: 30px;
`;

const FlexDiv = styled.div`
  display: flex;
`;

const Success = styled.h3`
  font-family: Abel;
  font-size: 17px;
  color: green;
  margin-top: 30px;
  margin-left: 5px;
`;

export default AnswerButton;
