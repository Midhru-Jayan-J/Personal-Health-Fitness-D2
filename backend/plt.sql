CREATE TABLE "USERS" (
    id           SERIAL PRIMARY KEY,
    username     VARCHAR(50) UNIQUE NOT NULL,
    firstname    VARCHAR(50) NOT NULL,
    lastname     VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    email        VARCHAR(100) UNIQUE NOT NULL,
    gender       VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    password     VARCHAR(255) NOT NULL,
    createdAt    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Trigger to update 'updatedAt' automatically
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_before_update
BEFORE UPDATE ON "USERS"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();




SELECT * FROM "USERS";


INSERT INTO "USERS" (username, firstname, lastname, phone_number, email, gender, password)
VALUES
    ('john_doe', 'John', 'Doe', '1234567890', 'john.doe@example.com', 'Male', 'hashed_password1'),
    ('jane_smith', 'Jane', 'Smith', '9876543210', 'jane.smith@example.com', 'Female', 'hashed_password2'),
    ('alex_lee', 'Alex', 'Lee', '5556667777', 'alex.lee@example.com', 'Other', 'hashed_password3'),
    ('emma_watson', 'Emma', 'Watson', '1122334455', 'emma.watson@example.com', 'Female', 'hashed_password4'),
    ('michael_scott', 'Michael', 'Scott', '9998887777', 'michael.scott@example.com', 'Male', 'hashed_password5');


