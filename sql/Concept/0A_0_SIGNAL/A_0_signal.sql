CREATE TABLE Signal (
    id      serial            PRIMARY KEY,
    time    integer           NOT NULL,
    value   integer
    buffer  varchar (4096),
    channel boolean           NOT NULL,
    domain  varchar (128),
    range   varchar (128)
);