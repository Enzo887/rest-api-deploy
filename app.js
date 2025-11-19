import express, { json } from 'express'
import { randomUUID } from 'crypto'
import cors from 'cors'
import movies from './movies.json'
import { validateMovie, validatePartialMovie } from './schemas/movies'

const PORT =  process.env.PORT ?? 1234
const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.use(cors({
    origin: (origin, callback)=>{
        const ACCEPTED_ORIGINS = [
            'http://127.0.0.1:5500',
            'http://localhost:5500',
            'http://localhost:5501',
            'http://localhost:5502'
        ]

        if(ACCEPTED_ORIGINS.includes(origin)){
            return callback(null, true)
        }
        if(!origin){
            return callback(null, true)
        }
        return callback(new Error('Origen no permitido'))
    }
}))


const movies = require('./movies.json')
const PORT =  process.env.PORT ?? 1234
const {validateMovie, validatePartialMovie} = require('./schemas/movies')



app.get('/movies/:id', (req, res) =>{
    const {id} = req.params
    const movieFiltrada = movies.find(movie => movie.id === id)
    if(movieFiltrada){
        return res.json(movieFiltrada)
    }
    res.status(404).json({ message: 'No se encontro la peli' })
})

app.get('/movies', (req, res) =>{
    const {genre} = req.query
    if(genre){
        const movieFiltrada = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
        res.json(movieFiltrada)    
    }
    
    res.json(movies)
})

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)

    if(!result.success){
        res.status(404).json({ message: 'No se pudo crear la peli'})
    }

    const nuevaPeli = {
        id: crypto.randomUUID(),
        ...result.data
    }

    movies.push(nuevaPeli)
    res.json(movies)
})

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)
    if(!result.success){
        return res.status(404).json({ message: 'errorcito uwu'})
    }

    const {id} = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if(movieIndex === -1){
        return res.status(404).json({ message:'No se encontro la pelicula' })
    } 
    const peliCambiada = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = peliCambiada

    return res.json(peliCambiada)
})

app.delete('/movies/:id', (req, res) => {
    const {id} = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if(movieIndex === -1){
        return res.status(404).json({ message:'No se encontro la pelicula' })
    }
    movies.splice(movieIndex, 1)
    return res.status(204).json({message: 'Pelicula eliminada con exito'})
})

app.listen(PORT, ()=>{
    console.log(`Server listening on port  http://localhost:${PORT}`)
})