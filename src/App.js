import React, {Component, Fragment} from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//importar componentes
import Header from './componentes/Layout/Header';
import Clientes  from './componentes/Clientes/Clientes';
import EditarCliente from './componentes/Clientes/EditarCliente';
import NuevoCliente from './componentes/Clientes/NuevoCliente';

import NuevoProducto from './componentes/Productos/NuevoProducto';
import Productos from './componentes/Productos/Productos';
import EditarProducto from './componentes/Productos/Editar';

const client = new ApolloClient({
  uri:"http://localhost:4595/graphql",
  cache:new InMemoryCache ({
    addTypename:false
  }),
  onError : ({networkError, graphQLErrors}) => {
    console.log('graphqlErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Fragment>
          <Header/>
            <div className="container">
              <Switch>
                  <Route exact path="/" component={Clientes}/>
                  <Route exact path="/clientes" component={Clientes}/>
                  <Route exact path="/cliente/nuevo/" component={NuevoCliente}/>
                  <Route exact path="/cliente/Editar/:id" component={EditarCliente}/>
                  <Route exact path="/producto/nuevo/" component={NuevoProducto}/>
                  <Route exact path="/productos/" component={Productos}/>
                  <Route exact path="/productos/editar/:id" component={EditarProducto}/>
              </Switch>
            </div>
        </Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;
