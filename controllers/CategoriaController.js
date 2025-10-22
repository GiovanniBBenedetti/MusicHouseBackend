import { listarCategoria, criarCategoria, obterCategoriaPorId, excluirCategoria } from "../models/CategoriasProdutos.js"
import { fileURLToPath } from 'url';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const listarCategoriaController = async (req, res) => {
    try {
        const categorias = await listarCategoria()
        res.status(200).json(categorias)
    } catch (err) {
        console.error('Erro ao listar categorias: ', err)
        res.status(500).json({ menssagem: 'Erro ao listar categorias' })
    }
}

const obterCategoriaPorIdController = async (req, res) => {
    try {
        const categoria = await obterCategoriaPorId(req.params.id)
        if (categoria) {
            res.json(categoria)
        } else {
            res.status(404).json({ menssagem: `Categoria não encontrado` })
        }
    } catch (err) {
        console.error('Erro ao obter categoria por ID: ', err)
        res.status(500).json({ menssagem: 'Erro ao obter categoria por ID' })
    }
}



const criarCategoriaController = async (req, res) => {
    try {
        const { nome, descricao} = req.body;
        let icone = null;
        if (req.file) {
            icone = req.file.path.replace(__dirname.replace('\\controllers', ''), '');
        }
        const categoriaData = {
            nome: nome,
            descricao: descricao,
            icone:icone
        };
        const categoriaId = await criarCategoria(categoriaData);
        res.status(201).json({ menssagem: 'Categoria criado com sucesso', categoriaId });
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        res.status(500).json({ menssagem: 'Erro ao criar categoria' });
    }
}

const excluirCategoriaController = async (req, res) => {
    try {
        const categoriaId = req.params.id
        const verificarCategoriaId = await obterCategoriaPorId(categoriaId)
        if(verificarCategoriaId){
            await excluirCategoria(categoriaId);
            res.status(200).json({ menssagem: 'Categoria excluído com sucesso' });
        }else{
            res.status(404).json({menssagem: 'Nenhuma categoria encontrada com esse id'})
        }

    } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        res.status(500).json({ menssagem: 'Categoria excluído com sucesso' });
    }
};

export {
listarCategoriaController, obterCategoriaPorIdController, excluirCategoriaController, criarCategoriaController
};