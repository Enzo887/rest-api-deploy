import z from 'zod'

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: "El nombre de la pelicula debe ser un string",
        require_error: "El nombre de la pelicula es requerido"
    }),
    year: z.number().int().min(1900).max(2026),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.url({
        message: 'El poster debe tener una url valida'
    }),
    genre: z.array(
        z.enum(['Action', 'Adventure','Crime', 'Comedy', 'Drama', 'Fantasy', 'Horro', 'Thriller', 'Sci-Fi']),{
            required_error: "Es requerido",
            invalid_type_error: "Debe ser un array de enum"
        }
    )
})

export function validateMovie(object){
    return movieSchema.safeParse(object)
    // midu recomienda este, devuelve un objeto result si hay error o hay datos
}

export function validatePartialMovie(input){
    //partial lo que hace es que PONE A TODOS LOS DATOS COMO OPCIONALES, es decir, si el dato esta lo va a validar, y en caso de que no, como es opicional, lo ignora y sigue con lo demas, no pasa nadap.
    return movieSchema.partial().safeParse(input)
}

