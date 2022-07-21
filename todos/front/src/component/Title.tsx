import { FC } from "react";

export type TitleProps = {
  title: string;
};

export const Title: FC<TitleProps> = ({ title }) => {
  return <h1 style={{ textAlign: "center" }}>{title}</h1>;
};
