import { read, readAll, create, update, deleteRecord } from "../config/database.js";

const listarProdutos = async () => {
    try {
        return await readAll('produtos')
    } catch (err) {
        console.error('Erro ao listar produtos: ', err)
        throw err
    }
};

const obterProdutoPorId = async (id_produto) => {
    try {
        return await read('produtos', `id_produto = ${id_produto}`)
    } catch (err) {
        console.error('Erro ao obter produto por ID: ', err)
        throw err;
    }
}

const criarProduto = async (produtoData) => {
    try {
        return await create('produtos', produtoData);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        throw error;
    }
};

const atualizarProduto = async (id_produto, produtoData) => {
    try {
    await update('produtos', produtoData, `id_produto = ${id_produto}`);
    } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error;
    }
};


    const excluirProduto = async (id_produto) => {
        try {
        await deleteRecord('produtos', `id_produto = ${id_produto}`);
        } catch (error) {
        console.error('Erro ao excluir produto:', error);
        throw error;
        }
    };

    
export {listarProdutos, obterProdutoPorId, criarProduto, atualizarProduto, excluirProduto}