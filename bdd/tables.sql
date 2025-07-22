CREATE TABLE status(
"id" SERIAL PRIMARY KEY,
"role" TEXT,
role_id INTEGER,
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES users(id)
)

CREATE TABLE users (
    "id" SERIAL PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
	"status_id" INT NOT NULL,
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
"updated_at" timestamp NOT NULL DEFAULT (now()),
CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
)

CREATE TABLE reactions(
 "id" SERIAL PRIMARY KEY,
 "comments" TEXT,
 "like" INT,
 "user_id" INT NOT NULL,
 "post_id" INT NOT NULL,
CONSTRAINT fk_reaction FOREIGN KEY (user_id) REFERENCES users(id),
CONSTRAINT fk_reaction_post FOREIGN KEY (post_id) REFERENCES posts (id)
)

