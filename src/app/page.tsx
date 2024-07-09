"use client"
import Todo from "@/components/Todo";
import { todolist } from "@/lib/db";
import { TodoFormType, todoType } from "@/lib/types";
import { useState } from "react";

const Todolist: todoType[] = todolist

export default function Home() {

    return (
        <main className='bg-[url(/images/todo2.jpg)]  min-h-[100vh] h-full' >
            <section className="main">
                <Todo />
            </section>
        </main>
    );
}

