CREATE TABLE public.livro
(
    id serial NOT NULL,
    titulo character varying(255) NOT NULL,
    capa character varying(255),
	PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.livro
    OWNER to postgres;

INSERT INTO livro(titulo,capa)
VALUES('D&D 5e Livro do Jogador','https://m.media-amazon.com/images/I/81ArTijyh0L._AC_SL1500_.jpg');

select * from livro