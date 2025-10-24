
import jwt from 'jsonwebtoken'
import { read, compare } from '../config/database.js'
import { JWT_SECRET } from '../config/jwt.js'

const loginController = async (req, res) =>{
    const {id_resgistro, senha} = req.body

    try{
        const funcionario = await read('funcionarios', `id_registro= '${id_resgistro}'`)
        if(!funcionario){
            return res.status(404).json({mensagem: 'Usuário não encontrado'})
        }

        const senhaCorreta = await compare(senha, funcionario.senha)

        if (!senhaCorreta){
            return res.status(401).json({mensagem: 'Senha Incorreta'})
        }

        const token = jwt.sign({id: funcionario.id_registro, nome:funcionario.nome_completo}, JWT_SECRET, {expiresIn: '12h' })
        res.json({mensagem : 'Login realizado com sucesso', token})
    }catch(err){
        console.error('Erro ao fazer login: ', err)
        res.status(500).json({mensagem: 'Erro ao fazer login' })
    }
}

export {loginController}
