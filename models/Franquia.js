import { create, update, readAll, read } from '../config/database.js';

const listarFranquias = async () =>{
  try{
    return await readAll('franquias')
  }catch(error){
    console.erro('Erro ao listar franquias', error)
    throw error
  }
}

const obterFranquiaPorId = async (id_franquia) =>{
    try{
      return await read('franquia', `id_franquia = ${id_franquia}`)
    }catch(error){
      console.error("Erro ao obter franquia por id", error)
      throw error
    }
}

const cadastrarFranquia = async (franquiaData) => {
  try {
    return await create('franquias', franquiaData);
  } catch (error) {
    console.error('Erro ao criar franquias:', error);
    throw error;
  }
};

const atualizarFranquia = async (id_franquia, franquiaData) => {
  try {
    return await update(
      'franquias',
      franquiaData,
      `id_franquia = ${id_franquia}`
    );
  } catch (error) {
    console.error('Erro ao atualizar franquia:', error);
    throw error;
  }
};

export { cadastrarFranquia, atualizarFranquia, listarFranquias, obterFranquiaPorId };