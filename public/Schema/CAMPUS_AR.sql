# cc23538 - Rafaela F. Dos Santos


DROP SCHEMA IF EXISTS CampusAR;
CREATE SCHEMA CampusAR;

USE CampusAR;



CREATE TABLE IF NOT EXISTS Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    usuario VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX (nome),
    INDEX (email),
    INDEX (usuario)
);

CREATE TABLE IF NOT EXISTS Jogadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    localizacao_x INT NOT NULL,  -- Coordenada X no jogo
    localizacao_y INT NOT NULL,  -- Coordenada Y no jogo
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    INDEX (usuario_id),
    INDEX (localizacao_x),
    INDEX (localizacao_y)
);

CREATE TABLE IF NOT EXISTS Amizades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario1_id INT,
    usuario2_id INT,
    status ENUM('solicitada', 'aceita', 'recusada', 'bloqueada') NOT NULL,
    data_solicitacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_aceite DATETIME,
    FOREIGN KEY (usuario1_id) REFERENCES Usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (usuario2_id) REFERENCES Usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    INDEX (usuario1_id),
    INDEX (usuario2_id),
    CONSTRAINT unique_amizade UNIQUE (usuario1_id, usuario2_id)
);

CREATE TABLE IF NOT EXISTS Mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    remetente_id INT,
    destinatario_id INT,
    conteudo TEXT NOT NULL,
    data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (remetente_id) REFERENCES Usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (destinatario_id) REFERENCES Usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    INDEX (remetente_id),
    INDEX (destinatario_id),
    INDEX (data_envio)
);

/*
CREATE TABLE IF NOT EXISTS Chamadas_Video (
    id INT AUTO_INCREMENT PRIMARY KEY,
    iniciador_id INT,
    participante_id INT,
    data_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_fim DATETIME,
    FOREIGN KEY (iniciador_id) REFERENCES Usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (participante_id) REFERENCES Usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    INDEX (iniciador_id),
    INDEX (participante_id),
    INDEX (data_inicio)
);*/

CREATE TABLE IF NOT EXISTS NPCs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo ENUM('tutorial', 'quest', 'loja', 'informativo') NOT NULL,
    localizacao_x INT NOT NULL,
    localizacao_y INT NOT NULL,
    descricao TEXT,
    INDEX (nome),
    INDEX (tipo),
    INDEX (localizacao_x),
    INDEX (localizacao_y)
);

CREATE TABLE IF NOT EXISTS Dialogos (
    id INT PRIMARY KEY,
    npc_id INT,
    dialogos TEXT,
    FOREIGN KEY (npc_id) REFERENCES npcs(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    INDEX (npc_id)
);

CREATE TABLE IF NOT EXISTS Notificacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    tipo ENUM('mensagem', 'amizade', 'sistema') NOT NULL,
    conteudo TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    INDEX (usuario_id),
    INDEX (tipo),
    INDEX (data_criacao)
);

-- Tabela de Progresso dos Usuários com NPCs
CREATE TABLE IF NOT EXISTS Progresso_Usuario (
    usuario_id INT,
    npc_id INT,
    progresso TEXT,
    PRIMARY KEY (usuario_id, npc_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (npc_id) REFERENCES NPCs(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    INDEX (usuario_id),
    INDEX (npc_id)
);
