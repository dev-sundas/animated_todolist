import { NextRequest, NextResponse } from "next/server";
import { database } from "../../../../drizzle/database";
import { mySchemaUsers } from "../../../../drizzle/schema";
import { and, eq } from "drizzle-orm";
import * as jose from "jose";
import { cookies } from "next/headers";



{/*export async function GET(request: NextRequest) {
    const users = await db.select().from(mySchemaUsers);
    return NextResponse.json({ message: users });
  }*/}
export async function GET(request: NextRequest) {
    const {id} = await request.json();
    try {
        // Fetch user data from the database based on the userId
        const user = await database
            .select()
            .from(mySchemaUsers)
            .where(eq(mySchemaUsers.id,id));
        console.log("User", user);
        return NextResponse.json({ user });
    } catch (error) {
        console.error('Error getting user:', error);
        return NextResponse.json({ error: 'Failed to retrieve user' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
      const { email, password } = await request.json();
      
      console.log("Login attempt for:", email);
  
      // Log the beginning of the query execution
      console.log("Executing database query...");
  
      const users = await database
        .select()
        .from(mySchemaUsers)
        .where(
          and(eq(mySchemaUsers.email, email), eq(mySchemaUsers.password, password))
        );
  
      // Log the result of the query
      console.log("Database query result:", users);
  
      if (users.length > 0) {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
          throw new Error("JWT_SECRET is not defined");
        }
  
        const alg = "HS256";
        const jwt = await new jose.SignJWT({
          email: users[0].email,
          id: users[0].id,
        })
          .setProtectedHeader({ alg })
          .setIssuedAt()
          .setExpirationTime("2h")
          .sign(new TextEncoder().encode(secret));
  
        cookies().set("token", jwt, {
          httpOnly: true,
        });
  
        console.log("User logged in successfully:", users[0]);
  
        return NextResponse.json({ message: "User logged in successfully", user: users[0] });
      }
  
      console.warn("Invalid login attempt for:", email);
      return NextResponse.json({ message: "Wrong email or password" }, { status: 401 });
    } catch (error) {
      console.error("Error processing login request:", error);
      return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
  }
  
  

export async function PUT(request: NextRequest) {
    const { id, email, password, username } = await request.json();
    try {
        await database
            .update(mySchemaUsers)
            .set({
                email: email,
                password: password,
                username: username,
            })
            .where(eq(mySchemaUsers.id, id));
        return NextResponse.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const { id } = await request.json();
    try {
        await database
            .delete(mySchemaUsers)
            .where(eq(mySchemaUsers.id, id));
        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}