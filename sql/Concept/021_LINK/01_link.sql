CREATE TABLE Link (
    id          serial  PRIMARY KEY,
    from        int     NOT NULL.
    to          int     NOT NULL,
    domain_id   int,
    range_id    int,


    FOREIGN KEY (from)      REFERENCES __(from),
    FOREIGN KEY (to)        REFERENCES __(to),
    FOREIGN KEY (domain_id) REFERENCES Domain(id),
    FOREIGN KEY (range_id)  REFERENCES Range(id)
);