CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"password" text,
	"username" text,
	"isactive" boolean DEFAULT true,
	"isverified" boolean DEFAULT false,
	"createdat" date DEFAULT '2024-07-21T11:31:39.955Z',
	"updatedat" date DEFAULT '2024-07-21T11:31:39.956Z'
);
--> statement-breakpoint
ALTER TABLE "todo" ALTER COLUMN "createdat" SET DEFAULT '2024-07-21T11:31:39.958Z';--> statement-breakpoint
ALTER TABLE "todo" ALTER COLUMN "updatedat" SET DEFAULT '2024-07-21T11:31:39.958Z';