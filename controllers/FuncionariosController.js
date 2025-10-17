import {
    lerFuncionarios,
    obterFuncionarioPorId,
    criarFuncionario,
  } from '../models/Funcionario.js';
  
  const listarFuncionariosController = async (req, res) => {
    // if (!req.usuario.id) {
    //   return res.status(401).json({ mensagem: 'Usuário não autenticado' });
    // }
  
    try {
      const { franquia } = req.query || 1;
      console.log(franquia);
  
      const funcionarios = await lerFuncionarios(franquia);
      res.status(200).json(funcionarios);
    } catch (err) {
      console.error(`Erro ao listar funcionarios: `, err);
      res.status(500).json({ mensagem: 'Erro ao listar funcionarios' });
    }
  };
  
  const obterFuncionarioPorIdController = async (req, res) => {
    // if (!req.usuario.id) {
    //   return res.status(401).json({ mensagem: 'Usuário não autenticado' });
    // }
  
    try {
      const id_registro = req.params.id;
  
      const funcionario = await obterFuncionarioPorId(id_registro);
      res.status(200).json(funcionario);
    } catch (err) {
      console.error(`Erro ao obter funcionario: `, err);
      res.status(500).json({ mensagem: 'Erro ao obter funcionario' });
    }
  };
  
  const criarFuncionarioController = async (req, res) => {
    // if (!req.usuario.id) {
    //   return res.status(401).json({ mensagem: 'Usuário não autenticado' });
    // }
  
    try {
      const {
        nome_completo,
        cpf,
        rg,
        data_nascimento,
        sexo,
        estado_civil,
        email,
        telefone,
        id_credencial,
      } = req.body;
  
      const id_franquia = req.query.franquia || 1;
  
      const funcionarioData = {
        nome_completo,
        cpf,
        rg,
        data_nascimento,
        sexo,
        estado_civil,
        email,
        telefone,
        id_franquia,
        id_credencial,
      };
  
      const funcionarioId = await criarFuncionario(funcionarioData);
      res.status(201).json({
        mensagem: 'Funcionario Criado com sucesso !!!',
        funcionarioId,
      });
    } catch (error) {
      console.error('Erro ao criar Funcionario:', error);
      res.status(500).json({ mensagem: 'Erro ao criar Funcionario' });
    }
  };
  
  export {
    listarFuncionariosController,
    obterFuncionarioPorIdController,
    criarFuncionarioController,
  };