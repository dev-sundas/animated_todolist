import { NextRequest,NextResponse } from "next/server"
import { database } from "../../../../drizzle/database"
import { mySchemaUsers } from "../../../../drizzle/schema"
import { eq } from "drizzle-orm"


export async function POST(request: NextRequest) {
    const {username,email,password} =await request.json()
    const users =await database.insert(mySchemaUsers).values(
    {
        username: username,
        email: email,
        password:password
    }
    )
    return NextResponse.json({"message": "signup successfully"})
  }

export async function GET(request: NextRequest){
    const users = await database.select().from(mySchemaUsers)
    return NextResponse.json({"message": users})

}

export async function DELETE(request: NextRequest){
    const {id} = await request.json()
    const users = await database.delete(mySchemaUsers).where(eq(mySchemaUsers.id, id));
    return NextResponse.json({"message": "deleted successfully"})
}

export async function PUT(request: NextRequest){
    const {id,username,email,password} = await request.json()
    const users = await database.update(mySchemaUsers).set({
        username: username,
        email: email,
        password: password,
    }).where(eq(mySchemaUsers.id, id));
    return NextResponse.json({"message": "updated   successfully"})}
