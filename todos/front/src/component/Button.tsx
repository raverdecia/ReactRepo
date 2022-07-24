import { FC } from "react";
import StyledButton from "./styled/Styled.Button";

export type ButtonProps = {
  label: string;
  onClick: () => void;
};

export const Button: FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <i className="material-icons">{label}</i>
    </StyledButton>
  );
};
