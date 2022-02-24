CREATE TABLE Structure (
    id          serial PRIMARY KEY,

    left        int,   
    right       int,
    operator    int

    domain_id   int,
    range_id    int,

    FOREIGN KEY (left)      REFERENCES Expression(id),
    FOREIGN KEY (right)     REFERENCES Expression(id),
    FOREIGN KEY (operator)  REFERENCES Operator(id),
    
    FOREIGN KEY (domain_id) REFERENCES Domain(id),
    FOREIGN KEY (range_id)  REFERENCES Range(id)
);