import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: calc(100vh - 64px);
  background-image: linear-gradient(to bottom, #447efd, #447efd, 60%, white 50%);
  background-attachment: fixed;
  background-repeat: no-repeat;
`;

export const AppHeader = styled.div`
  background: #447efd;
  height: 64px;
  line-height: 64px;
  padding: 0px 6rem;
  display: inline-flex;
`;
