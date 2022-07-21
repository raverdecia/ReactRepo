import { FC } from "react";

export type ButtonProps = {
  label: string;
  onClick: () => void;
};

/*export const Button: FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <>
      {label === "edit" ? (
        <i className="material-icons" onClick={onClick} style={{ color: "#0275ff" }}>
          edit
        </i>
      ) : label === "delete" ? (
        <i className="material-icons" onClick={onClick} style={{ color: "#0275ff" }}>
          delete
        </i>
      ) : (
        <button style={{ height: "24px", width: "23%", margin: "1px" }} onClick={onClick}>
          {label}
        </button>
      )}
    </>
  );
};*/

export const Button: FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <>
      <div style={{}}></div>
      <button
        style={{
          height: "24px",
          width: "24px",
          margin: "1px",
          border: "0px",
          padding: "0px",
          boxSizing: "unset",
          backgroundColor: "unset",
          alignSelf: "center",
        }}
        onClick={onClick}
      >
        <i className="material-icons" style={{ color: "#0275ff" }}>
          {label}
        </i>
      </button>
    </>
  );
};
