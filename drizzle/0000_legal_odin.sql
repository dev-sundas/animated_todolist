CREATE TABLE IF NOT EXISTS "todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"status" boolean DEFAULT true,
	"createdat" date DEFAULT '2024-07-17T09:49:48.809Z',
	"updatedat" date DEFAULT '2024-07-17T09:49:48.810Z'
);
