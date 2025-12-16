import { MovieModel } from "../models/movie.js"
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
export class MovieController{
    static async getAll(req, res){
        try {
            const {genre} = req.query
            const movies = await MovieModel.getAll({genre})
            res.json(movies)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    
    }

    static async getById(req, res){
        const {id} = req.params
        const movieFiltrada = await MovieModel.getById({id})
        if(movieFiltrada){
            return res.json(movieFiltrada)
        }
        res.status(404).json({ message: 'No se encontro la peli' })
    }

    static async create(req, res){
        const result = validateMovie(req.body)
        if(!result.success){
            res.status(404).json({ message: 'No se pudo crear la peli'})
        }
        const newMovie = await MovieModel.create({input: result.data})
        res.status(201).json(newMovie)
    }

    static async delete(req, res){
        const {id} = req.params
    
        const result = await MovieModel.delete({id})
        if(result === false){
            return res.status(404).json({ message:'No se encontro la pelicula' })
        }
        return res.status(204).json({message: 'Pelicula eliminada con exito'})
    }

    static async patch(req, res){
    const result = validatePartialMovie(req.body)
    const { id } = req.params
    if(!result.success){
        return res.status(404).json({ message: 'errorcito uwu'})
    }

    const updatedMovie = await MovieModel.patch({id, input:result.data})

    return res.json(updatedMovie)
}
}
