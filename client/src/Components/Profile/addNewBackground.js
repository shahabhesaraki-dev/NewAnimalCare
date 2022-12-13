import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { RiImageAddFill } from "react-icons/ri";

const AddNewBackgroundImage = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [open, setOpen] = useState(false);

  const [file, setFile] = useState();

  const addnewProfileImage = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    fetch("/api/addBackgroundImage", {
      method: "POST",
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
      <StyledRiImageAddFill size={28} onClick={handleClickToOpen} />
      <Dialog open={open} onClose={handleToClose}>
        <Title style={{ marginBottom: "50px" }}>Set an image</Title>
        <DialogContent>
          <label htmlFor="file-input">
            <FileInput
              id="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </label>
          <br />
          {file ? (
            <DialogButton onClick={addnewProfileImage}>Update</DialogButton>
          ) : (
            <DialogButton disabled>Update</DialogButton>
          )}
        </DialogContent>
        <DialogActions>
          <CloseButton onClick={handleToClose}>Close</CloseButton>
        </DialogActions>
      </Dialog>
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

const FileInput = styled.input``;

const StyledRiImageAddFill = styled(RiImageAddFill)`
  position: absolute;
  left: 50%;
  bottom: 45%;
`;

const DialogButton = styled.button`
  height: 50px;
  width: 250px;
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

// const Error = styled.h2`
//   font-family: "Acme";
//   font-size: 17px;
//   color: darkred;
//   margin-left: 5px;
//   margin-bottom: 5px;
// `;

export default AddNewBackgroundImage;
