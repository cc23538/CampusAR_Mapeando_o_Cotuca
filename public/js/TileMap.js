export class TileMap {
    constructor(tileSize, mapMatrix) {
        this.tileSize = tileSize;
        this.mapMatrix = mapMatrix;
    }

    // Verifica se há colisão em uma posição específica
    isColliding(x, y) {
        const col = Math.floor(x / this.tileSize);
        const row = Math.floor(y / this.tileSize);
        
        // Verifica se a posição está dentro dos limites do mapa
        if (col < 0 || col >= this.mapMatrix[0].length || row < 0 || row >= this.mapMatrix.length) {
            return true; // Fora dos limites do mapa, trata como colisão
        }
        
        return this.mapMatrix[row][col] === 1; // Retorna verdadeiro se for uma área não passável
    }

    // Função para carregar diferentes cenários (mapas)
    static loadScenario(scenarioNumber) {
        switch (scenarioNumber) {
            case '1':
                return new TileMap(50, [
                    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
                    [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
                ]);
            case '2':
                return new TileMap(50, [
                    // Adicione a matriz específica para o cenário 2
                ]);
            default:
                return new TileMap(50, [
                    // Adicione uma matriz padrão se nenhum cenário for especificado
                ]);
        }
    }
}