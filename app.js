import express from 'express'
import cors from 'cors'
import produtosRotas from './routes/produtosRotas.js'
import funcionarioRotas from './routes/funcionarioRotas.js';
import categoriasRotas from './routes/categoriaRotas.js'
import estoqueRotas from './routes/estoqueRotas.js'
import franquiasRotas from './routes/franquiasRotas.js'
import fornecedorRotas from './routes/fornecedorRotas.js'
import authRotas from './routes/authRotas.js'




const app = express();
const port = 8080;

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(express.json());
app.use('/uploads', express.static('uploads')); 

app.use('/auth', authRotas);
app.use('/funcionarios', funcionarioRotas);
app.use('/produtos', produtosRotas);
app.use('/categorias', categoriasRotas);
app.use('/estoque', estoqueRotas);
app.use('/franquias', franquiasRotas);
app.use('/fornecedores', fornecedorRotas);


app.get('/', (req, res) => {
    res.status(200).json({ mensagem: "API MusicHouse" });
});


app.use((req, res) => {
    res.status(404).json({ mensagem: 'Rota não encontrada' });
});


app.listen(port, () => {
    console.log(`Projeto sendo executado no http://localhost:${port}`);
});
