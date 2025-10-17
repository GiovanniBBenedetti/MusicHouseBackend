import express from 'express'
import cors from 'cors'
const app = express()
const port = 8080
import funcionarioRotas from './routes/funcionarioRotas.js';



app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.use('/funcionarios', funcionarioRotas);
app.use('/')


app.get('/', (req,res) =>{
res.status(200).json({mesagem : "API MusicHouse"})
})


app.use((req,res) =>{
    res.status(404).json({mensagem: 'Rota não encontrada'})
})

app.listen(port, ()=>{
    console.log(`Projeto sendo executado no http://locahost:${port}`)
})


