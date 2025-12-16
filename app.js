import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const PORT =  process.env.PORT ?? 1234
const app = express()
app.use(json())
app.disable('x-powered-by')

app.use(corsMiddleware())

app.get('/', (req, res) => {
    res.json({
        name: 'API REST de Películas',
        description: 'Proyecto educativo con Node.js y Express',
        endpoints: {
        getAll: {
            method: 'GET',
            path: '/movies',
            example: '/movies/?genre=drama'
        },
        getById: {
            method: 'GET',
            path: '/movies/:id',
            example: '/movies/c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf',
            idFormat: 'UUID'
        },
        create: {
            method: 'POST',
            path: '/movies'
        },
        update: {
            method: 'PATCH',
            path: '/movies/:id',
            example: '/movies/c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf',
            idFormat: 'UUID'
        },
        delete: {
            method: 'DELETE',
            path: '/movies/:id',
            example: '/movies/c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf',
            idFormat: 'UUID'
        }
        }
    })
})

app.use('/movies', moviesRouter)

app.listen(PORT, ()=>{
    console.log(`Server listening on port  http://localhost:${PORT}`)
})