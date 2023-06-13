const mongoose = require('mongoose')
require('dotenv').config()

async function conectaBancoDeDados() {
    try {
        console.log('Conexão com o banco de dados iniciou.')

        await mongoose.connect(process.env.MONGO_URL)

        console.log('A Conexão com o banco de dados foi estabelecida com sucesso!')
    } 
    catch (erro) {
        console.log(erro)
    }
}

module.exports = conectaBancoDeDados