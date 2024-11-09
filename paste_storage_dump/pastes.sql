CREATE TABLE pastes (
    paste_id varchar(255) not null,
    user_id varchar(255) not null,
    title varchar(255) not null,
    paste_text text not null,
    creation_date timestamp not null,
    expiration_date timestamp not null,
    private boolean not null,
    index(user_id),
    primary key (paste_id)
);
