import { read, readAll, create, update, deleteRecord } from "../config/database.js";


const listarEstoques = async () => {
    try {
        return await readAll('estoque');
    } catch (err) {
        console.error('Erro ao listar estoques: ', err);
        throw err;
    }
};

const obterEstoquePorId = async (id_estoque) => {
    try {
        return await read('estoque', `id_estoque = ${id_estoque}`);
    } catch (err) {
        console.error('Erro ao obter estoque por ID: ', err);
        throw err;
    }
};


const criarEstoque = async (estoqueData) => {
    try {
        return await create('estoque', estoqueData);
    } catch (error) {
        console.error('Erro ao criar estoque:', error);
        throw error;
    }
};

const atualizarEstoque = async (id_estoque, estoqueData) => {
    try {
        await update('estoque', estoqueData, `id_estoque = ${id_estoque}`);
    } catch (error) {
        console.error('Erro ao atualizar estoque:', error);
        throw error;
    }
};

const excluirEstoque = async (id_estoque) => {
    try {
        await deleteRecord('estoque', `id_estoque = ${id_estoque}`);
    } catch (error) {
        console.error('Erro ao excluir estoque:', error);
        throw error;
    }
};

export { listarEstoques, obterEstoquePorId, criarEstoque, atualizarEstoque, excluirEstoque };
