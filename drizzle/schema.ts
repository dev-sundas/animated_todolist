
import {
    serial,
    text,
    pgTable,
    boolean,
    date,
    integer,
  } from "drizzle-orm/pg-core";

  export const mySchemaUsers = pgTable("users", {
    id: serial("id").primaryKey(),
    email: text("email"),
    password: text("password"),
    username: text("username"),
    remember: boolean("remember").default(false),
    isactive: boolean("isactive").default(true),
    isverified: boolean("isverified").default(false),
    createdat: date("createdat").default(new Date().toISOString()),
    updatedat: date("updatedat").default(new Date().toISOString()),
  });
  
  export const mySchemaTodo = pgTable("todo", {
    id: serial("id").primaryKey(),
    title: text("title"),
    status: boolean("status").default(false),
    userId: integer("user_id").references(() => mySchemaUsers.id),
    createdat: date("createdat").default(new Date().toISOString()),
    updatedat: date("updatedat").default(new Date().toISOString()),
  });