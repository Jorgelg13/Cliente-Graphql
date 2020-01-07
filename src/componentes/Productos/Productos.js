import React, { Component } from 'react';
import {Query, Mutation} from 'react-apollo';
import {PRODUCTOS} from '../../queries'
import {ELIMINAR_PRODUCTO} from '../../mutations';
import Exito from '../Alertas/exito';
import { Link } from 'react-router-dom';

class Productos extends Component {
    state = { 
        alerta:{
            mostrar:false,
            mensaje:''
        }
     }
    render() { 
        const {alerta:{mostrar, mensaje}} = this.state;
        const alerta = (mostrar) ? <Exito mensaje={mensaje} /> : '';

        return (
            <div className="container">
                <h1 className="text-center mb-5">Productos</h1>
                {alerta}
                <Query query={PRODUCTOS} pollInterval={5000}>
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if (loading) return "cargando..";
                    if (error) return `Error ${error.message}`;
                    console.log(data);
                    return (
                        <table className="table">
                            <thead>
                                <tr className="table-primary">
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Editar</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.obtenerProductos.map(item => {
                                    const {id} = item;
                                    return(
                                        <tr key={id}>
                                            <td>{item.nombre}</td>
                                            <td>{item.precio}</td>
                                            <td>{item.stock}</td>
                                            <td>
                                                <Link
                                                    to={`/productos/editar/${id}`}
                                                    className="btn btn-success"
                                                >Editar
                                                </Link>                       
                                            </td>
                                            <td>
                                               <Mutation mutation={ELIMINAR_PRODUCTO} onCompleted={(data) =>{
                                                   this.setState({
                                                       alerta:{
                                                           mostrar:true,
                                                           mensaje: data.eliminarProducto
                                                       }
                                                   }, () =>{
                                                       setTimeout(() => {
                                                           this.setState({
                                                               alerta:{
                                                                   mostrar:false,
                                                                   mensaje:''
                                                               }
                                                           })
                                                       }, 5000);
                                                   })
                                               }}>
                                                   {eliminarProducto =>(
                                                    <button
                                                       onClick ={ () => {
                                                           if(window.confirm('Seguro que deseas eliminar este registro')) {
                                                               eliminarProducto({
                                                                   variables:{id}
                                                               })
                                                           }
                                                       }}
                                                       type="button"
                                                       className="btn btn-danger"
                                                      >&times; Eliminar
                                                    </button>
                                                   )}
                                               </Mutation>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )
                }}
                </Query>
            </div>
        );
    }
}
 
export default Productos;