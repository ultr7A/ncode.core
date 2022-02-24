CREATE TABLE PrefixStructure (
    id          serial PRIMARY KEY,
    
    right       integer,
    operator    integer,

    domain_id      int,
    range_id       int,

    FOREIGN KEY (operator)  REFERENCES Operator(id),
    FOREIGN KEY (right)     REFERENCES Expression(id),
    FOREIGN KEY (domain_id) REFERENCES Domain(id),
    FOREIGN KEY (range_id)  REFERENCES Range(id)
);