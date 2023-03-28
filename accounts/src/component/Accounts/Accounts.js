//import template from "./Accounts.jsx";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import DateObject from "react-date-object";
import React from 'react';
import { Button } from 'react-bootstrap';
import {data_fetch_account_list} from './../../DataSet/DataSet';


class Accounts extends React.Component {

 constructor(){
  super();
  this.state = {
     items: data_fetch_account_list,//[ {  id: 1,  paidFor: "Suraj",  amount: "10000",  createdTime: "1679159469870" }, {  id: 12, paidFor: "Sunil",  amount: "2000000", createdTime: "1679159469870" },  ],
     isLoaded:false,
     error:"",
     countCall:0,
     totoalAmount:0  
    };
}
componentDidMount(){
  //call api for fetching Data.
  console.log("api call");
  this.fetchAccountsData();
}

 addExpanse=()=>{
  console.log("AddExpanse");
  //alert("Hi Add");
return(<div><h2>Hi All</h2></div>);
}

  render() {
    //return template.call(this);
    return <div>
     <h2 className="title_head">Hi Accounts Page welcomes you</h2>
    <center>
     <div className="accounts-table-div">
     <span > <Button onClick={this.addExpanse}>New BTN</Button>  </span>
      <Table id="accounts-table"striped bordered hover>
       <thead>
         <tr>
           <th>#</th>
           <th>Paid For(Description)</th>
           <th>Amount Paid</th>
           <th>Date & TIme</th>
         </tr>
       </thead>
       <tbody>
         {this.state.items.map((item, i) => (
         <tr key={item.id}>
         <td>{(i+1)}</td>
         <td>{item.paidFor}</td>
         <td>{item.amount}</td>
         <td>{new DateObject(item.createdTime).format("YYYY-MM-dd hh:mm a") }</td>
         </tr>
          ))} 
          <tr>
          <td></td>
          <td></td>
          <td style={{'fontSize':'2rem', 'textAlign':'right'}}><b>Total Amount : { (this.state.items.reduce((total, item)=>total+item.amount, 0)) }</b></td>
          </tr>
       </tbody>
     </Table> 
     </div></center>
  </div>;
  }


   fetchAccountsData=()=>{
    axios.get(`http://localhost:9050/monthly-expense/fetch-all`)
       .then((result) => {
           //setIsLoaded(true);
          // console.log(result);
           //console.log((new DateObject(1678092003000)).format());
           let resObj=result.data.data;
           let monthlyExpenseList =resObj["monthly-expanses-list"]; 
           this.setState({ countCall: this.state.countCall+1 ,isLoaded : true, items: [...monthlyExpenseList] });
           //let itemsList=this.state.items;
          // debugger;
          console.log(" total calls : "+this.state.countCall);
         },
         (error) => {
           //alert(error);
           console.error("Please check service is Down :"+error);
           this.setState({isLoaded : true , error : error});
         }
       )
  }

}

export default Accounts;


const addExpanseModalForm=()=>{
  console.log("hey modal open.");
 alert("hey modal open..");
}