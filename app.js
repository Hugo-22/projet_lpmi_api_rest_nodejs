const express = require('express')
const morgan = require('morgan')
const mysql = require('promise-mysql')
const config = require('./app/db')

mysql.createConnection(config.database).then(db => {

    const app = express()
    const router = express.Router()
    const Player = require('./app/Model/Player')(db)
    const Game = require('./app/Model/Game')(db)
    const GameScore = require('./app/Model/GameScore')(db)
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(morgan("dev"))

    // Routes pour la gestion du model Player
    router.get('/players', async (req, res) => {
        try {
            const players = await Player.findAll()
            res.json(players)
        } catch (error) {
            res.json(error.message)
        }
    })

    router.get('/player/:id', async (req, res) => {
        try {
            const player = await Player.findOne(req.params.id)
            res.json(player)
        } catch (error) {
            res.json(error.message)
        }
    })
    router.post('/player', async (req, res) => {
        try {
            await Player.create(req.body.nom, req.body.prenom, new Date())
            res.json('Joueur ajouté avec succès.')
        } catch (error) {
            res.json(error.message)
        }
    })
    router.put('/player/:id', async (req, res) => {
        try {
            await Player.update(req.body.nom, req.body.prenom, req.params.id)
            const playerUpdated = await Player.findOne(req.params.id)
            res.json(playerUpdated)
        } catch (error) {
            res.json(error.message)
        }
    })
    router.delete('/player/:id', async (req, res) => {
        try {
            await Player.delete(req.params.id)
            res.json('Le joueur à été supprimé avec succès.')
        } catch (error) {
            res.json(error.message)
        }
    })

    // Routes pour la gestion du model Game
    router.get('/games', async (req, res) => {
        try {
            const games = await Game.findAll()
            res.json(games)
        } catch (error) {
            res.json(error.message)
        }
    })
    router.get('/game/:id', async (req, res) => {
        try {
            const game = await Game.findOne(req.params.id)
            res.json(game)
        } catch (error) {
            res.json(error.message)
        }
    })
    router.post('/game', async (req, res) => {
        try {
            await Game.create(req.body.nom, req.body.categorie)
            res.json('Jeu ajouté avec succès.')
        } catch (error) {
            res.json(error.message)
        }
    })
    router.put('/game/:id', async (req, res) => {
        try {
            await Game.update(req.body.nom, req.body.categorie, req.params.id)
            const gameUpdated = await Game.findOne(req.params.id)
            res.json(gameUpdated)
        } catch (error) {
            res.json(error.message)
        }
    })
    router.delete('/game/:id', async (req, res) => {
        try {
            await Game.delete(req.params.id)
            res.json('Le jeu à été supprimé avec succès.')
        } catch (error) {
            res.json(error.message)
        }
    })

    // Routes pour la gestion du model GameScore
    router.get('/games_score', async (req, res) => {
        try {
            const gamesScore = await GameScore.findAll()
            res.json(gamesScore)
        } catch (error) {
            res.json(error.message)
        }
    })
    router.get('/games_score/:id', async (req, res) => {
        try {
            const gameScore = await GameScore.findOne(req.params.id)
            res.json(gameScore)
        } catch (error) {
            res.json(error.message)
        }
    })
    router.post('/games_score/new', async (req, res) => {
        try {
            await GameScore.create(req.body.id_player1, req.body.id_player2, req.body.id_game, req.body.score_player1, req.body.score_player2, new Date())
            res.json('Score ajouté avec succès.')
        } catch (error) {
            res.json(error.message)
        }
    })
    router.put('/games_score/update/:id', async (req, res) => {
        try {
            await GameScore.update(req.body.id_player1, req.body.id_player2, req.body.id_game, req.body.score_player1, req.body.score_player2, req.params.id)
            const gameScoreUpdated = await GameScore.findOne(req.params.id)
            res.json(gameScoreUpdated)
        } catch (error) {
            res.json(error.message)
        }
    })
    router.delete('/games_score/delete/:id', async (req, res) => {
        try {

            await GameScore.delete(req.params.id)
            res.json('Score supprimé avec succès.')
        } catch (error) {
            res.json(error.message)
        }
    })

    app.use(router)
    app.listen(3000)
})