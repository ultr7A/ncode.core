CREATE TABLE Instruction (
    id serial PRIMARY KEY,
    
    domain_id      int,
    range_id       int,
    FOREIGN KEY (domain_id) REFERENCES Domain(id),
    FOREIGN KEY (range_id)  REFERENCES Range(id)
);