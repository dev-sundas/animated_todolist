"use client";
import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { TodoFormType } from "@/lib/types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Loader2 } from "lucide-react"; // Import the loader icon

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    status: boolean;
    updatedTodo: (title: string, status: boolean) => void;
};

export default function EditDialog({
    open,
    setOpen,
    title,
    status,
    updatedTodo,
}: Props) {
    const [newTitle, setNewTitle] = useState(title);
    const [newStatus, setNewStatus] = useState(status);
    const [isloding, setIsloding] = useState(false);

    // Reset states when dialog opens with new data
    useEffect(() => {
        setNewTitle(title);
        setNewStatus(status);
    }, [title, status, open]);

    const updateTodo = () => {
        updatedTodo(newTitle, newStatus);
        setIsloding(true);
        setTimeout(() => {
            setIsloding(false);
        }, 2000);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Todo</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <Input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Enter your task"
                    />
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={newStatus}
                            onCheckedChange={(checked: boolean) => setNewStatus(checked)}
                        />
                        <label>Status</label>
                    </div>
                    {isloding ? (
                        <Button type='button' disabled>
                            <Loader2 className='animate-spin' />
                        </Button>
                    ) : (
                        <Button type='button' onClick={updateTodo}>
                            Update
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
