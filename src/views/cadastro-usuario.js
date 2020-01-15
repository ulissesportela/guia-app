import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import Card from '../components/card'
import FormGroup from '../components/form-group'

import UsuarioService from '../app/service/usuarioService';
import { mensagemSucesso, mensagemErro } from '../components/toastr'

class CadastroUsuario extends Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super()
        this.service = new UsuarioService()
    }

    cadastrar = () => {

        const { nome, email, senha, senhaRepeticao } = this.state
        const usuario = { nome, email, senha, senhaRepeticao }

        try {
            this.service.validar(usuario)
        } catch(error) {
            const mensagens = error.mensagens
            mensagens.forEach(element => mensagemErro(element))
            return false
        }

        this.service.salvar(this.state)
        .then( response => {
            mensagemSucesso('Usuario cadastrado com sucesso! Faça o login para acessar o sistema')
            this.props.history.push('/login')
        })
        .catch(erro => {
            mensagemErro(erro.response.data)
        })
    }

    cancelar = () => {
        this.props.history.push('/Login')
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <form>
                                <fieldset>
                                    <FormGroup htmFor="imputNome" label="Nome: *">
                                        <input type="text"
                                            className="form-control"
                                            id="imputNome"
                                            name="nome"
                                            onChange={e => this.setState({ nome: e.target.value })} />
                                    </FormGroup>
                                    <FormGroup htmFor="imputEmail" label="E-mail: *">
                                        <input type="email"
                                            className="form-control"
                                            id="imputEmail"
                                            name="email"
                                            onChange={e => this.setState({ email: e.target.value })} />
                                        <small id="emailHelp" className="form-text text-muted">Não divulgamos o seu email.</small>
                                    </FormGroup>
                                    <FormGroup htmFor="imputSenha" label="Senha: *">
                                        <input type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            id="imputSenha"
                                            name="senha"
                                            onChange={e => this.setState({ senha: e.target.value })} />
                                    </FormGroup>
                                    <FormGroup htmFor="imputRepitaSenha" label="Repita a Senha: *">
                                        <input type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            id="imputRepitaSenha"
                                            name="senhaRepeticao"
                                            onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                                    </FormGroup>

                                    <button onClick={this.cadastrar} type="button" className="btn btn-success"><i className="pi pi-save"></i> Salvar</button>
                                    <button onClick={this.cancelar} type="button" className="btn btn-danger"><i className="pi pi-times"></i> Cancelar</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
export default withRouter( CadastroUsuario )