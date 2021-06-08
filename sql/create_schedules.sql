DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL, 
    day integer NOT NULL CHECK (day >= 1 AND day <= 7),
    start_at TIME NOT NULL,
    end_at TIME NOT NULL
);