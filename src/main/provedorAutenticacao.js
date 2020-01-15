import React, { Component } from 'react';
import AutenticacaoService from '../app/service/autenticacaoService';

export const AutenticacaoContext = React.createContext()
export const AutenticacaoConsumer = AutenticacaoContext.Consumer

const AutenticacaoProvider = AutenticacaoContext.Provider

export default class ProvedorAutenticacao extends Component {
    state = {
        usuarioAutenticado: null,
        isAutenticado: false
    }

    iniciarSessao = (usuario) => {
        AutenticacaoService.logar(usuario)
        this.setState({ isAutenticado: true, usuarioAutenticado: usuario })
    }

    encerrarSessao = () => {
        AutenticacaoService.removerUsuarioAutenticado()
        this.setState({ isAutenticado: false, usuarioAutenticado: null })
    }

    render() {
        const contexto = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }

        return (
            <AutenticacaoProvider value={contexto}>
                {this.props.children}
            </AutenticacaoProvider>
        )
    }
}
