CREATE TABLE Principle (
    id      serial PRIMARY KEY,
    name    varchar(128), 
    

    concept_id     int,
    domain_id      int,
    range_id       int,
    
    FOREIGN KEY (concept_id) REFERENCES Concept(id),
    FOREIGN KEY (domain_id)  REFERENCES Domain(id),
    FOREIGN KEY (range_id)   REFERENCES Range(id)
);