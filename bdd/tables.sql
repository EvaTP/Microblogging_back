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

CREATE TABLE comments (
 "id" SERIAL PRIMARY KEY,
 "comment" TEXT NO NULL,
 "user_id" INT NOT NULL,
 "post_id" INT NOT NULL,
CONSTRAINT fk_comments FOREIGN KEY (user_id) REFERENCES users(id),
CONSTRAINT fk_comments_post FOREIGN KEY (post_id) REFERENCES posts(id)
)

CREATE TABLE likes (
 "id" SERIAL PRIMARY KEY,
 "user_id" INT NOT NULL,
 "post_id" INT NOT NULL,
CONSTRAINT fk_likes FOREIGN KEY (user_id) REFERENCES users(id),
CONSTRAINT fk_likes_post FOREIGN KEY (post_id) REFERENCES posts(id)
)



