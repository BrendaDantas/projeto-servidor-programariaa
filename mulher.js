const express = require("express")
const router = express.Router()

const app = express()
const porta =  3333

function mostraMulher(request, response) {
    response.json({
        nome: 'Brenda Dantas',
        imagem: 'https://avatars.githubusercontent.com/u/82684526?v=4',
        minibio: 'Estudante de Tecnologia da Informação e bartender nas horas vagas.'
    })
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get("/mulher", mostraMulher))
app.listen(porta, mostraPorta)
