import ApiService from '../apiservice'
import ErroValidacao from '../exceprion/ErroValidacao'

export default class UsuarioService extends ApiService {
    constructor() {
        super('/api/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais)
    }

    saldoPorUsuario(id) {
        return this.get(`/${id}/saldo`)
    }

    salvar(usuario) {
        return this.post('', usuario)
    }

    validar(usuario) {
        const erros = []

        if(!usuario.nome) erros.push('O campo nome é obrigatório.')
        if(!usuario.email) {
            erros.push('O campo e-mail é obrigatório.')
        }  else if(!usuario.email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
            erros.push('informe um email válido.')
        }
        if(!usuario.senha || !usuario.senhaRepeticao) {
            erros.push('Digite a senha 2x.')
        } else if (usuario.senha !== usuario.senhaRepeticao) {
            erros.push('As senhas não batem.')
        }

        if(erros && erros.length > 0) {
            throw new ErroValidacao(erros)
        }
    }
}