import styled from "styled-components";
import Header from "../header";
import DOG from "../../Assets/backDog.png";
import { useContext } from "react";
import { DetailsContext } from "../Context/detailsContext";

const Messages = () => {
  const { userData } = useContext(DetailsContext);

  return (
    <MainDiv>
      <Header />
      <Section>
        <Content>
          <Table>
            <tbody>
              <tr>
                <TH>Row</TH>
                <TH>Name</TH>
                <TH>Message</TH>
                <TH>Action</TH>
              </tr>

              {userData && userData.messages
                ? userData.messages.map((message, index) => {
                    return (
                      <tr index={index}>
                        <TD style={{ width: "1%", textAlign: "center" }}>
                          {index + 1}
                        </TD>
                        <TD style={{ width: "21%" }}>
                          {message.senderFirstName.replace(
                            /^./,
                            message.senderFirstName[0].toUpperCase()
                          )}{" "}
                          {message.senderLastName.replace(
                            /^./,
                            message.senderLastName[0].toUpperCase()
                          )}
                        </TD>
                        <TD
                          style={{ width: "60%" }}
                          dangerouslySetInnerHTML={{ __html: message.message }}
                        />
                        <TD style={{ textAlign: "center", width: "20%" }}>
                          <Answer
                          // onClick={() => {
                          //   history.push({
                          //     pathname: "/dashboard/editNews",
                          //     state: { id: news._id },
                          //   });
                          // }}
                          >
                            Answer
                          </Answer>
                          <Delete
                          // onClick={() => {
                          //   fetch(
                          //     `https://mynewsprojectapp.herokuapp.com/api/delete/${news._id}`,
                          //     {
                          //       method: "Delete",
                          //       headers: {
                          //         "Content-Type": "application/json",
                          //       },
                          //     }
                          //   )
                          //     .then((respond) => {
                          //       respond.json();
                          //     })
                          //     .then((result) => {
                          //       return result;
                          //     })
                          //     .then(() => {
                          //       window.location.reload();
                          //     });
                          // }}
                          >
                            Delete
                          </Delete>
                        </TD>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        </Content>
      </Section>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-image: url(${DOG});
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 78%;
  margin-top: 100px;
  padding: 10px 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  border: 1px solid #5f4024;
  border-radius: 10px;
  padding: 10px;
`;

const Table = styled.table`
  width: 90%;
`;

const TH = styled.th`
  font-family: Acme;
  font-size: 20px;
  padding: 20px;
`;

const TD = styled.td`
  font-family: Abel;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid #5f4024;
  padding: 20px;
`;

const Answer = styled.a`
  font-family: Abel;
  font-size: 18px;
  font-weight: 100;
  color: white;
  background-color: green;
  border: 1px solid #5f4024;
  padding: 8px 18px;
  margin-right: 5px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const Delete = styled.a`
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

export default Messages;
