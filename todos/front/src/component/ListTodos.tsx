import { ChangeEvent, FC, useState } from "react";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";

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
  const [inputValueE, setInputValueE] = useState<inputObj>({ value: "", pos: -1 });

  const handleInputValue = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (inputValueE?.pos != -1) setInputValueE({ value: value, pos: inputValueE.pos });
  };

  const handleEditTodo = (pos: number, flag?: boolean) => {
    const { id, name, completed } = listTodos[pos];

    if (flag) {
      setInputValueE({ value: name, pos: pos });
    } else {
      //add edit todo to db
      fetch(`http://localhost:3001/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name: inputValueE.value, completed }),
      }).then(() => {
        listTodos[pos].name = inputValueE.value;
        setInputValueE({ value: "", pos: -1 });
      });
    }
  };

  const handleFinishTodo = (pos: number) => {
    if (inputValueE.pos == -1) {
      listTodos[pos].completed = !listTodos[pos].completed;
      const { id, name, completed } = listTodos[pos];
      fetch(`http://localhost:3001/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, completed }),
      }).then(() => {
        setListTodos([...listTodos.sort((a, b) => Number(b.completed) - Number(a.completed))]);
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
    <span
      style={{
        height: "fit-content",
        width: "40vh",
        fontFamily: "sans-serif",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "flex-start",
        marginTop: "3px",
      }}
    >
      {listTodos.map(({ id, name, completed }, position) => {
        return (
          <span
            key={id}
            style={{ width: "100vh", border: "0.5px solid black", display: "flex", backgroundColor: "azure" }}
          >
            <Checkbox completed={completed} handleFinishTodo={() => handleFinishTodo(position)} />
            {inputValueE.pos != -1 && position === inputValueE.pos ? (
              <>
                <Input
                  value={inputValueE.value}
                  handleInputValue={handleInputValue}
                  handleEnter={() => handleEditTodo(position)}
                />
                <Button label={"done"} onClick={() => handleEditTodo(position)} />
              </>
            ) : (
              <>
                <div
                  style={{
                    width: "90%",
                    margin: "2px",
                    color: "black",
                    fontSize: "18px",
                    paddingLeft: "3px",
                  }}
                >
                  {name}
                </div>

                <Button label={"edit"} onClick={() => handleEditTodo(position, true)} />
              </>
            )}
            <Button label={"delete"} onClick={() => deletTodo(position)} />
          </span>
        );
      })}
    </span>
  );
};
