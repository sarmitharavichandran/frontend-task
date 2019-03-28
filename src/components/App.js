import React, { Component } from 'react';
import '../css/App.css';
import { Grid, Row, Col, Form} from 'react-bootstrap';
import SliderAmount from './SliderAmount';
import SliderDuration from './SliderDuration';
import RightSide from './RightSide';

class LoanCalculator extends Component {
    constructor(props)
    {
        super(props);

        this.state={
            monthlypaymentamount: undefined,
            interestrate: undefined,
            monthlypaymentcurrency: undefined,
            monthsduration: 6,
            principalamount: 500,
            principalcurrency: undefined,
            error: "error",
            
          //  valueAmount: this.props.valueA,
            stepAmount: this.props.stepA,
            maxAmount: this.props.maxA,
            minAmount: this.props.minA,

            //valueDuration: this.props.valueD,
            stepDuration: this.props.stepD,
            maxDuration: this.props.maxD,
            minDuration: this.props.minD,


          }
      
    }
    
    getNewDate() {

        let newDate = new Date();
        let h,m,s;
        h = newDate.getHours();
        m = "0"+newDate.getMinutes();
        s = "0"+newDate.getSeconds();
        m = m.slice(-2);
        s = s.slice(-2);

        let event_date = h +":"+m+":"+s;
        return event_date;
    };

    update( e ){
       
        let changedID = e.target.id;
        let value = e.target.value;
        if (changedID === 'sliderAmount') {
            this.setState({principalamount: e.target.value});
            console.log('EVENT TIME: ' + this.getNewDate());
            console.log('NEW ACTION DETECTED: ID - '+e.target.id + ': has been changed. New value: '+this.props.currancy + e.target.value);
            
        }
        if (changedID === 'sliderDuration'){
            this.setState({monthsduration: e.target.value});
            console.log('EVENT TIME: ' + this.getNewDate());
            console.log('NEW ACTION DETECTED: ID - '+e.target.id + ': has been changed. New value: '+ e.target.value+' months');
           
        }
        this.getWeather(changedID,value)
    }
   
        getWeather = async (id,value) => {
         // e.preventDefault();
         //let amount=500;
         //let duration=6;
         /*
         if (changedID === 'sliderAmount')
         {
        amount = value;
         }
        if (changedID === 'sliderDuration')
        {
         duration= value;
        }*/

        let amount, duration;
       
       
        if (id === 'sliderDuration') {
            duration = parseFloat(value);
            amount = parseFloat(this.state.principalamount);
        }
       
        else if (id === 'sliderAmount'){
            amount = parseFloat(value);
            duration = parseFloat(this.state.monthsduration);
        }
        
        else {
            amount = parseFloat(this.state.principalamount);
            duration = parseFloat(this.state.monthsduration);
        }





          const api_call = await fetch(`http://ftl-frontend-test.herokuapp.com/interest?amount=${amount}&numMonths=${duration}`);
       
          const data = await api_call.json();
        if (amount && duration){
        this.setState({
          
          monthlypaymentamount: data.monthlyPayment.amount,
          interestrate: data.interestRate,
          monthlypaymentcurrency: data.monthlyPayment.currency,
         // monthsduration: data.numPayments,
         // principalamount: data.principal.amount,
          principalcurrency: data.principal.currency,
          error: ""
        });
        }
        else{
          this.setState({
            monthlypaymentamount: undefined,
            interestrate: undefined,
            monthlypaymentcurrency: undefined,
            monthsduration: undefined,
            principalamount: undefined,
            principalcurrency: undefined,
            error: "Enter correct value"
        
        });
      
        }
    }
      
    render()
    {
        return(
            <Grid className="show-grid mainContainer">
                <Row>
                <Col className="logo" sm={12}>
                         <center>LOAN CALCULATION</center>   <ion-icon name="globe"></ion-icon>
                        </Col>
                   <br></br>
                    <Col className="leftSide" xs={12} md={12}>
    
                    <Form horizontal>
                     
                            <SliderAmount
                                value={this.state.principalamount}
                                min={this.state.minAmount}
                                max={this.state.maxAmount}
                                onChange={this.update.bind(this)}
                                step={this.state.stepAmount}
                                currancy={this.props.currancy}
                            />
                            <SliderDuration
                                value={this.state.monthsduration}
                                min={this.state.minDuration}
                                max={this.state.maxDuration}
                                onChange={this.update.bind(this)}
                                step={this.state.stepDuration}
                            />
                          
                        </Form>
                       
                    </Col>
                    <p>Amount:{this.state.principalamount}</p><br>
                     </br>
                     <p>Duration={this.state.monthsduration}</p>
                     <p>interestrate:{this.state.interestrate}</p>
                    
                    <RightSide
                        currancy={this.props.monthlypaymentcurrency}
                        amount={this.state.monthlypaymentamount}
                        monthly={this.state.monthlypaymentamount}
                        APR={this.state.interestrate}
                        btnOnClick={this.update.bind(this)}
                    />
               </Row>
            </Grid>
        );
    }
}

LoanCalculator.defaultProps = {
    //valueD: 6,
    stepD: 2,
    maxD: 24,
    minD: 6,

  //  valueA : 500,
    stepA : 500,
    maxA : 5000,
    minA : 500,

    APR1: 7.5,
    APR2: 9.0,
    APR3: 12.5,

    currancy: '$',
};
export default LoanCalculator;

