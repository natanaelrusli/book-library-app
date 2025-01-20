"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { todoType } from "@/types/todoType";

interface Props {
  todos: todoType[];
}

const TodoForm = ({ todos }: Props) => {
  return (
    <div className="w-[900px] max-lg:w-full">
      <div className="flex h-[600px] flex-col justify-between rounded-lg bg-white p-6">
        <div className="flex flex-col gap-5">
          <h1 className="font-bebas-neue text-3xl">TODO</h1>

          <ul className="flex flex-col gap-2">
            {todos.map((todo) => (
              <li key={todo.id}>
                <div>
                  <p>{todo.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Input />
      </div>
    </div>
  );
};

export default TodoForm;
