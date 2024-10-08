
class HashTable {
    constructor(size = 11) {
        this.size = size;
        this.buckets = new Array(size);
    }

    // Função de hash simples para strings
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }

    // Método para adicionar um par chave-valor à tabela
    set(key, value) {
        if (this.count / this.size > 0.7) { // fator de carga para rehash
            this.rehash();
        }
    
        const index = this.hash(key);
        let position = index;
    
        // Tratamento de colisões
        while (this.buckets[position] !== undefined && this.buckets[position][0] !== key) {
            position = (position + 1) % this.size;
        }
    
        // Adicionar ou atualizar o par chave-valor
        if (this.buckets[position] === undefined) {
            this.count++;
        }
        this.buckets[position] = [key, value];
        console.log(`Salvando ${key}: ${value} na posição ${position}`);
    }

    // Método para buscar um valor na tabela por chave
    get(key) {
        const index = this.hash(key);
        let position = index;
        while (this.buckets[position] !== undefined) {
            if (this.buckets[position][0] === key) {
                return this.buckets[position][1];
            }
            position = (position + 1) % this.size;
            if (position === index) {
                break; // Chave não encontrada
            }
        }
        return null; // Chave não encontrada
    }

    // Método para rehash
    rehash() {
        const newSize = this.size * 2;
        const newBuckets = new Array(newSize);
        this.buckets.forEach(bucket => {
            if (bucket) {
                const [key, value] = bucket;
                const newIndex = this.hash(key) % newSize;
                if (!newBuckets[newIndex]) {
                    newBuckets[newIndex] = [key, value];
                } else {
                    let position = newIndex;
                    while (newBuckets[position] !== undefined) {
                        position = (position + 1) % newSize;
                    }
                    newBuckets[position] = [key, value];
                }
            }
        });
        this.buckets = newBuckets;
        this.size = newSize;
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = HashTable;
} else {
    window.HashTable = HashTable;
}