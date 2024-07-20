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
            const response = await fetch("/api/todo",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-cache"
            })
            const {message} = await response.json()
            console.log("message----> ", message)
           
                setTodoList(() => [
                    ...Todolist,
                    ...message.map((todo: todoType) => ({
                        id: todo.id,
                        title: todo.title,
                        status: todo.status,
                      })),
                ]);
          
        }
        getTodo()
    }, [])



    const addTodo = async (data: TodoFormType) => {
        const response = await fetch("/api/todo", {
            method: "POST",
            body: JSON.stringify({ title: data.title, status: data.status }),
        });
        const {message, todo} = await response.json();
        console.log("result", message);
        setTodoList((prevTodoList) => [
            ...prevTodoList,
            {
              id: todo.id,
              title: todo.title,
              status: todo.status,
            },
          ]);

    }

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch("/api/todo", {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete todo item');
            }
    
            const data = await response.json();
            console.log("result", data.message);
    
            const updatedTodoList = todoList.filter((todo) => todo.id !== id);
            setTodoList(updatedTodoList);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const UpdateTodo = async (id: number, title: string,status:boolean) => {
        try {
          const response = await fetch("/api/todo", {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, title,status }), // Send id and title in the request body
          });
      
          if (!response.ok) {
            throw new Error('Failed to update todo item');
          }
      
          const data = await response.json();
          console.log("result", data.message);
      
          // Update todo in the local state
          const updatedTodoList = todoList.map((todo) => {
            if (todo.id === id) {
              return { ...todo, title,status }; // Update title for the matching todo
            }
            return todo; // Keep other todos unchanged
          });
      
          setTodoList(updatedTodoList);
          console.log(updatedTodoList);
        } catch (error) {
          console.error('Error updating todo:', error);
        }
      };

      const handleCheckboxChange = (id: number, checked: boolean) => {
        setTodoList(prevList =>
            prevList.map(todo =>
                todo.id === id ? { ...todo, status: checked } : todo
            )
        );
    };
      
    

    {/*const UpdateTodo = async (id: number, title: string) => {
        try {
            const response = await fetch("api/todo", {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update todo item');
            }
    
            const data = await response.json();
            console.log("result", data.message);
    
            const updatedTodoList = todoList.filter((todo) => todo.id == id);
        updatedTodoList[0].title = title;
        const indexToUpdate = todoList.findIndex((todo) => todo.id === id);
        const newTodoList = [...todoList];
        newTodoList[indexToUpdate] = updatedTodoList[0];
        setTodoList(newTodoList);
        console.log(newTodoList)
        } catch (error) {
            console.error('Error updating todo:', error);
        }
        
    }*/}
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
                            handleCheckboxChange={handleCheckboxChange}
                        // onDragEnd={handleDragEnd} 
                        />
                    </motion.div>
                </motion.div>

            </div>



        </div>
    );
}
