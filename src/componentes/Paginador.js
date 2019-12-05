import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Paginador extends Component {
    state = { 
        paginador:{
            paginas:Math.ceil(Number(this.props.totalClientes) / this.props.limite)
        }
     }
    render() { 
        const {actual} = this.props;
        const btnAnterior= (actual >1 ) 
            ? 
            <button type="button" onClick={this.props.paginaAnterior} className="btn btn-success mr-2">&laquo;Anterior</button>
            : '';
        
        //boton siguiente
        const {paginas} = this.state.paginador;
        const btnSiguiente =(actual!== paginas) ?  
        <button type="button" onClick={this.props.paginaSiguiente} className="btn btn-success mr-2">&raquo;siguiente</button>
         : '';

        return ( 
            <div className="mt-5 d-flex justify-content-center">
                {btnAnterior}
                {btnSiguiente}
            </div>
         );
    }
}
 
export default Paginador;