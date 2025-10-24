import { listarFornecedores, obterFornecedorPorId, criarFornecedor, atualizarFornecedor, excluirFornecedor } from "../models/Fornecedores.js";



const listarFornecedoresController = async (req, res) => {
    try {
        const fornecedores = await listarFornecedores()
        res.status(200).json(fornecedores)
    } catch (error) {
        console.error("Erro ao listar fornecedores", error)
        res.status(500).json({ menssagem: "Erro ao listar fornecedores" })
    }
}


const obterFornecedorPorIdController = async (req, res) => {
    try {
        const fornecedor = await obterFornecedorPorId(req.params.id)
        if (fornecedor) {
            res.status(200).json(fornecedor)
        } else {
            res.status(404).json({ menssagem: "Nenhum fornecedor com esse id" })
        }
    } catch (error) {
        console.error("Erro ao listar fornecedor pelo id", error)
        res.status(500).json({ menssagem: "Erro ao listar fornecedor pelo id" })
    }
}

const criarFornecedorController = async (req, res) => {
    try {
        const { nome, cnpj, email, endereco } = req.body

        const fornecedorData = {
            nome,
            cnpj,
            email,
            endereco
        }

        const fornecedorId = await criarFornecedor(fornecedorData)
        res.status(201).json({
            Menssagem: `Fornecedor criado com sucesso id: ${fornecedorId}`,
            FornecedorCriado: fornecedorData
        })
    } catch (error) {
        console.error("Erro ao criar fornecedor", error)
        res.status(500).json({ menssagem: "Erro ao criar um fornecedor" })
    }
}

const atualizarFornecedorController = async (req, res) => {
    try {
        const fornecedorId = req.params.id
        const { nome, cnpj, email, endereco } = req.body
        const fornecedorData = {
            nome,
            cnpj,
            email,
            endereco
        }

        await atualizarFornecedor(fornecedorId, fornecedorData)
        res.status(200).json({
            menssagem: "Fornecedor atualizado com sucesso",
            FornecedorNovo: fornecedorData
        })

    } catch (error) {
        console.error("Erro ao atualizar fornecedor", error)
        res.status(500).json({ menssagem: "Erro ao atualizar fornecedor" })
    }
}


const excluirFornecedorController = async (req, res) => {
    try {
        const fornecedorId = req.params.id
        const VerificacaoFornecedor = await obterFornecedorPorId(fornecedorId)
        if(VerificacaoFornecedor){
        await excluirFornecedor(fornecedorId)
        res.status(200).json({ menssagem: `Fornecedor excluído com sucesso id: ${fornecedorId}` })
        }else{
            res.status(404).json({menssagem: "Nenhum fornecedor encontrado com esse id"})
        }

    } catch (error) {
        console.error("Erro ao excluir fornecedor", error)
        res.status(500).json({ Menssagem: "Erro ao excluir fornecedor" })
    }
}











export { listarFornecedoresController, criarFornecedorController, obterFornecedorPorIdController, atualizarFornecedorController, excluirFornecedorController }