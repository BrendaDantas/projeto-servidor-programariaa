
const express = require("express") //iniciando o express
const router = express.Router() //e configurando a primeira parte da rota
const cors = require('cors') //trazendo o pacote cors que permite consumir essa api no front-end
const conectaBancoDeDados = require('./bancoDeDados') //ligando ao arquivo banco de dados

conectaBancoDeDados() //chamando a função que conecta o banco de dados
const Mulher = require('./mulherModel') //trazendo informações do modelmulher

const app = express() //iniciando o app 
app.use(express.json()) //libero json pra ser usado para trafego de dados na request
app.use(cors()) //liberando a api para ser usada a partir do front-end

const porta =  3333 //criando a porta

//GET
async function mostraMulheres(request, response) {
    try {
        //esperando a conexão e buscando todas as mulheres da minha lista de diva com o find() do mongoose
        const mulheresVindasDoBancoDeDados = await Mulher.find()  
        response.json(mulheresVindasDoBancoDeDados)     
    }
    catch(erro) {
        console.log(erro)
    }
    
}

//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher ({
        //eu quero pegar o nome(ex) quando alguém preencher o corpo da requisição na propriedade nome(ex), etc
        nome: request.body.nome,
        imagem: request.body.imagem,
        citacao: request.body.citacao,
        minibio: request.body.minibio
    })

    try {
        //preciso esperar pois estou me comunicando com um serviço externo
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    }
    catch (erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
    
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados)
    }
    catch (erro) {
        console.log(erro)
    }    
}

//DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ menssagem: 'Mulher deletada com sucesso!'})
    }
    catch (erro) {
        console.log(erro)
    }
}

//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

//configurei a rota GET / mulheres
app.use(router.get("/mulheres", mostraMulheres))
//configure a rota POST /mulheres
app.use(router.post('/mulheres', criaMulher))
//configurei a rota PATCH /mulheres:id
app.use(router.patch('/mulheres/:id', corrigeMulher))
//configrei a rota DELETE /mulheres:id
app.use(router.delete('/mulheres/:id', deletaMulher))
//servidor ouvindo a porta
app.listen(porta, mostraPorta)