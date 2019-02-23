import styled from "styled-components";
export const UpgradeButton = styled.button`
  padding: 0.5rem;
  border-radius: 7px;
  position: relative;
  width: 300px;
  text-align: center;
  color: white;
  font-size: larger;
  font-weight: bold;
  border: 0;
  cursor: pointer;
  outline: none;
  background: ${props => props.color};
  &:hover {
    background: ${props => props.hoverColor};
  }
`;
//   background: #0066cc;
export const UpgradeButtonFree = styled.div`
  padding: 0.5rem;
  border-radius: 7px;
  position: relative;
  width: 300px;
  text-align: center;
  color: white;
  font-size: larger;
  font-weight: bold;
  border: 0;

  outline: none;
  background: gray;
`;
