-- users

CREATE TABLE users (
    "id" SERIAL PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
	"status_id" TEXT NOT NULL,
	"user_biography" TEXT,
    "created_at" timestamp NOT NULL DEFAULT (now()),
    "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE posts (
"id" SERIAL PRIMARY KEY,
"description" TEXT NOT NULL,
"url_picture" TEXT,
"hashtags" TEXT,
"user_id" INT,
"created_at" timestamp NOT NULL DEFAULT (now()),
"updated_at" timestamp NOT NULL DEFAULT (now())
CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id)
)

CREATE TABLE reactions(
 "id" SERIAL PRIMARY KEY,
 "comments" TEXT,
 "like" INT,
 "user_id" INT,
CONSTRAINT fk_reaction FOREIGN KEY (user_id) REFERENCES users(user_id)
)

CREATE TABLE status(
"id" SERIAL PRIMARY KEY,
"role" TEXT
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES users(status_id)
)