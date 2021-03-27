let connection

module.exports = (_connection) => {
    connection = _connection
    return Game
}

let Game = class {

    static findAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM game')
                .then(res => resolve(res))
                .catch(err => reject(err))

        })
    }
    static findOne(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM game WHERE id_game = ?', [id])
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
    static create(nom, categorie) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO game (nom, categorie) VALUES (?,?)', [nom, categorie])
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
    static update(nom, prenom, id) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE game SET nom = ?, categorie = ? WHERE id_game = ?', [nom, prenom, id])
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
    static delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM game WHERE id_game = ?', [id])
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
}
