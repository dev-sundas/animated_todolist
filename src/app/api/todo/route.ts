import { NextRequest,NextResponse } from "next/server"
import { database } from "../../../../drizzle/database";
import { mySchemaTodo } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";



export async function POST(request: NextRequest) {
    const {title, status} =await request.json()
    console.log("title", title)
    try{
        const Todo =await database.insert(mySchemaTodo).values(
        {   
            title: title,
            status: status,
        }
        )
        console.log("Todo", Todo)

        return NextResponse.json({"message": "Todo added successfully", "todo": Todo})
    }
    catch (error){
        console.error('Error inserting todo item:', error);
        return NextResponse.json({ error: 'Failed to create todo item' }, { status: 500 });
    
    }
  }

export async function GET(request: NextRequest){
    try{
        const Todo = await database.select().from(mySchemaTodo)
        console.log("Todo", Todo)
        return NextResponse.json({"message": Todo})
    } catch (error){
        console.error('Error getting todo item:', error);
        return NextResponse.json({"message": error})
    }

}

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        await database.delete(mySchemaTodo).where(eq(mySchemaTodo.id,id)); 

        return NextResponse.json({ message: 'Todo item deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo item:', error);
        return NextResponse.json({ error: 'Failed to delete todo item' }, { status: 500 });
    }
}



export async function PUT(request: NextRequest) {
    try {
        const {  id,title,status } = await request.json();

        // Update the todo item with the given ID
        const result = await database.update(mySchemaTodo).set({title: title,status:status  }) .where(eq(mySchemaTodo.id, id)) // Return the updated record
        return NextResponse.json({ message: 'Todo item updated successfully' });
    } catch (error) {
        console.error('Error updating todo item:', error);
        return NextResponse.json({ error: 'Failed to update todo item' }, { status: 500 });
    }
}
