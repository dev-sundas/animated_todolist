"use client"
import * as React from 'react';
import { TodoFormType, todoType } from '@/lib/types';
import { motion } from "framer-motion"
import AddTodo from './AddTodo';
import { todolist } from '@/lib/db';
import Heading from './HeadingItems';
import ViewTodo from './ViewTodo';
import { useEffect, useState } from 'react';


type Props = {
}

const Todolist: todoType[] = todolist
export default function Todo({ }: Props) {
    const [todoList, setTodoList] = useState<todoType[]>(Todolist);

    useEffect(() => {
        const getTodo = async () => {
            const response = await fetch("api/todo")
            const res = await response.json()
            console.log(res)
        }
        getTodo()
    }, [])



    const addTodo = async (data: TodoFormType) => {
        const response = await fetch("api/todo", {
            method: "POST",
            body: JSON.stringify({ data }),
        });
        const result = await response.json();
        console.log("result", result);
        setTodoList((prevTodoList) => [
            ...prevTodoList,
            {
                id: todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 1,
                title: data.title,
                status: false,
            },
        ]);

    }

    const handleDelete = (id: number) => {
        const updatedTodoList = todoList.filter((todo) => todo.id !== id);
        setTodoList(updatedTodoList);
    };

    const UpdateTodo = (id: number, title: string) => {
        const updatedTodoList = todoList.filter((todo) => todo.id == id);
        updatedTodoList[0].title = title;
        const indexToUpdate = todoList.findIndex((todo) => todo.id === id);
        const newTodoList = [...todoList];
        newTodoList[indexToUpdate] = updatedTodoList[0];
        setTodoList(newTodoList);
        console.log(newTodoList)
    }
    {/*   const handleDragEnd = ({ draggableId, destination }: { draggableId: string, destination: { index: number } }) => {
        const updatedTodos = Array.from(todoList);
        const [reorderedItem] = updatedTodos.splice(destination.index, 1);
        updatedTodos.splice(destination.index, 0, reorderedItem);
        setTodoList(updatedTodos);
    };*/}

    return (
        <div className=''>
            <div className="flex flex-col justify-center items-center w-[100%] h-[100vh] ">
                <motion.div
                    className='w-[500px] bg-transparent shadow-lg 
                   max-h-screen overflow-y-auto
                backdrop-blur-md rounded-md
                border-[1px] border-[white] p-4'
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2, delay: 1 }}
                >
                    <motion.div>
                        <Heading heading1={'Todo'} heading2={'List'} />
                        <AddTodo addTodo={addTodo} />
                        <ViewTodo todoList={todoList}
                            handleDelete={handleDelete}
                            handleUpdate={UpdateTodo}
                        // onDragEnd={handleDragEnd} 
                        />
                    </motion.div>
                </motion.div>

            </div>



        </div>
    );
}
