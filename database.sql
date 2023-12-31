CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "pco_id" VARCHAR (255) NOT NULL,
    "username" VARCHAR (255) NOT NULL,
    "avatar" VARCHAR (255) NOT NULL,
    "balance" INT NOT NULL,
    "admin" BOOLEAN NOT NULL
);


CREATE TABLE "awarded" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users" NOT NULL,
    "awarded_value" INT NOT NULL,
    "service_id" INT,
    "award_description" VARCHAR (255) NOT NULL,
    "timestamp" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "reward_categories" (
    "id" SERIAL PRIMARY KEY,
    "reward_category" VARCHAR (255) NOT NULL,
    "category_active" BOOLEAN NOT NULL
);

CREATE TABLE "rewards" (
    "id" SERIAL PRIMARY KEY,
    "reward_title" VARCHAR (255) NOT NULL,
    "reward_value" INT NOT NULL,
    "category_id" INT REFERENCES "reward_categories",
    "reward_description" VARCHAR (255),
    "reward_image" VARCHAR (255),
    "reward_active" BOOLEAN NOT NULL,
    "reward_count" INT NOT NULL
);

CREATE TABLE "redeemed" (
    "id" SERIAL PRIMARY KEY,
    "complete" BOOLEAN NOT NULL,
    "user_id" INT REFERENCES "users" NOT NULL,
    "reward_id" INT REFERENCES "rewards" ,
    "redeemed_value" INT NOT NULL,
    "timestamp" TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO "reward_categories" (id, reward_category, category_active)
VALUES (0, 'aux', FALSE);

INSERT INTO "rewards" (id, reward_title, reward_value, reward_active, reward_count)
VALUES (0, 'Gift', 0, FALSE, 0);





