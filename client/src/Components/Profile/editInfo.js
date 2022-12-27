import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { useState } from "react";

const EditInfoButton = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [open, setOpen] = useState(false);

  const [info, setInfo] = useState();

  console.log("ID", userId);
  console.log("INFO", info);

  const updateInfo = () => {
    const formData = new FormData();
    formData.append("info", info);
    formData.append("userId", userId);

    fetch("/api/updateUserInfo", {
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

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  return (
    <>
      <EditButton onClick={handleClickToOpen}>Edit</EditButton>
      <Dialog open={open} onClose={handleToClose}>
        <Title style={{ marginBottom: "50px" }}>Edit info</Title>
        <StyledDialogContent>
          <label htmlFor="info">
            <TextArea
              id="info"
              value={info || ""}
              onChange={(e) => {
                setInfo(e.target.value);
              }}
            />
          </label>
          <br />
          {info ? (
            <DialogButton onClick={updateInfo}>Update</DialogButton>
          ) : (
            <DialogButton disabled>Update</DialogButton>
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

const TextArea = styled.textarea`
  width: 95%;
  height: 150px;
  border-radius: 10px;
  padding: 10px;
  font-family: Abel;
  font-size: 17px;
  outline-color: #5f4024;
`;

const EditButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 70px;
  height: 30px;
  padding: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  text-align: center;
  border: none;
  border-radius: 10px;
  font-family: Acme;
  font-size: 18px;
  cursor: pointer;
`;

const DialogButton = styled.button`
  font-family: "Abel";
  width: 180px;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 22px;
  background-color: #825e3a;
  border: 1px solid white;
  margin-top: 10px;
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

export default EditInfoButton;
