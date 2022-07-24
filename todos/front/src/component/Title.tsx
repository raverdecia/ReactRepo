import { FC } from "react";
import StyledTitle from "./styled/Styled.Title";

export type TitleProps = {
  title: string;
};

export const Title: FC<TitleProps> = ({ title }) => {
  return <StyledTitle>{title}</StyledTitle>;
};
