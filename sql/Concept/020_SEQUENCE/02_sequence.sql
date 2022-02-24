CREATE TABLE Sequence (
    id                      serial PRIMARY KEY,
    elements__table_name    varchar(128),

    domain_id               int,
    range_id    int,
    FOREIGN KEY (domain_id) REFERENCES Domain(id),
    FOREIGN KEY (range_id)  REFERENCES Range(id)
);