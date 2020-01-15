import React from 'react'
import currentFormatter from 'currency-formatter'

export default props => {

    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currentFormatter.format(lancamento.valor, { locale: 'pt-BR' })}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button type="button" className="btn btn-success" title="Efetivar"
                            disabled={lancamento.status !== 'PENDENTE'}
                            onClick={e => props.alterarStatus(lancamento , 'EFETIVADO')}>
                                <i className="pi pi-check"/></button>
                    <button type="button" className="btn btn-warning" title="Cancelar"
                            disabled={lancamento.status !== 'PENDENTE'}
                            onClick={e => props.alterarStatus(lancamento , 'CANCELADO')}>
                                <i className="pi pi-times"/></button>
                    <button type="button" className="btn btn-primary" title="Editar"
                            onClick={e => props.editar(lancamento.id)}>
                                <i className="pi pi-pencil"/></button>
                    <button type="button" className="btn btn-danger" title="Deletar"
                            onClick={e => props.deletar(lancamento)}>
                                <i className="pi pi-trash"/></button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}