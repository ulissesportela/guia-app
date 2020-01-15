import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentoService from "../../app/service/lancamentoService"
import { mensagemSucesso, mensagemErro } from "../../components/toastr"
import LocalStorageService from '../../app/service/localStorageService'

class CadastroLancamentos extends Component {

    state = {
        id: null,
        descricao: '',
        mes: '',
        ano: '',
        valor: '',
        tipo: '',
        usuario: null,
        status: ''
    }

    constructor() {
        super()
        this.service = new LancamentoService()
    }

    componentDidMount() {
        const params = this.props.match.params
        if(params.id) {
            this.service
                .obterPorId(params.id)
                .then( response => {
                    this.setState( {...response.data} )
                })
                .catch( erro => {
                    mensagemErro(erro.response.data)
                })
                                    
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    salvar = () => {
        const usuario = LocalStorageService.getItem("_usuario_logado")

        const { descricao, mes, ano, valor, tipo } = this.state
        const lancamento = { descricao, mes, ano, usuario: usuario.id, valor, tipo }

        try {
            this.service.validar(lancamento)
        } catch (error) {
            const mensagens = error.mensagens
            mensagens.forEach(element => mensagemErro(element))
            return false
        }

        this.service
        .salvar(lancamento)
        .then( response => {
            mensagemSucesso('Lancamento cadastrado com sucesso!')
            this.props.history.push('/consulta-lancamentos')
        })
        .catch(erro => {
            mensagemErro(erro.response.me)
        })
    }

    atualizar = () => {
        const usuario = LocalStorageService.getItem("_usuario_logado")

        const { descricao, mes, ano, valor, tipo, id } = this.state
        const lancamento = { descricao, mes, ano, valor, tipo, id, usuario: usuario.id }

        this.service
        .atualizar(lancamento)
        .then( response => {
            mensagemSucesso('Lancamento atualizado com sucesso!')
            this.props.history.push('/consulta-lancamentos')
        })
        .catch(erro => {
            mensagemErro(erro.response.data)
        })  
    }

    render() {

        const tipos = this.service.tipos()
        const meses = this.service.meses()

        return (
            <Card title={(this.state.id != null) ? "Atualizar de Lançamentos" : "Cadastro de Lançamentos"}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" type="text"
                                    className="form-control" 
                                    value={this.state.descricao} 
                                    name="descricao" 
                                    onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" type="text" 
                                    className="form-control" 
                                    value={this.state.ano} 
                                    name="ano" 
                                    onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" lista={meses}
                                        className="form-control" 
                                        value={this.state.mes} 
                                        name="mes" 
                                        onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: * ">
                            <input id="inputValor" type="text"
                                    className="form-control" 
                                    value={this.state.valor} 
                                    name="valor" 
                                    onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: * ">
                            <SelectMenu id="inputTipo" lista={tipos} 
                                        className="form-control" 
                                        value={this.state.tipo} 
                                        name="tipo" 
                                        onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: * ">
                            <input id="inputStatus" type="text" disabled className="form-control" value={this.state.status} name="status" onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {(this.state.id != null) ? 
                        <button className="btn btn-success" onClick={this.atualizar}><i className="pi pi-refresh"></i> Atualizar</button> :
                        <button className="btn btn-success" onClick={this.salvar}><i className="pi pi-save"></i> Salvar</button>
                        }
                        
                        <button className="btn btn-danger"
                                onClick={e => this.props.history.push('/consulta-lancamentos')}><i className="pi pi-times"></i> Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos)