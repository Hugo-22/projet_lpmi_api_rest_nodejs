let connection

module.exports = (_connection) => {
    connection = _connection
    return GameScore
}

let GameScore = class {

    static findAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM game_score')
                .then(res => resolve(res))
                .catch(err => reject(err))

        })
    }
    static findOne(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM game_score WHERE id_score = ?', [id])
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
    static create(id_player1, id_player2, id_game, score_player1, score_player2, date) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO game_score (id_player1, id_player2, id_game, score_player1, score_player2, date) VALUES (?,?,?,?,?,?,?)', [id_player1, id_player2, id_game, score_player1, score_player2, date])
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
    static update(id_player1, id_player2, id_game, score_player1, score_player2, id) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE game_score SET id_player1 = ?, id_player2 = ?, id_game = ?, score_player1 = ?, score_player2 = ? WHERE id_score = ?', [id_player1, id_player2, id_game, score_player1, score_player2, id])
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
    static delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM game_score WHERE id_score = ?', [id])
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
}
