CREATE TABLE Concept (
    id      serial PRIMARY KEY,
    name    varchar(128), 
    
    system_id      int,
    domain_id      int,
    range_id       int,
    FOREIGN KEY (system_id) REFERENCES System(id),
    FOREIGN KEY (domain_id) REFERENCES Domain(id),
    FOREIGN KEY (range_id)  REFERENCES Range(id)
);