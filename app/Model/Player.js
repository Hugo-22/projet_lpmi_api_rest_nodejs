let connection

module.exports = (_connection) => {
    connection = _connection
    return Player
}

let Player = class {

    static findAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM player')
                .then(res => resolve(res))
                .catch(err => reject(err))

        })
    }
    static findOne(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM player WHERE id_player = ?', [id])
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
    static create(nom, prenom, date) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO player (nom, prenom, date_enregistrement) VALUES (?,?,?)', [nom, prenom, date])
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
    static update(nom, prenom, id) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE player SET nom = ?, prenom = ? WHERE id_player = ?', [nom, prenom, id])
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
    static delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM player WHERE id_player = ?', [id])
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
}
