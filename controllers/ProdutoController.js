import { fileURLToPath } from 'url';
import path from 'path'
import { atualizarProduto, criarProduto, excluirProduto, listarProdutos, obterProdutoPorId } from '../models/produtos.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const listarProdutosController = async (req, res) => {
    try {
        const produtos = await listarProdutos()
        res.status(200).json(produtos)
    } catch (err) {
        console.error('Erro ao listar produtos: ', err)
        res.status(500).json({ menssagem: 'Erro ao listar produtos' })
    }
}

const obterProdutoPorIdController = async (req, res) => {
    try {
        const produto = await obterProdutoPorId(req.params.id)
        if (produto) {
            res.json(produto)
        } else {
            res.status(404).json({ mensagem: `Produto não encontrado` })
        }
    } catch (err) {
        console.error('Erro ao obter produto por ID: ', err)
        res.status(500).json({ menssagem: 'Erro ao obter produto por ID' })
    }
}



const criarProdutoController = async (req, res) => {
    try {
        const { nome, descricao, materiais, detalhes, cor, desconto, id_categoria, valor, custo_producao } = req.body;
        let imagemProduto = null;
        if (req.file) {
            imagemProduto = req.file.path.replace(__dirname.replace('\\controllers', ''), '');
        }
        const produtoData = {
            nome: nome || null,
            descricao: descricao || null,
            materiais: materiais || null,
            detalhes: detalhes || null,
            cor: cor || null,
            id_categoria: id_categoria || null,
            valor: valor || null,
            desconto: desconto || null,
            custo_producao: custo_producao || null,
            imagem: imagemProduto || null
        };
        const produtoId = await criarProduto(produtoData);
        res.status(201).json({ menssagem: 'Produto criado com sucesso', produtoId });
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ menssagem: 'Erro ao criar produto' });
    }
}

const atualizarProdutoController = async (req, res) => {
    try {
        const produtoId = req.params.id;
        const { nome, descricao, materiais, detalhes, cor, desconto, id_categoria, valor, custo_producao } = req.body;
        let imagemProduto = null;
        if (req.file) {
            imagemProduto = req.file.path.replace(__dirname.replace('\\controllers', ''), '');
        }
        const produtoData = {
            nome: nome || null,
            descricao: descricao || null,
            materiais: materiais || null,
            detalhes: detalhes || null,
            cor: cor || null,
            id_categoria: id_categoria || null,
            valor: valor || null,
            desconto: desconto || null,
            custo_producao: custo_producao || null,
            imagem: imagemProduto || null
        };

        await atualizarProduto(produtoId, produtoData);
        res.status(200).json({ menssagem: 'Produto atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar Produto:', error);
        res.status(500).json({ menssagem: 'Erro ao atualizar produto' });
    }
};

const excluirProdutoController = async (req, res) => {
    try {
        const produtoId = req.params.id;
        const produto = await obterProdutoPorId(produtoId);

        if (!produto) {
            return res.status(404).json({ mensagem: 'Nenhum produto encontrado com esse id' });
        }

        await excluirProduto(produtoId);
        res.status(200).json({ mensagem: 'Produto excluído com sucesso' });

    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        res.status(500).json({ mensagem: 'Erro ao excluir produto' });
    }
};


export {
    listarProdutosController, obterProdutoPorIdController, criarProdutoController, atualizarProdutoController, excluirProdutoController

};