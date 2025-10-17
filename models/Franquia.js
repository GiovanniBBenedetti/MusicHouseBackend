import { create } from '../config/database.js';

const cadastrarFranquia = async (franquiaData) => {
  try {
    return await create('franquias', franquiaData);
  } catch (error) {
    console.error('Erro ao criar franquias:', error);
    throw error;
  }
};

export { cadastrarFranquia };