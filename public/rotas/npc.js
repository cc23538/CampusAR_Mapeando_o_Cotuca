

app.get('/api/dialogues/:npcId', (req, res) => {
    const npcId = req.params.npcId;
    connection.query('SELECT dialogos FROM Dialogos WHERE npc_id = ?', [npcId], (error, results) => {
        if (error) {
            res.status(500).send('Erro ao consultar o banco de dados');
            return;
        }
        const dialogues = results.map(row => row.dialogue);
        res.json(dialogues);
    });
});