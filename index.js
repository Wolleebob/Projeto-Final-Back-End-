// npm i init
// npm i express
const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

// npm i mysql2
const db = require("./db")

// npm i bcrypt
const bcrypt = require("bcrypt")

// npm i jsonwebtoken
const jwt = require("jsonwebtoken")

// npm i dotenv
const dotenv = require("dotenv")
dotenv.config()


const cors=require("cors")
app.use(cors()) 


// AQUI FAZEMOS AS OPERAÇÕES DO BD
app.post("/cliente", async (req, res)=>{
    try{
        const dados = req.body
        const senhaCript = bcrypt.hashSync(dados.senha, 10)
        dados.senha = senhaCript
        
        const resultado = await db.pool.query(`
            INSERT INTO cliente(
                nome, cpf, celular, email, senha
            ) VALUES (?, ?, ?, ?, ? )`,
            [dados.nome, dados.cpf, dados.celular, 
            dados.email, dados.senha]
        )
        res.status(201).json({
            mensagem: "Cliente cadastrado, id = " + resultado[0].insertId
        })
    } catch (error) {
        res.status(500).json({erro: error.message})
    }
})
// mexer aqui
app.get("/cliente", async (req, res) => {
    try { 
        const cliente = await db.pool.query("SELECT * FROM cliente")
        res.status(200).json(cliente[0])
    }catch (error) {
        res.status(500).json({erro: error.message})
    }
})

app.get("/cliente/perfil", autenticar , async (req, res) => {
    try {
        const id = req.usuario.id
        const resultado = await db.pool.query("SELECT * FROM cliente WHERE id = ?", [id])
        if (resultado[0].length === 0) {
            return res.status(404).json({
                mensagem: "Cliente não encontrado"
            })
        } 
        const cliente = resultado[0][0]
        delete cliente.senha
        res.status(200).json(cliente) 
    } catch(error){
        res.status(500).json({resposta: error.message})
    }  
})

app.delete("/cliente/:id", async (req, res) => {
   const id = req.params.id
   try{
        const resultado = await db.pool.query("DELETE FROM cliente WHERE id = ?", [id])
        const dados = req.body
        const senhaCript = bcrypt.hashSync(dados.senha, 10)
        dados.senha = senhaCript
        if (resultado[0].affectedRows === 0) {
            res.status(404).json({mensagem: "Cliente não encontrado"})
        } else {
            res.status(200).json({mensagem: "Cliente deletado com sucesso"})
        }
   } catch(error){
        res.status(500).json({erro: error.message})
   }
})

app.put("/cliente/:id", async (req, res) => {
    try{
        const id = req.params.id
        const dados = req.body
         const senhaCript = bcrypt.hashSync(dados.senha, 10)
         dados.senha = senhaCript
        const resposta = await db.pool.query("UPDATE cliente SET nome = ?, cpf = ?, celular = ?, email = ?, senha = ? WHERE id = ?;",
         [dados.nome, dados.cpf, dados.celular, dados.email, dados.senha, id])
        if (resposta[0].affectedRows === 0) {
            
            return res.status(404).json({mensagem: "Cliente não encontrado"})
        }
        res.status(200).json({mensagem: "Cliente atualizado com sucesso"})
    } catch(error){
        res.status(500).json({erro: error.message})
    }  
})

app.post("/login", async (req, res) => {
    try {
        const user = req.body
        const resultado = await db.pool.query(
            'SELECT id,nome,email, senha FROM cliente WHERE email = ?',
            [user.email]
    )
    const dados_bd = resultado[0][0]
    if(!dados_bd) {
        return res.status(401).json({mensagem: "Email ou senha inválida"})
    }
    const senhaValida = await bcrypt.compare(user.senha, dados_bd.senha)
    if (!senhaValida) {
        return res.status(401).json({mensagem: "Email ou senha inválida"})
    } 
    const payload = {
        id: dados_bd.id,
        email: dados_bd.email
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})
    return res.status(200).json({token: token, nome: dados_bd.nome })
    } catch (error) {
        res.status(500).json({erro: error.message})
    }
})



app.listen(port,() => {
    console.log(
        "Api rodando na porta" + port
    )
})

// https://dontpad.com/backendapi
function autenticar(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null){
        return res.status(401).json({erro: "Token não enviado, usar Authorization Bearer <token>"})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) return res.status(403).json({erro: "Token inválido"})
        req.usuario = usuario
        next()
    })   
}