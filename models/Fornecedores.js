import { read, readAll, create, update, deleteRecord } from "../config/database.js";

const listarFornecedores = async () => {
    try {
        return await readAll('fornecedores')
    } catch (err) {
        console.error('Erro ao listar fornecedores: ', err)
        throw err
    }
};

const obterFornecedorPorId = async (id_fornecedor) => {
    try {
        return await read('fornecedores', `id_fornecedor = ${id_fornecedor}`)
    } catch (err) {
        console.error('Erro ao obter fornecedor por ID: ', err)
        throw err;
    }
}

const criarFornecedor = async (fornecedorData) => {
    try {
        return await create('fornecedores', fornecedorData);
    } catch (error) {
        console.error('Erro ao criar fornecedor:', error);
        throw error;
    }
};

const atualizarFornecedor = async (id_fornecedor, fornecedorData) => {
    try {
    await update('fornecedores', fornecedorData, `id_fornecedor = ${id_fornecedor}`);
    } catch (error) {
    console.error('Erro ao atualizar fornecedor:', error);
    throw error;
    }
};


    const excluirFornecedor = async (id_fornecedor) => {
        try {
        await deleteRecord('fornecedores', `id_fornecedor = ${id_fornecedor}`);
        } catch (error) {
        console.error('Erro ao excluir id_fornecedor:', error);
        throw error;
        }
    };

    
export {listarFornecedores, obterFornecedorPorId, criarFornecedor, atualizarFornecedor, excluirFornecedor}