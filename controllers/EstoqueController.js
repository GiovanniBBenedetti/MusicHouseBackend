import {
  listarEstoques,
  obterEstoquePorId,
  criarEstoque,
  atualizarEstoque,
  excluirEstoque
} from "../models/estoque.js";


const listarEstoquesController = async (req, res) => {
  try {
    const estoques = await listarEstoques();
    res.json(estoques);
  } catch (err) {
    console.error("Erro ao listar estoques:", err);
    res.status(500).json({ mensagem: "Erro ao listar estoques" });
  }
};


const obterEstoquePorIdController = async (req, res) => {
  try {
    const estoque = await obterEstoquePorId(req.params.id);
    if (!estoque) {
      return res.status(404).json({ mensagem: "Estoque não encontrado" });
    }
    res.json(estoque);
  } catch (err) {
    console.error("Erro ao obter estoque:", err);
    res.status(500).json({ mensagem: "Erro ao obter estoque" });
  }
};


const criarEstoqueController = async (req, res) => {
  try {
    const { id_franquia, id_produto, quantidade, minimo } = req.body;
    const estoqueData = { id_franquia, id_produto, quantidade, minimo };
    const id = await criarEstoque(estoqueData);
    res.status(201).json({ mensagem: "Estoque criado com sucesso", id });
  } catch (error) {
    console.error("Erro ao criar estoque:", error);
    res.status(500).json({ mensagem: "Erro ao criar estoque" });
  }
};


const atualizarEstoqueController = async (req, res) => {
  try {
    const id_estoque = req.params.id;
    const { quantidade, minimo } = req.body;
    const estoqueData = { quantidade, minimo };
    await atualizarEstoque(id_estoque, estoqueData);
    res.status(200).json({ mensagem: "Estoque atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar estoque:", error);
    res.status(500).json({ mensagem: "Erro ao atualizar estoque" });
  }
};

const excluirEstoqueController = async (req, res) => {
  try {
    const id_estoque = req.params.id;
    await excluirEstoque(id_estoque);
    res.status(200).json({ mensagem: "Estoque excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir estoque:", error);
    res.status(500).json({ mensagem: "Erro ao excluir estoque" });
  }
};

export {
  listarEstoquesController,
  obterEstoquePorIdController,
  criarEstoqueController,
  atualizarEstoqueController,
  excluirEstoqueController
};
