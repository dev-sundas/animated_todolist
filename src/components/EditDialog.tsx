"use client";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { TodoFormType } from "@/lib/types";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    updatedTitle: (title: string) => void;
};

export default function EditDialog({
    open,
    setOpen,
    title,
    updatedTitle,
}: Props) {
    const updateTitle = (data: TodoFormType) => {
        updatedTitle(data.title)

    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Todo</DialogTitle>
                </DialogHeader>
                <div>
                    <AddTodo addTodo={updateTitle} value={title} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
