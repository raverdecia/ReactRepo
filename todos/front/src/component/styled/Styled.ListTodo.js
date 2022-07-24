import styled from "styled-components";

const StyledListTodo = styled.div`
  width: 95%;
  font-family: sans-serif;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 3px;
`;

export const StyledFile = styled.div`
  width: 100%;
  border: 0.5px solid black;
  display: flex;
  background-color: azure;
`;

export const StyledName = styled.div`
  width: 90%;
  margin: 2px;
  color: black;
  font-size: 18px;
  padding-left: 3px;
  word-break: break-all;
`;

export default StyledListTodo;
