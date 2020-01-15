import LocalStorangeService from './localStorageService'
import LocalStorageService from './localStorageService'

export default class AutenticacaoService {

    static isUsuarioAutenticado() {
        const usuario = LocalStorangeService.getItem('_usuario_logado')
        return usuario && usuario.id
    }

    static removerUsuarioAutenticado() {
        LocalStorageService.removerItem('_usuario_logado')
    }

    static logar(usuario) {
        LocalStorangeService.setItem('_usuario_logado', usuario)
    }

    static obterUsuarioAutenticado() {
        return LocalStorangeService.getItem('_usuario_logado')
    }
}