import styled from "styled-components";

const StyledInputContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 43px;

  & > p {
    text-align: right;
    font-size: 12px;
    margin: 0;
  }
  & > input {
    font-size: 15px;
    margin-top: 7px;
    width: 98%;
  }
  .red {
    color: red;
    font-weight: bold;
  }
  .black {
    color: black;
  }
`;

export default StyledInputContent;
