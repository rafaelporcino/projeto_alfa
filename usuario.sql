CREATE TABLE public.usuario
(
    id serial NOT NULL,
    username character varying(255) NOT NULL,
    senha character varying(255) NOT NULL,
	UNIQUE(username),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.usuario
    OWNER to postgres;

INSERT INTO usuario(username,senha)
VALUES('Azenha','Azenha');

select * from usuario