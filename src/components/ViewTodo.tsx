"use client"
import { todoType } from '@/lib/types';
import * as React from 'react';
import { PenBoxIcon, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import EditDialog from './EditDialog';
import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { todolist } from '@/lib/db';


type Props = {
    todoList: todoType[]
    //  onDragEnd: (result: { draggableId: string, destination: { index: number } }) => void;
    handleDelete: (id: number) => void;
    handleUpdate: (id: number, title: string) => void;
}

export default function ViewTodo({ todoList, handleDelete, handleUpdate,
    //onDragEnd 
}: Props) {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");

    const updateTodo = (title: string) => {
        handleUpdate(id, title)
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
                    <div key={todo.id} >
                        <EditDialog
                            open={open}
                            setOpen={setOpen}
                            title={title}
                            updatedTitle={updateTodo}
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
                                    <Checkbox />
                                    {todo.title}
                                </span>
                                <span className='flex '>
                                    <Button variant={"ghost"} className='hover:bg-transparent text-[#621940]' onClick={() => handleDelete(todo.id)}><Trash2 /></Button>
                                    <Button variant={"ghost"} className='hover:bg-transparent text-[#0b032d]' onClick={() => {
                                        setOpen(true);
                                        setTitle(todo.title);
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
