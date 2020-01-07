import React, { Component } from 'react';
import {CLIENTE_QUERY} from '../../queries';
import {Query} from 'react-apollo';
import FormEditarCliente from './FormEditarCliente';

class EditarCliente extends Component {
    state = {  }
    render() { 
        //tomar el id del contacto a editar
        const {id} = this.props.match.params;
        //console.log(id);
        return (
            <React.Fragment>
               <h2>Editar Cliente</h2>
               <div className="row justify-content-center">
               <Query query={CLIENTE_QUERY} variables={{id}}>
                   {({loading,error,data,refetch}) => {
                       if(loading) return 'cargando...';
                       if(error) return `OCURRIO UN ERROR EN TU APLICACION ${error.message}`;
                        //console.log(data);
                       return (
                           <FormEditarCliente
                            cliente={data.getCliente}
                            refetch={refetch}
                           />
                       );
                   }}
               </Query>
               </div>
            </React.Fragment> 
            
         );
    }
}
 
export default EditarCliente;