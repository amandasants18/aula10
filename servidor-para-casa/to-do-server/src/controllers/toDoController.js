const tasksJson = require("../models/tarefas.json");

const getAll = (request, response) => {
    response.status(200).send(tasksJson);
};

const getById = (request, response) => {
    const requiredId = request.params.id;
    const filteredTask = tasksJson.find(task => task.id == requiredId);

    response.status(200).send(filteredTask);
};

const createTask = (request, response) => {
    const requiredDescription = request.body.descricao;
    const requiredName = request.body.autor;

    const newTask = {
        id: Math.random().toString(32).substr(2, 9),
        dataInclusao: new Date(),
        concluido: false,
        descricao: requiredDescription,
        nomeColaborador: requiredName
    };

    tasksJson.push(newTask);

    response.status(200).send(newTask);
};

const deleteTask = (request, response) => {
    const requiredId = request.params.id;
    const filteredTask = tasksJson.find(task => task.id == requiredId);

    const indice = tasksJson.indexOf(filteredTask);
    tasksJson.splice(indice, 1);

    response.status(200).json([{
        "mensagem": "Tarefa deletada com sucesso",
        tasksJson
    }]);

};

const replaceTarefa = (req, res) =>{
    let requestedId = req.params.id;
    
    let tarefaFromBody = req.body;
    let filteredTarefa = postsJason.find(post=>post.id == requestedId);

    let updatedTarefa = {
        "id": filteredTarefa.id,
        "dataInclucao": filteredTarefa.dataInclusao,
        "concluido": tarefaFromBody.concluido,
        "descricao": tarefaFromBody.descricao,
        "nomeColaborador": tarefaFromBody.nomeColaborador
    }

    const indice = postsJason.indexOf(filteredTarefa);

    postsJason.splice(indice, 1, tarefaFromBody);
    res.status(200).send({
        "Message": "Tarefa substituida com sucesso",
        updatedTarefa
    })

}

const updateNome = (req, res)=>{


    let newName = req.body.newName;
    
    let filteredTarefa = postsJason.find(tarefa=>tarefa.nomeColaborador == newName);

    filteredTarefa.nome = newName;

    res.status(200).send({
        "Message": "Colaborador atualizado com sucesso",
        filteredTarefa
    });


}



module.exports = {
    getAll,
    getById,
    createTask,
    deleteTask,
    replaceTarefa,
    updateNome
}
