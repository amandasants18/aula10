const movies = require("../models/filmes.json") // importando meu arquivo json dos filmes (que nesse projeto, são os meus dados)

// definir uma rota padrão
const home = (request, response) => {
    response.status(200).send(
        {
            "message": "Olá pessoa, seja bem vinda ao {reprograma}flix <3 <3 <3"
        }
    )
};

const getAll = (request, response) => {
    response.status(200).send(movies);
};

const getById = (request, response) => {
    // id solicitado na requição (request)
    const requestedId = request.params.id;

    // find((elemento) => elemento + a lógica)
    const filteredId = movies.find(movie => movie.id == requestedId);

    //enviar reposta
    response.status(200).send(filteredId);
}

const getByTitle = (request, response) => {
    // acessando o título solicitado na request
    const requestedTitle = request.query.title.toLowerCase()

    // filtrar os títulos do json
    const filteredTitle = movies.find(movie => movie.title.toLowerCase().includes(requestedTitle))

    // adicionar um condição para retornar o título
    if (requestedTitle === "" || filteredTitle === undefined) {
        response.status(404).send({
            "message": "Por favor, insira um título válido."
        })
    } else {
        response.status(200).send(filteredTitle)
    }
};

// pesquisa por gênero
const getByGenre = (request, response) => {
    // acessar qual o gênero requisitado
    const requestedGenre = request.query.genre;
    // criar lista para armazenar dados do loop
    let movieList = [];

    // comparar todos os itens da lista que são daquele gênero
    movies.forEach(movie => {
        // separar elementos
        let genreList = movie.genre.split(",")

        for (genre of genreList) {
            if (genre.includes(requestedGenre)) {
                console.log(movie)
                movieList.push(movie)
            }
        }

    })

    // retornar a resposta
    response.status(200).send(movieList)
}

const creatMovie = (req, res) =>{

    let requestedId = req.body.id;
    let requestedTitle = req.body.titulo;
    let requestedYear = req.body.year;
    let requestedRated = req.body.rated;
    let requestedReleased = req.body.released;
    let requestedRuntime = req.body.tempo;
    let requestedGenre = req.body.genero;
    let requestedDirector = req.body.diretor;
    let requestedWriter = req.body.writer;
    let requestedActors = req.body.atores;
    let requestedPlot = req.body.resumo;
    let requestedLanguage = req.body.lingua;
    let requestedCountry = req.body.pais;
    let requestedAwards = req.body.indicacao;
    
    

    let newMovie = {
        "id": requestedId,
        "title": requestedTitle,
        "year": requestedYear,
        "rated":requestedRated,
        "released": requestedReleased,
        "runtime": requestedRuntime,
        "genre": requestedGenre,
        "director": requestedDirector,
        "writer": requestedWriter,
        "actors": requestedActors,
        "plot": requestedPlot,
        "language": requestedLanguage,
        "country": requestedCountry,
        "awards": requestedAwards
    };

    filmesJason.push(newMovie);

    res.status(201).send({
        "message": "Novo filme inserido com sucesso",
        newMovie
    });

};

const replaceMovies = (req, res) =>{
    let requestedId = req.params.id;
    
    let movieFromBody = req.body;
    let filteredMovie = postsJason.find(movie=>movie.id == requestedId);

    let updatedMovie = {
        "id": filteredMovie.id,
        "year": filteredYear.year,
        "titulo": movieFromBody.titulo,
        "plot": plotFromBody.plot,
        
    }

    const indice = moviesJason.indexOf(filteredMovie);

    movieJason.splice(indice, 1, movieFromBody);
    res.status(200).send({
        "Message": "Informações substituidas com sucesso",
        updatedMovie
    })

}

const updateLanguage = (req, res)=>{

    let requestedId = req.params.id;
    let newLanguage = req.body.language;
    
    let filteredLingua = movieJason.find(movie=>movie.id == requestedId);

    filteredMovie.language = newLanguage;

    res.status(200).send({
        "Message": "Linguagem atualizada com sucesso",
        filteredLingua
    });


}

module.exports = {
    home,
    getAll,
    getById,
    getByTitle,
    getByGenre,
    creatMovie,
    //deleteMovie,
    replaceMovies,
    updateLanguage

}
