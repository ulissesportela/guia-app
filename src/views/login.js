import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import FormGroup from '../components/form-group'
import Card from '../components/card'
import { mensagemErro } from '../components/toastr'
import { AutenticacaoContext } from '../main/provedorAutenticacao'

class Login extends Component {

    state = {
        email: '',
        senha: ''
    }

    constructor() {
        super()
        this.usuarioService = new UsuarioService()
    }

    entrar = () => {
        this.usuarioService.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')
        }).catch(erro => {
            mensagemErro(erro.response.data)
        })
    }

    viewCadastroUsuario = () => {
        this.props.history.push('/cadastro-usuarios')
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: "relative", left: "300px" }}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <form>
                                            <fieldset>

                                                <FormGroup htmFor="exampleInputEmail1" label='Email: *'>
                                                    <input type="email"
                                                        value={this.state.email}
                                                        onChange={e => this.setState({ email: e.target.value })}
                                                        className="form-control"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Digite o Email" />
                                                </FormGroup>
                                                <FormGroup htmFor="exampleInputPassword1" label='Senha: *'>
                                                    <input type="password"
                                                        value={this.state.senha}
                                                        onChange={e => this.setState({ senha: e.target.value })}
                                                        className="form-control"
                                                        id="exampleInputPassword1"
                                                        placeholder="Password" />
                                                </FormGroup>

                                                <button onClick={this.entrar} type="button" className="btn btn-success"><i className="pi pi-sign-in"></i> Entrar</button>
                                                <button onClick={this.viewCadastroUsuario} type="button" className="btn btn-danger"><i className="pi pi-plus"></i> Cadastrar</button>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = AutenticacaoContext

export default withRouter(Login)