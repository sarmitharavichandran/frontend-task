import React, { Component } from 'react';
import { Col} from 'react-bootstrap';


class RightSide extends Component {
    render() {
        return (
         
            <Col className="rightSide" xs={12} md={12}>
               
              <span className="monthlyInstDisplay"> MONTHLY PAYMENT : {this.props.monthly}</span>
               
              
                 
              
                 <span className="aprDisplay"> INTEREST RATE : {this.props.APR}%</span>





                 


                </Col>

        )
    }
}

export default RightSide;