const Task = require('../models/Task');
let message = "";
let type = "";



const getAllTasks = async (req, res) => {//modulo criado 
    try {
        setTimeout(() => { message = "" }, 2000);
        const taskList = await Task.find();
        console.log(taskList);
        return res.render("index", {
            taskList,
            task: null,
            taskDelete: null,
            message,
            type
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const createTask = async (req, res) => {
    const task = req.body;

    if (!task.task) {
        message = "insrira um texto , antes de adicionar a tarefa!";
        type = "danger";
        return res.redirect("/");
    }

    try {
        await Task.create(task);
        message = "Tarefa criada com sucesso!";
        type = "success";
        return res.redirect("/");
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const getById = async (req, res) => {
    // Função assíncrona que recupera uma tarefa específica pelo ID fornecido na rota.
    try {
        // Busca todas as tarefas no banco de dados e armazena na variável `taskList`.
        const taskList = await Task.find();

        // Verifica o método passado como parâmetro na rota.
        if (req.params.method == "update") {
            // Se o método for "update", busca a tarefa específica pelo ID.
            const task = await Task.findOne({ _id: req.params.id });
            // Renderiza a página "index" passando a tarefa encontrada para atualização, 
            // e a lista completa de tarefas. A variável `taskDelete` é definida como null, 
            // pois não há exclusão a ser feita nesta operação.
            res.render("index", { task, taskDelete: null, taskList, message, type });
        } else {
            // Caso contrário, se o método não for "update", assume-se que é para exclusão.
            // Busca a tarefa específica pelo ID para exclusão.
            const taskDelete = await Task.findOne({ _id: req.params.id });
            // Renderiza a página "index" passando a tarefa encontrada para exclusão, 
            // e a lista completa de tarefas. A variável `task` é definida como null,
            // pois não há atualização a ser feita nesta operação.
            res.render("index", { task: null, taskDelete, taskList, message, type });
        }

    } catch (err) {
        // Se ocorrer algum erro durante o processo, retorna uma resposta de erro com status 500
        // e envia a mensagem de erro ao cliente.
        res.status(500).send({ error: err.message });
    }
};

const updateOneTask = async (req, res) => {//os parametros da requisição , precisão estar na ordem correta
    try {
        const task = req.body;
        await Task.updateOne({ _id: req.params.id }, task);
        message = "Tarefa atualizada com suc!";
        type = "success";
        res.redirect("/");//redireciona para página da lista de tarefas
        return console.log("Tarefa atualizada com sucesso!")
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

const deleteOneTask = async (req, res) => {
    try {
        // Tenta deletar a tarefa com base no ID fornecido nos parâmetros da requisição.
        await Task.deleteOne({ _id: req.params.id });

        // Define uma mensagem de sucesso e um tipo de notificação.
        message = "Tarefa apagada com sucesso!";
        type = "success";

        // Redireciona o usuário de volta para a página principal, onde a lista de tarefas é exibida.
        res.redirect("/");

        // Loga uma mensagem no console indicando que a tarefa foi excluída com sucesso.
        return console.log("Tarefa excluida com sucesso!");

    } catch (err) {
        // Se ocorrer um erro durante o processo de exclusão, responde com um status 500 (Internal Server Error)
        // e envia uma mensagem de erro ao cliente.
        res.status(500).send({ error: err.message });
    }
}


const taskCheck = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });

        task.check ? task.check = false : task.check = true;

        /*  if (task.check) {
              task.check = false;
  
          } else {
              task.check = true;
          }
  */
        await Task.updateOne({ _id: req.params.id }, task);
        res.redirect("/");
    } catch (error) {
        res.status(500).send({ error: err.message });
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getById,
    updateOneTask,//necessário a virgula no ultima função
    deleteOneTask,
    taskCheck,
};