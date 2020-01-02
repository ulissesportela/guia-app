import React, { Component } from 'react';

import FormGroup from '../components/form-group'

import Card from '../components/card'

export default class Login extends Component {

    state = {
        email: '',
        senha: ''
    }

    entrar = () => {
        console.log("email: ", this.state.email);
        console.log("senha: ", this.state.senha);
    }

    render() {
        return (
            <div className="container">
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

                                                    <button onClick={this.entrar} type="button" className="btn btn-success">Entrar</button>
                                                    <button type="button" className="btn btn-danger">Cadastrar</button>
                                                </fieldset>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
