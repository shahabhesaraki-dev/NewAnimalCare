// import styled from "styled-components";
// import Header from "../header";
// import { useState, useContext } from "react";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { Button, TextField } from "@mui/material";
// import { DetailsContext } from "../Context/detailsContext";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import dayjs from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { useHistory } from "react-router-dom";

const AddNewPost = () => {
  //   const history = useHistory();
  //   const { userData } = useContext(DetailsContext);
  //   const userId = JSON.parse(localStorage.getItem("userId"));
  //   const [petName, setPetName] = useState();
  //   const [petAge, setPetAge] = useState();
  //   const [petType, setPetType] = useState();
  //   const [file, setFile] = useState();
  //   const [description, setDescription] = useState("");
  //   // const [imageTwo, setImageTwo] = useState();
  //   // const [imageThree, setImageThree] = useState();
  //   const [startDate, setStartDate] = useState(dayjs(new Date()));
  //   const [endDate, setEndDate] = useState(dayjs(new Date()));
  //   const handleStartDateChange = (newValue) => {
  //     setStartDate(newValue);
  //   };
  //   const handleEndDateChange = (newValue) => {
  //     setEndDate(newValue);
  //   };
  //   const postYourPet = () => {
  //     const formData = new FormData();
  //     formData.append("petName", petName);
  //     formData.append("petAge", petAge);
  //     formData.append("petType", petType);
  //     formData.append("file", file);
  //     // formData.append("imageTwo", imageTwo);
  //     // formData.append("imageThree", imageThree);
  //     formData.append("startDate", startDate.toISOString());
  //     formData.append("endDate", endDate.toISOString());
  //     formData.append("description", description);
  //     formData.append("firstName", userData.firstName);
  //     formData.append("lastName", userData.lastName);
  //     formData.append("username", userData.username);
  //     formData.append("userId", userId);
  //     formData.append("profileImage", userData.profileImage);
  //     fetch("/api/addNewPost", {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((result) => {
  //         return result;
  //       })
  //       .then(() => {
  //         history.push("/profile");
  //         window.location.reload();
  //       });
  //   };
  //   return (
  //     <>
  //       <Header />
  //       <Section>
  //         <Content>
  //           <Title>ADD YOUR PET</Title>
  //           <InputBox>
  //             <StyledTextField
  //               id="outlined-basic"
  //               label="Pet-Name"
  //               variant="outlined"
  //               value={petName || ""}
  //               onChange={(e) => {
  //                 setPetName(e.target.value);
  //               }}
  //             />
  //             <StyledFormControl>
  //               <InputLabel id="demo-simple-select-autowidth-label">
  //                 Pet-Type
  //               </InputLabel>
  //               <StyledSelect
  //                 labelId="demo-simple-select-autowidth-label"
  //                 id="demo-simple-select-autowidth"
  //                 value={petType || ""}
  //                 onChange={(e) => {
  //                   setPetType(e.target.value);
  //                 }}
  //                 autoWidth
  //                 label="Pet-Type"
  //               >
  //                 <StyledMenuItem value="Dog">Dog</StyledMenuItem>
  //                 <StyledMenuItem value="Cat">Cat</StyledMenuItem>
  //                 <StyledMenuItem value="Bird">Bird</StyledMenuItem>
  //               </StyledSelect>
  //             </StyledFormControl>
  //             <StyledTextField
  //               id="outlined-basic"
  //               label="Pet-Age"
  //               variant="outlined"
  //               value={petAge || ""}
  //               onChange={(e) => {
  //                 setPetAge(e.target.value);
  //               }}
  //             />
  //             <LocalizationProvider dateAdapter={AdapterDayjs}>
  //               <StyledStack>
  //                 <StackDiv>
  //                   <DesktopDatePicker
  //                     label="Start-Date"
  //                     inputFormat="MM/DD/YYYY"
  //                     value={startDate || ""}
  //                     onChange={handleStartDateChange}
  //                     renderInput={(params) => <TextField {...params} />}
  //                   />
  //                 </StackDiv>
  //                 <StackDiv style={{ marginLeft: "10px" }}>
  //                   <DesktopDatePicker
  //                     label="End-Date"
  //                     inputFormat="MM/DD/YYYY"
  //                     value={endDate || ""}
  //                     onChange={handleEndDateChange}
  //                     renderInput={(params) => <TextField {...params} />}
  //                   />
  //                 </StackDiv>
  //               </StyledStack>
  //             </LocalizationProvider>
  //             <ButtonDiv>
  //               <StyledButton variant="contained" component="label">
  //                 Upload pet-image
  //                 <input
  //                   hidden
  //                   type="file"
  //                   accept="image/*"
  //                   onChange={(e) => {
  //                     setFile(e.target.files[0]);
  //                   }}
  //                 />
  //               </StyledButton>
  //               <Succeed>{file ? `Image uploaded!` : null}</Succeed>
  //               {/* <StyledButton variant="contained" component="label">
  //                 Upload pet-image-2
  //                 <input
  //                   hidden
  //                   type="file"
  //                   accept="image/*"
  //                   onChange={(e) => {
  //                     setImageTwo(e.target.files[0]);
  //                   }}
  //                 />
  //               </StyledButton>
  //               <Succeed>{imageTwo ? `Image-2 uploaded!` : null}</Succeed>
  //               <StyledButton variant="contained" component="label">
  //                 Upload pet-image-3
  //                 <input
  //                   hidden
  //                   type="file"
  //                   accept="image/*"
  //                   onChange={(e) => {
  //                     setImageThree(e.target.files[0]);
  //                   }}
  //                 />
  //               </StyledButton>
  //               <Succeed>{imageThree ? `Image-3 uploaded!` : null}</Succeed> */}
  //             </ButtonDiv>
  //             <TextArea
  //               placeholder="Tell us about your pet..."
  //               value={description || ""}
  //               onChange={(e) => {
  //                 setDescription(e.target.value);
  //               }}
  //             />
  //           </InputBox>
  //           <SebmitButton variant="outlined" onClick={postYourPet}>
  //             Submit
  //           </SebmitButton>
  //         </Content>
  //       </Section>
  //     </>
  //   );
};

// const Section = styled.div`
//   display: flex;
//   max-width: 100%;
//   justify-content: center;
//   padding-bottom: 50px;
// `;

// const Content = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 70%;
//   min-width: 40%;
//   margin-left: 250px;
// `;

// const Title = styled.h1`
//   font-family: "Acme";
//   font-size: 55px;
//   text-align: center;
//   margin-top: 50px;
//   color: #404040;
// `;

// const InputBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-top: 50px;
//   margin-left: 20px;
// `;

// const Succeed = styled.h3`
//   font-family: "Abel";
//   font-size: 17px;
//   margin-top: 5px;
//   color: green;
// `;

// const StackDiv = styled.div`
//   width: 50%;
// `;

// const StyledStack = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin-top: 20px;
//   width: 50%;
// `;

// const StyledTextField = styled(TextField)`
//   width: 50%;
//   margin-top: 20px !important;
// `;

// const StyledFormControl = styled(FormControl)`
//   width: 50%;
//   margin-top: 20px !important;
// `;

// const StyledSelect = styled(Select)`
//   width: 100%;
// `;

// const StyledMenuItem = styled(MenuItem)`
//   width: 300px !important;
// `;

// const StyledButton = styled(Button)`
//   margin-top: 20px !important;
//   height: 45px;
// `;

// const ButtonDiv = styled.div`
//   width: 200px;
//   height: 50px;
// `;

// const SebmitButton = styled(Button)`
//   margin-top: 50px !important;
//   width: 50%;
//   margin-left: 20px !important;
//   height: 55px;
// `;

// const TextArea = styled.textarea`
//   max-width: 48%;
//   min-width: 48%;
//   min-height: 150px;
//   max-height: 250px;
//   border-radius: 10px;
//   padding: 20px 10px 10px 20px;
//   font-size: 17px;
//   outline-color: #1976d2;
//   margin-top: 50px;
// `;

export default AddNewPost;
