import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { PRODUCTOS } from '../queries/index';

class Reaction extends Component {

    render() {
        return (
            <Query query={PRODUCTOS} pollInterval={50000} variables={{shopId: 'cmVhY3Rpb24vc2hvcDpKOEJocTN1VHRkZ3daeDNyeg=='}}>
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if (loading) return "cargando..";
                    if (error) return `Error ${error.message}`;
                    console.log(data.catalogItems.edges);
                    return (
                        <React.Fragment>
                            <h2 className="text-center">REACTION COMMERCE</h2>
                            {data.catalogItems.edges.map(item =>{
                                return(
                                    <div className="container  d-flex justify-content-center" key={item.cursor}>
                                      <div className="col-lg-3 " >
                                        <img src={item.node.product.primaryImage.URLs.small} />
                                        <p>{item.node.product.title}</p>
                                    </div>
                                    </div>


                                );
                            })}
                        </React.Fragment>
                    )
                }}
            </Query>
        )
    }
}


export default Reaction;