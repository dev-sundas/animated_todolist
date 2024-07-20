
import {
    serial,
    text,
    pgTable,
    boolean,
    date,
  } from "drizzle-orm/pg-core";
  
  export const mySchemaTodo = pgTable("todo", {
    id: serial("id").primaryKey(),
    title: text("title"),
    status: boolean("status").default(true),
    createdat: date("createdat").default(new Date().toISOString()),
    updatedat: date("updatedat").default(new Date().toISOString()),
  });