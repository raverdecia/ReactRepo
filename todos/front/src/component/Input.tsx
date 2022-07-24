import { ChangeEvent, FC, KeyboardEvent } from "react";
import StyledInput from "./styled/Styled.Input";

export type InputProps = {
  value: string;
  handleInputValue: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
  handleEnter: () => void;
};

export const Input: FC<InputProps> = ({ value, handleInputValue, handleEnter }) => {
  return (
    <StyledInput>
      <input
        maxLength={30}
        type="text"
        autoFocus={true}
        value={value}
        onChange={handleInputValue}
        onKeyDown={({ key }: KeyboardEvent<HTMLInputElement>) => {
          if (key == "Enter") handleEnter();
        }}
      />
      <p className={value.length == 30 ? "red" : "black"}>Left: {30 - value.length}</p>
    </StyledInput>
  );
};
