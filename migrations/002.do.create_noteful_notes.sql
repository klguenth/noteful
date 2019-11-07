CREATE TABLE noteful_notes (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    modified TIMESTAMP DEFAULT now() NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    content TEXT NOT NULL,
    folder_id INTEGER REFERENCE noteful_folders(id)
);