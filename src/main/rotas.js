import React from 'react'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

import Login from '../views/login'
import CadastroUsuario from '../views/cadastro-usuario'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import CadastraLancamentos from '../views/lancamentos/cadastro-lancamentos'
import Home from '../views/home'

import { AutenticacaoConsumer } from './provedorAutenticacao'

function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props } ) { //Component e um alias para component
    return (
        <Route {...props} render={ (componentProps) => {
            if(isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={ {pathname: '/login', state : { from: componentProps.location } } } />
                )
            }
        }} />
    )
}

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={ Login } />
                <Route path="/cadastro-usuarios" component={ CadastroUsuario } />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ ConsultaLancamentos } />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={ CadastraLancamentos } />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={ Home } />
                <Route path="*" component={ Login } />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AutenticacaoConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
    </AutenticacaoConsumer>
)