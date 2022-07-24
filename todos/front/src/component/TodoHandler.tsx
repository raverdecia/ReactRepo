import { FC, useEffect, useState } from "react";
import { AddTodo } from "./AddTodo";
import { Title } from "./Title";
import { ListTodos, ListTodosObj } from "./ListTodos";
import StyledTodoHandler from "./styled/Styled.TodoHandler";

export type TodoHandlerProps = {};

export const TodoHandler: FC<TodoHandlerProps> = () => {
  const [listTodos, setListTodos] = useState<ListTodosObj[]>([]);

  useEffect(() => {
    // Run! Like go get some data from an API.
    fetch("http://localhost:3001/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setListTodos(data));
  }, []);

  return (
    <StyledTodoHandler>
      <Title title={"To do list"} />
      <AddTodo listTodos={listTodos} setListTodos={setListTodos} />
      <ListTodos listTodos={listTodos} setListTodos={setListTodos} />
    </StyledTodoHandler>
  );
};
