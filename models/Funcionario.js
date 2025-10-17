import { create, readAll, read } from '../config/database.js';

const lerFuncionarios = async (franquia) => {
  try {
    return await readAll(
      'funcionarios',
      `id_franquia  = ${franquia} AND status = 'Ativo'`
    );
  } catch (error) {
    console.error('Erro ao criar funcionario:', error);
    throw error;
  }
};

const obterFuncionarioPorId = async (id_registro) => {
  try {
    return await read('funcionarios', `id_registro = ${id_registro}`);
  } catch (error) {
    console.error('Erro ao obter funcionario por ID:', error);
    throw error;
  }
};

const criarFuncionario = async (funcionarioData) => {
  try {
    return await create('funcionarios', funcionarioData);
  } catch (error) {
    console.error('Erro ao criar funcionario:', error);
    throw error;
  }
};

export { lerFuncionarios, obterFuncionarioPorId, criarFuncionario };