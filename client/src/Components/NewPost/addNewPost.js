import styled from "styled-components";
import Header from "../header";
import { DetailsContext } from "../Context/detailsContext";
import { useState, useContext, useRef } from "react";
import { BsCardImage } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import BACK from "../../Assets/backDog.png";

const AddNewPost = () => {
  const hiddenFileInput = useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const history = useHistory();
  const { userData } = useContext(DetailsContext);
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [petName, setPetName] = useState();
  const [petAge, setPetAge] = useState();
  const [specificAge, setSpecificAge] = useState();
  const [petType, setPetType] = useState();
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [service, setService] = useState();

  console.log(startTime);

  const postYourPet = () => {
    const formData = new FormData();
    formData.append("petName", petName);
    formData.append("petAge", petAge);
    formData.append("yearOrMonth", specificAge);
    formData.append("petType", petType);
    formData.append("file", file);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("service", service);
    formData.append("description", description);
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("username", userData.username);
    formData.append("userId", userId);
    formData.append("profileImage", userData.profileImage);
    fetch("/api/addNewPost", {
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
        history.push("/profile");
        window.location.reload();
      });
  };

  return (
    <Section>
      <Header />
      <ContentDiv>
        <Content>
          <Title>ADD YOUR PET</Title>

          <InputBox>
            <Label>Name:</Label>
            <Input
              type="text"
              placeholder="Name"
              value={petName || ""}
              onChange={(e) => {
                setPetName(e.target.value);
              }}
            />

            <FlexInDiv>
              <ColumnDiv>
                <Label>Age:</Label>
                <AgeInput
                  type="number"
                  placeholder="Age"
                  min="0"
                  max="18"
                  value={petAge || ""}
                  onChange={(e) => {
                    setPetAge(e.target.value);
                  }}
                />
              </ColumnDiv>
              <ColumnDiv>
                <Label>Year or Month:</Label>
                <Select
                  value={specificAge || ""}
                  onChange={(e) => {
                    setSpecificAge(e.target.value);
                  }}
                >
                  <Option value="0">---</Option>
                  <Option value={petAge > 1 ? "Years" : "Year"}>Year(s)</Option>
                  <Option value={petAge > 1 ? "Months" : "Month"}>
                    Month(s)
                  </Option>
                </Select>
              </ColumnDiv>
            </FlexInDiv>

            <Label>Pet type:</Label>
            <TypeSelect
              value={petType || ""}
              onChange={(e) => {
                setPetType(e.target.value);
              }}
            >
              <Option value="0">---</Option>
              <Option value="Cat">Cat</Option>
              <Option value="Dog">Dog</Option>
            </TypeSelect>

            <>
              <Label>Image:</Label>
              <FlexInDiv>
                <ImageButton onClick={handleClick} style={{ width: "20%" }}>
                  <BsCardImage size={30} />
                </ImageButton>
                <>
                  <Success>{file ? <BsCheckLg size={20} /> : null}</Success>
                  <ImageName>{file ? `${file.name}` : null}</ImageName>
                </>
              </FlexInDiv>

              <input
                hidden
                ref={hiddenFileInput}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </>

            <FlexInDiv>
              <ColumnDiv>
                <Label>Start date:</Label>
                <DateInput
                  type="date"
                  value={startDate || ""}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </ColumnDiv>

              <ColumnDiv style={{ marginLeft: "5px" }}>
                <Label>End date:</Label>
                <DateInput
                  style={{ marginLeft: "5px" }}
                  type="date"
                  value={endDate || ""}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </ColumnDiv>
            </FlexInDiv>

            <FlexInDiv>
              <ColumnDiv>
                <Label>Start time:</Label>
                <DateInput
                  type="time"
                  value={startTime || ""}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                />
              </ColumnDiv>

              <ColumnDiv style={{ marginLeft: "5px" }}>
                <Label>End time:</Label>
                <DateInput
                  style={{ marginLeft: "5px" }}
                  type="time"
                  value={endTime || ""}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                />
              </ColumnDiv>
            </FlexInDiv>

            <Label>Service:</Label>
            <TypeSelect
              value={service || ""}
              onChange={(e) => {
                setService(e.target.value);
              }}
            >
              <Option value="0">---</Option>
              <Option value="Pet-Walk">
                Pet walking (in your neighborhood)
              </Option>
              <Option value="Day-Care">Day care (at the nurse's home)</Option>
              <Option value="House-Visit">Visit your pet (at your home)</Option>
            </TypeSelect>

            <Label>Description:</Label>
            <TextArea
              placeholder="Tell us about your pet..."
              value={description || ""}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <UploadButton onClick={postYourPet}>Upload</UploadButton>
          </InputBox>
        </Content>
      </ContentDiv>
    </Section>
  );
};

const Section = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 50px;
  background-image: url(${BACK});
`;

const ContentDiv = styled.div`
  display: flex;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-family: "Acme";
  font-size: 55px;
  text-align: center;
  margin-top: 50px;
  color: #404040;
`;

const Label = styled.label`
  font-family: Abel;
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
  margin-left: 5px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-left: 20px;
  width: 70%;
`;

const Input = styled.input`
  height: 45px;
  width: 70%;
  font-size: 18px;
  margin-top: 10px;
  outline-color: #1976d2;
  border-radius: 10px;
  padding: 0 0 0 15px;
  border: 1px solid #5f4024;
  font-size: 16px;
  color: #5f4024;
  &::placeholder {
    color: #5f4024;
    opacity: 0.7;
    font-size: 15px;
  }
  &:focus {
    outline-color: #5f4024;
  }
`;

const AgeInput = styled.input`
  height: 40px;
  width: 98%;
  margin-top: 10px;
  outline-color: #5f4024;
  border-radius: 10px;
  padding: 0 0 0 15px;
  border: 1px solid #5f4024;
  font-size: 16px;
  &:focus {
    outline-color: #5f4024;
  }
`;

const FlexInDiv = styled.div`
  display: flex;
  width: 70%;
`;

const Select = styled.select`
  height: 44px;
  width: 100%;
  margin-top: 10px;
  outline-color: #5f4024;
  border-radius: 10px;
  padding: 0 0 0 15px;
  border: 1px solid #5f4024;
  font-size: 16px;
  margin-left: 15px;
  outline-color: #5f4024;
`;

const Option = styled.option`
  font-family: Abel;
  font-size: 17px;
`;

const TypeSelect = styled.select`
  height: 44px;
  width: 72%;
  margin-top: 10px;
  outline-color: #5f4024;
  border-radius: 10px;
  padding: 0 0 0 15px;
  border: 1px solid #5f4024;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 67%;
  min-height: 150px;
  max-height: 250px;
  border-radius: 10px;
  padding: 20px 10px 10px 20px;
  font-size: 17px;
  outline-color: #5f4024;
  margin-top: 10px;
`;

const UploadButton = styled.button`
  height: 50px;
  width: 20%;
  font-size: 18px;
  margin-top: 25px;
  margin-left: 5px;
  outline: none;
  border-radius: 10px;
  font-family: "Abel";
  font-size: 21px;
  background-color: #1976d2;
  border: none;
  color: white;
  cursor: pointer;
  border: 1px solid white;
  &:hover {
    transition: 200ms ease-in-out;
    font-size: 22px;
    box-shadow: 0px 0px 3px 1px #1976d2;
    font-weight: 200;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const ImageButton = styled.button`
  height: 45px;
  width: 180px !important;
  border: 1px solid #5f4024;
  border-radius: 10px;
  margin-top: 10px;
  background-color: white;
  outline-color: #5f4024;
  cursor: pointer;
`;

const Success = styled.h3`
  font-family: Abel;
  font-size: 17px;
  color: green;
  margin-top: 28px;
  margin-left: 5px;
`;

const ImageName = styled.h3`
  font-family: Abel;
  font-size: 15px;
  color: green;
  margin-top: 30px;
`;

const DateInput = styled.input`
  width: 100%;
  height: 42px;
  border: 1px solid black;
  font-family: Abel;
  font-size: 22px;
  text-align: center;
  border-radius: 10px;
  margin-top: 10px;
  outline-color: #5f4024;
`;

export default AddNewPost;
