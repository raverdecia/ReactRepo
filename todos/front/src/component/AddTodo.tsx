import { ChangeEvent, FC, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { ListTodosObj } from "./ListTodos";

export type AddTodoProps = {
  setListTodos: (listTodo: ListTodosObj[]) => void;
  listTodos: ListTodosObj[];
};

export const AddTodo: FC<AddTodoProps> = ({ setListTodos, listTodos }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputValue = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  };

  const addTodoDB = () => {
    //codigo para agregar a la bd
    fetch("http://localhost:3001/", {
      body: JSON.stringify({ name: inputValue, completed: false }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ rows }) => setListTodos([...listTodos, { id: rows[0].lastid, name: inputValue, completed: false }]))
      .then(() => setInputValue(""));
  };

  return (
    <span style={{ display: "flex" }}>
      <Input value={inputValue} handleInputValue={handleInputValue} handleEnter={addTodoDB} />
      <Button label={"done"} onClick={addTodoDB} />
    </span>
  );
};
