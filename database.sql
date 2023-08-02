CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "pco_id" VARCHAR (255) NOT NULL,
    "username" VARCHAR (255) NOT NULL,
    "balance" INT NOT NULL
);
CREATE TABLE "awarded" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users" NOT NULL,
    "awarded_value" INT NOT NULL,
    "date" DATE NOT NULL
);

CREATE TABLE "reward_categories" (
    "id" SERIAL PRIMARY KEY,
    "reward_category" VARCHAR (255) NOT NULL
);

CREATE TABLE "rewards" (
    "id" SERIAL PRIMARY KEY,
    "reward_title" VARCHAR (255) NOT NULL,
    "reward_value" INT NOT NULL,
    "category_id" INT REFERENCES "reward_categories" NOT NULL,
    "reward_description" VARCHAR (255) 
);

CREATE TABLE "redemptions" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users" NOT NULL,
    "reward_id" INT REFERENCES "rewards" NOT NULL,
    "redeemed_value" INT NOT NULL,
    "date" DATE NOT NULL
);



