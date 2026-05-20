CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE historico (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    expressao VARCHAR(255) NOT NULL,
    resultado VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
