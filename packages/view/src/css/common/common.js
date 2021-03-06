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
  padding: 0px 8rem;
  display: inline-flex;
  background: ${props => props.color};
  @media (max-width: 768px) {
    justify-content: center;
  }
  @media (max-width: 1024px) {
    padding: 0px 5rem;
  }
`;

export const SideBarProfile = styled.div`
  display: inline-flex;
  height: 64px;
  margin: 1rem 0 1rem 1rem;
`;
