import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  max-width: 500px;
  height: 60%;
  max-height: 500px;
  background-color: #fff;
  border-radius: 20px;
  padding: 30px 20px;

  @media screen and (max-width: 768px) {
    padding: 20px 15px;
    width: 80%;
    height: 80%;
  }
`;

const ModalHeader = styled.div`
  & h1 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 30px;
  }

  & button {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: #fff;
    color: #212121;
    border: 1px solid #212121;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    font-size: 16px;
    font-weight: 500;
    z-index: 3;
    cursor: pointer;
  }

  & button:hover {
    background-color: #212121;
    color: #fff;
  }
`;

const ModalBody = styled.div`
  overflow-y: auto;
  height: calc(100% - 60px);
  & p {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 20px;
    line-height: 1.6;
    width: 100%;
  }

  & a {
    text-decoration: underline;
  }
`;

export default function Modal({ handleModal }) {
  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <h1>Traffic-Driven Restaurant Success Prediction</h1>
          <button onClick={handleModal}>X</button>
        </ModalHeader>
        <ModalBody>
          <p>
            This project aims to address the pivotal question “Where should I
            open the new restaurant?” by offering insights to new restaurant
            owners based on traffic and location information of candidate
            places. Our primary focus lies in understanding how traffic-related
            data can influence the success of restaurant business
          </p>
          <p>
            Team member: Seunggyun Han, Kihyup Yoon, Seungjae Lee, Dongin Kim,
            Peter Wong, Kayla Washington
          </p>
          <p>Data Visualization: Seunggyun Han, Seungjae Lee</p>
          <p>
            Github Repo (ML):{" "}
            <a
              href="https://github.com/dkim949/team_gigo"
              target="_blank"
              rel="noreferrer"
            >
              Link
            </a>
          </p>
          <p>
            Github Repo (Data Visualization):{" "}
            <a
              href="https://github.com/Aete/team_gigo_viz"
              target="_blank"
              rel="noreferrer"
            >
              Link
            </a>
          </p>
        </ModalBody>
      </ModalContent>
    </ModalContainer>
  );
}
