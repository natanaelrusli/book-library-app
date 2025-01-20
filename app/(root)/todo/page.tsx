import React from "react";
import { getData } from "@/actions/todoActions";
import TodoForm from "@/components/TodoForm";

const Todo = async () => {
  const data = await getData();

  return <TodoForm todos={data} />;
};

export default Todo;
