import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentos-table'

import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localStorageService'
import { mensagemErro, mensagemSucesso, mensagemAlerta } from '../../components/toastr'

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

class ConsultaLancamentos extends Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        dialogVisible: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    constructor() {
        super()
        this.lancamentoService = new LancamentoService()
    }

    buscar = () => {

        if (!this.state.ano) {
            mensagemErro('O ano é obrigatório.')
            return false
        }

        const usuario = LocalStorageService.getItem('_usuario_logado').id

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuario
        }

        this.lancamentoService
            .consultar(lancamentoFiltro)
            .then( response => {
                if (response.data < 1 ) mensagemAlerta("Nehum registro encontrado.")
                this.setState({ lancamentos: response.data })
            })
            .catch(erro => {
                mensagemErro(erro.response.data)
            })
    }

    editar = (id) =>{
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({dialogVisible: true, lancamentoDeletar: lancamento})
    }

    cancelar = () => {
        this.setState({dialogVisible: false, lancamentoDeletar: {}})
    }

    deletar = () => {

        this.lancamentoService
            .deletar(this.state.lancamentoDeletar.id)
            .then( response => {
                const lancamentos =  this.state.lancamentos
                const index = lancamentos.indexOf(this.state.lancamentoDeletar)
                lancamentos.splice(index, 1)
                this.setState(lancamentos)
                this.setState({dialogVisible: false, lancamentoDeletar: {}})
                mensagemSucesso('Lançamento deletado com sucesso.')
            })
            .catch( erro => {
                mensagemErro('Erro ao deletar o lançamento.')
            })
 
    }

    viewCadastrarLancamentos = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    alterarStatus = (lancamento, status) => {
        this.lancamentoService
        .alterarStatus(lancamento.id, status)
        .then( response => {
            const lancamentos = this.state.lancamentos
            const index = lancamentos.indexOf(lancamento)
            if (index !== -1) {
                lancamento.status = status
                lancamentos[index] = lancamento
                this.setState( {lancamentos} )
            }

            mensagemSucesso("Status atualizado com sucesso!")
        })
        
        
    }

    render() {
        const meses = this.lancamentoService.meses()
        const tipos = this.lancamentoService.tipos()

        const footer = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelar} className="p-button-secondary" />
            </div>
        );

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text"
                                    className="form-control"
                                    id="inputAno"
                                    value={this.state.ano}
                                    onChange={e => this.setState({ ano: e.target.value })}
                                    placeholder="Digite o Ano" />
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu id="inputMes" className="form-control" 
                                            value={this.state.mes}
                                            onChange={e => this.setState({mes: e.target.value})}
                                            lista={ meses } />
                            </FormGroup>

                            <FormGroup htmlFor="inputDesc" label="Descrição: ">
                                <input type="text"
                                    className="form-control"
                                    id="inputDesc"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    placeholder="Digite a descrição" />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                                <SelectMenu id="inputTipo" className="form-control" 
                                            value={this.state.tipo}
                                            onChange={e => this.setState({tipo: e.target.value})}
                                            lista={ tipos } />
                            </FormGroup>

                            <button onClick={this.buscar}
                                type="button"
                                className="btn btn-success">
                                <i className="pi pi-search"></i> Buscar</button>
                            <button onClick={this.viewCadastrarLancamentos}
                                type="button"
                                className="btn btn-danger">
                                <i className="pi pi-plus"></i> Cadastrar</button>

                        </div>

                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                            deletar={this.abrirConfirmacao}
                                            editar={this.editar}
                                            alterarStatus={this.alterarStatus}/>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmação"
                            visible={this.state.dialogVisible}
                            style={{width: '50vw'}}
                            modal={true}
                            footer={footer}
                            onHide={() => this.setState({dialogVisible: false})}>
                                Confirma a exclusão deste lancamento?
                            </Dialog>
                </div>
            </Card>
        )
    }
}
export default withRouter(ConsultaLancamentos)