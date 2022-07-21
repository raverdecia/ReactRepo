import { ChangeEvent, FC, useState } from "react";

export type CheckProps = {
  completed: boolean;
  handleFinishTodo: () => void;
};

export const Checkbox: FC<CheckProps> = ({ completed, handleFinishTodo }) => {
  return <input type="checkbox" checked={completed} onChange={handleFinishTodo} />;
};
