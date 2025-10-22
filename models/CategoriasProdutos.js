import { read, readAll, create, deleteRecord } from "../config/database.js";

const listarCategoria = async () => {
    try {
        return await readAll('categorias')
    } catch (err) {
        console.error('Erro ao listar categorias: ', err)
        throw err
    }
};

const obterCategoriaPorId = async (id_categoria) => {
    try {
        return await read('categorias', `id_categoria = ${id_categoria}`)
    } catch (err) {
        console.error('Erro ao obter categoria por ID: ', err)
        throw err;
    }
}

const criarCategoria = async (categoriaData) => {
    try {
        return await create('categorias', categoriaData);
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        throw error;
    }
};




    const excluirCategoria = async (id_categoria) => {
        try {
        await deleteRecord('categorias', `id_categoria = ${id_categoria}`);
        } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        throw error;
        }
    };

    
export {listarCategoria, obterCategoriaPorId, criarCategoria, excluirCategoria}