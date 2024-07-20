"use client"
import { TodoFormType, TodoSchema, todoType } from '@/lib/types';
import * as React from 'react';
import { PenBoxIcon, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import EditDialog from './EditDialog';
import { motion } from "framer-motion"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form"
  
import { Checkbox } from './ui/checkbox';
import { useForm} from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
    todoList: todoType[]
    //  onDragEnd: (result: { draggableId: string, destination: { index: number } }) => void;
    handleDelete: (id: number) => void;
    handleUpdate: (id: number, title: string,status:boolean) => void;
    handleCheckboxChange: (id: number, checked: boolean) => void;
}

export default function ViewTodo({ todoList, handleDelete, handleUpdate,handleCheckboxChange
    //onDragEnd 
}: Props) {
   
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState(false);

    const form = useForm<TodoFormType>({
        resolver: zodResolver(TodoSchema),
        defaultValues: {
          status: true,
        },
      })

      const onSubmit = (data: TodoFormType) => {    
        console.log(data);
      } 
    
    const updateTodo = (title: string,status:boolean) => {
        handleUpdate(id, title,status);
        setOpen(false);
    };
    {/* const handleDragEnd = (result: any) => {
        // Check if dropped outside the list
        if (!result.destination) {
            return;
        }

        // Reorder todos array based on drag result
        const items = Array.from(todoList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Update the order in parent component
        onDragEnd({
            draggableId: result.draggableId,
            destination: {
                index: result.destination.index
            }
        });
    };*/}

    return (
        <div>
            {todoList.map((todo, index) => {
                return (
                    <div key={todo.id} id={String(todo.id)}>
                        <EditDialog
                            open={open}
                            setOpen={setOpen}
                            title={title}
                            status={status}
                            updatedTodo={updateTodo}
                        />
                        <motion.ul
                            className='grid gap-3'
                            initial={{ y: 500, opacity: 0 }}
                            transition={{ duration: 2, delay: index * 0.2, }}
                            animate={{ opacity: 1, y: 0 }}>
                            <motion.div
                                /* drag="y" // Enable vertical dragging
                                dragConstraints={{ top: 5, bottom: 10 }} // Constrain dragging vertically
                                dragElastic={0.5} // Add some elasticity to dragging
                                onDragEnd={handleDragEnd} // Handle drag end event*/
                                className='mt-5 border-[1px] border-white rounded-md p-3 flex  justify-between items-center'
                            >
                                
                              <span className='flex gap-6'>
                                <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        key={todo.id}
                                        control={form.control}
                                        name={todo.status ? "status" : "title"}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0" key={todo.id}>
                                                <FormControl>
                                                    <Checkbox
                                                        checked={todo.status}
                                                        onCheckedChange={(checked: boolean) => handleCheckboxChange(todo.id, checked)}
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        {todo.title}
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </form>
                                </Form>
                                </span>
                              <span className='flex '>
                                    <Button variant={"ghost"} className='hover:bg-transparent text-[#621940]' onClick={() => handleDelete(todo.id)}><Trash2 /></Button>
                                    <Button variant={"ghost"} className='hover:bg-transparent text-[#0b032d]' onClick={() => {
                                        setOpen(true);
                                        setTitle(todo.title);
                                        setStatus(todo.status);
                                        setId(todo.id);
                                    }}><PenBoxIcon /></Button>
                                </span>
                            </motion.div>
                        </motion.ul>
                    </div>
                )
            })}

        </div>
    );
}
