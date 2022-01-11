import styled from "styled-components";

export const Button = styled.button`
  font-family: ${(props) => props.theme.fontFamily};
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.15px;

  margin: 0px 10px;
  padding: 8px 16px;

  background: #18334a;
  border-radius: 20px;
  border: none;
  color: #ffffff;

  &:active {
    background: rgba(24, 51, 74, 0.72);
  }
`;
