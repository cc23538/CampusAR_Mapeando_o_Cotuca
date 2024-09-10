
INSERT INTO Usuarios (nome, email, usuario, senha)
	VALUES ('teste', 'teste@g.unicamp.br', 'teste', 'teste');

SET @usuario_id = LAST_INSERT_ID();


INSERT INTO Eventos (titulo, descricao, data_inicio, data_fim, localizacao, criador_id, imagem)
	VALUES ('Evento de Realidade Aumentada', 'Evento para explorar o Campus com RA.', '2024-09-10 10:00:00', '2024-09-10 12:00:00', 'Prédio Principal', @usuario_id, 'imagem_evento.jpg');

SET @evento_id = LAST_INSERT_ID();


INSERT INTO Tags (nome)
	VALUES ('Realidade Aumentada'), ('Educação'), ('Tecnologia');

SET @tag_ra = (SELECT id FROM Tags WHERE nome = 'Realidade Aumentada');
SET @tag_edu = (SELECT id FROM Tags WHERE nome = 'Educação');


INSERT INTO Evento_Tags (evento_id, tag_id)
	VALUES (@evento_id, @tag_ra), (@evento_id, @tag_edu);


INSERT INTO Participações (evento_id, usuario_id, status)
	VALUES (@evento_id, @usuario_id, 'confirmado');


INSERT INTO Usuarios (nome, email, usuario, senha)
	VALUES ('Outro Usuário', 'outro@exemplo.com', 'outra', 'senha_secreta');

SET @usuario2_id = LAST_INSERT_ID();


INSERT INTO Amizades (usuario1_id, usuario2_id, status, data_solicitacao)
	VALUES (@usuario_id, @usuario2_id, 'aceita', '2024-08-01 12:00:00');


INSERT INTO Notificações (usuario_id, tipo, conteudo)
	VALUES (@usuario_id, 'evento', 'Você foi convidada para um evento de Realidade Aumentada.');


INSERT INTO Histórico_Ações (usuario_id, ação)
	VALUES (@usuario_id, 'Criou um evento de Realidade Aumentada');


INSERT INTO Configurações_Usuário (usuario_id, chave, valor)
	VALUES (@usuario_id, 'tema', 'escuro');


INSERT INTO Arquivos (usuario_id, nome_arquivo, tipo_arquivo, caminho)
	VALUES (@usuario_id, 'tutorial.pdf', 'documento', '/arquivos/tutorial.pdf');


INSERT INTO Feedback (usuario_id, tipo, mensagem)
	VALUES (@usuario_id, 'sugestão', 'Adicionar mais interatividade ao mapa.');


INSERT INTO Eventos_Repetitivos (evento_id, frequência)
	VALUES (@evento_id, 'mensal');


INSERT INTO NPCs (nome, tipo, localizacao_x, localizacao_y, imagem, descricao)
	VALUES ('Guia do Campus', 'informativo', 10, 20, 'guia.png', 'NPC que oferece informações sobre o campus.');

SET @npc_id = LAST_INSERT_ID();


INSERT INTO Interações (npc_id, tipo, texto)
	VALUES (@npc_id, 'informativo', 'Bem-vindo ao Campus AR!');


INSERT INTO Quests (npc_id, titulo, descricao, recompensa, status)
	VALUES (@npc_id, 'Descubra o Prédio Principal', 'Encontre o prédio principal do campus.','200 pontos de experiência', 'pendente');

SET @quest_id = LAST_INSERT_ID();


INSERT INTO Progresso_Usuario (usuario_id, quest_id, status)
	VALUES (@usuario_id, @quest_id, 'em andamento');


INSERT INTO Itens (nome, descricao, tipo, localizacao_x, localizacao_y)
	VALUES ('Mapa do Campus', 'Um mapa detalhado do campus.', 'colecionável', 15, 25);

INSERT INTO Locais (nome, descricao, tipo, coordenadas_x, coordenadas_y)
	VALUES ('Prédio Principal', 'O principal prédio do campus.', 'prédio', 30, 40);
