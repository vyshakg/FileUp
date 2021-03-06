import styled from "styled-components";

export const UploadWrapper = styled.div`
  width: 60vw;
  border-radius: 1rem;
  background: white;
  box-shadow: 1px 1px 20px 0px #969aa5;
  margin-bottom: 3rem;
  @media (max-width: 630px) {
    width: 80vw;
  }
  @media (max-width: 460px) {
    width: 80vw;
  }
`;
export const Header = styled.h1`
  font-family: "Noto Sans", sans-serif;
  color: gray;
  font-size: -webkit-xxx-large;
  margin-top: 2rem;
  margin-bottom: 0;
  @media (max-width: 850px) {
    font-size: 2.2rem;
    margin-top: 1.1rem;
  }
  @media (max-width: 450px) {
    font-size: x-large;
  }
`;
export const CustomButton = styled.button`
  background-color: #1890ff;
  box-shadow: -3px 3px 9px 1px #9e9e9e;
  border: 0;
  border-radius: 40px;
  width: 18rem;
  color: white;
  font-size: large;
  font-weight: 600;
  cursor: pointer;
  margin-top:2rem;
  padding:1rem
  outline: none;
    border: none;
    &:hover {
      background: #1d6fbb;
    }
    @media (max-width: 630px) {
      width: 12rem;
      padding : 0.85rem
    }
    @media (max-width: 460px) {
      width: 8rem;
      padding : 8px;
    }
`;

export const UploadContainer = styled.div`
  transition: border-color 0.3s;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  outline: 0;
  position: relative;
  &:hover {
    border-color: #40a9ff;
  }
  border: ${props => (props.isDragReject || props.isDragActive ? "2px dashed #40a9ff" : " 1px dashed #d9d9d9")};
  background-color: ${props => (props.isDragReject || props.isDragActive ? "#eee" : "#ececec")};
`;
export const FileList = styled.div`
  padding: 0.5rem;
  border: 1px solid #40a9ff;
  margin: 5px 5px;
  width: 200px;
  overflow-wrap: break-word;
`;
export const DisplayFileListSC = styled.div`
  display: flex;
  margin: 0 -5px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
`;
