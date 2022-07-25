import { ChangeEvent, FC, useState } from "react";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";
import StyledListTodo, { StyledFile, StyledName } from "./styled/Styled.ListTodo";

export type ListTodosObj = {
  name: string;
  completed: boolean;
  id: number;
};
export type inputObj = {
  value: string;
  pos: number;
};
export type ListTodosProps = {
  listTodos: ListTodosObj[];
  setListTodos: (listTodo: ListTodosObj[]) => void;
};

export const ListTodos: FC<ListTodosProps> = ({ setListTodos, listTodos }) => {
  const [inpValue, setinpValue] = useState<inputObj>({ value: "", pos: -1 });

  const handleInputValue = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (inpValue?.pos != -1) setinpValue({ value: value, pos: inpValue.pos });
  };

  const handleEditTodo = (pos: number, flag?: boolean) => {
    const { id, name, completed } = listTodos[pos];

    if (flag) {
      setinpValue({ value: name, pos: pos });
    } else {
      //add edit todo to db
      fetch(`http://localhost:3001/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name: inpValue.value, completed }),
      }).then(() => {
        listTodos[pos].name = inpValue.value;
        setinpValue({ value: "", pos: -1 });
      });
    }
  };

  const handleFinishTodo = (pos: number) => {
    if (inpValue.pos == -1) {
      listTodos[pos].completed = !listTodos[pos].completed;
      const { id, name, completed } = listTodos[pos];
      fetch(`http://localhost:3001/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, completed }),
      }).then(() => {
        //setListTodos([...listTodos.sort((a, b) => Number(b.completed) - Number(a.completed))]);
        fetch("http://localhost:3001/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => setListTodos(data));
      });
    }
  };

  const deletTodo = (pos: number) => {
    const { id } = listTodos[pos];
    //delete from list
    setListTodos(listTodos.filter((todo) => todo != listTodos[pos]));
    //delete fron bd
    fetch(`http://localhost:3001/?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <StyledListTodo>
      {listTodos.map(({ id, name, completed }, pos) => {
        return (
          <StyledFile key={id * Math.random()}>
            <Checkbox completed={completed} handleFinishTodo={() => handleFinishTodo(pos)} />
            {inpValue.pos != -1 && pos === inpValue.pos ? (
              <>
                <Input
                  value={inpValue.value}
                  handleInputValue={handleInputValue}
                  handleEnter={() => handleEditTodo(pos)}
                />
                <Button label={"done"} onClick={() => handleEditTodo(pos)} />
              </>
            ) : (
              <>
                <StyledName>{name}</StyledName>
                <Button label={"edit"} onClick={() => handleEditTodo(pos, true)} />
              </>
            )}
            <Button label={"delete"} onClick={() => deletTodo(pos)} />
          </StyledFile>
        );
      })}
    </StyledListTodo>
  );
};
