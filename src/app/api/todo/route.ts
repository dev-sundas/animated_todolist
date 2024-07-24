import { NextRequest, NextResponse } from "next/server";
import { database } from "../../../../drizzle/database";
import { mySchemaTodo } from "../../../../drizzle/schema";
import { and, eq } from "drizzle-orm";




export async function POST(request: NextRequest) {
    const userId = JSON.parse(request.headers.get("userId") as string);
    const { title, status } = await request.json();
    console.log("title", title);
    try {
        const [newTodo] = await database
            .insert(mySchemaTodo)
            .values({
                title: title,
                status: status,
                userId: userId,
            })
            .returning(); // Ensure the inserted item is returned

        console.log("New Todo", newTodo);
        return NextResponse.json({ message: "Todo added successfully", todo: newTodo });
    } catch (error) {
        console.error('Error inserting todo item:', error);
        return NextResponse.json({ error: 'Failed to create todo item' }, { status: 500 });
    }
}


export async function GET(request: NextRequest) {
    const userId = JSON.parse(request.headers.get("userId") as string);
    console.log("userId", userId);

    try {
        const todos = await database
            .select()
            .from(mySchemaTodo)
            .where(eq(mySchemaTodo.userId, userId));
        console.log("Todos", todos);
        return NextResponse.json({ message:todos });
    } catch (error) {
        console.error('Error getting todo items:', error);
        return NextResponse.json({ error: 'Failed to retrieve todo items' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const userId = JSON.parse(request.headers.get("userId") as string);
    console.log("userId", userId);
    try {
        const { id } = await request.json();

        // Check that the todo belongs to the user
        await database
        .delete(mySchemaTodo)
        .where(
            and(
                eq(mySchemaTodo.userId, userId), // Ensure the user owns the todo
                eq(mySchemaTodo.id, id) // Ensure you're deleting the correct todo item by id
            )
        );

        return NextResponse.json({ message: 'Todo item deleted successfully' ,userId});
    } catch (error) {
        console.error('Error deleting todo item:', error);
        return NextResponse.json({ error: 'Failed to delete todo item' }, { status: 500 });
    }
}





export async function PUT(request: NextRequest) {
    const userId = JSON.parse(request.headers.get("userId") as string);
    console.log("userId", userId);
    try {
        const { id, title, status } = await request.json();
        console.log("Received data for update:", { id, title, status });

        // Update the todo item only if it belongs to the user
        const result = await database
        .update(mySchemaTodo)
        .set({ title: title, status: status })
        .where(
            and(
                eq(mySchemaTodo.userId, userId), // Ensure the user owns the todo
                eq(mySchemaTodo.id, id) // Ensure you're updating the correct todo item by id
            )
        )
        .returning(); // If your ORM supports returning the updated record
    
        console.log("result", result);    
        return NextResponse.json({ message: 'Todo item updated successfully',result});
    } catch (error) {
        console.error('Error updating todo item:', error);
        return NextResponse.json({ error: 'Failed to update todo item' }, { status: 500 });
    }
}
;

