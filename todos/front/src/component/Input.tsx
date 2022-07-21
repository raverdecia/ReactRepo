import { ChangeEvent, FC, KeyboardEvent } from "react";

export type InputProps = {
  value: string;
  handleInputValue: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
  handleEnter: () => void;
};

export const Input: FC<InputProps> = ({ value, handleInputValue, handleEnter }) => {
  return (
    <span style={{ display: "flex", flexDirection: "column", width: "100%", height: "43px" }}>
      <input
        maxLength={30}
        style={{ fontSize: "15px", width: "95%", marginTop: "7px" }}
        type="text"
        autoFocus={true}
        value={value}
        onChange={handleInputValue}
        onKeyDown={({ key }: KeyboardEvent<HTMLInputElement>) => {
          if (key == "Enter") handleEnter();
        }}
      />
      <p style={{ textAlign: "right", fontSize: "12px", margin: "0" }}>Left: {30 - value.length}</p>
    </span>
  );
};
