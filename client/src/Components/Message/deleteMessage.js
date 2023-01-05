import styled from "styled-components";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useState, useContext } from "react";
import { DetailsContext } from "../Context/detailsContext";

const DeleteMessage = ({ message }) => {
  const { userData } = useContext(DetailsContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteMessageHnadler = () => {
    const formData = new FormData();
    formData.append("userId", userData._id);
    formData.append("message", message);
    fetch("/api/deleteMessage", {
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
        window.location.reload();
      });
  };

  return (
    <>
      <ButtonDelete onClick={handleClickOpen}>Delete</ButtonDelete>
      <Dialog open={open} onClose={handleClose}>
        <Title>Delete the message!</Title>
        <DialogContent>
          <ContentText>Are you sure?</ContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteMessageHnadler}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Title = styled.h1`
  font-family: "Acme";
  font-size: 45px;
  text-align: center;
  margin-top: 50px;
  color: #5f4024;
  padding: 0px 20px;
`;

const ButtonDelete = styled.a`
  font-family: Abel;
  font-size: 18px;
  font-weight: 100;
  color: white;
  background-color: #eb1f28;
  border: 1px solid #5f4024;
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const ContentText = styled(DialogContentText)`
  font-size: 20px !important;
  color: black !important;
`;

export default DeleteMessage;
