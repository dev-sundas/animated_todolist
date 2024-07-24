"use client"
import Todo from "@/components/Todo";
import { todolist } from "@/lib/db";
import { TodoFormType, todoType } from "@/lib/types";
import { useState } from "react";

const Todolist: todoType[] = todolist

export default function Home() {

    return (
        <main>
            <section //className="main"
            >
                <Todo />
            </section>
        </main>
    );
}

