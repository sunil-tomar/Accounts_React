//import template from "./Accounts.jsx";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import DateObject from "react-date-object";
import React from 'react';
import { Button } from 'react-bootstrap';
import {data_fetch_account_list} from './../../DataSet/DataSet';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import { Form } from 'react-bootstrap';
//Server URL 
const serverUrl="http://localhost:9050/";

class Accounts extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      items: data_fetch_account_list,
      isFormOpen: false,
      isLoaded:false,
      error:"",
      countCall:0,
      totoalAmount:0  
    };
}

handleToggleForm = () => {
  console.log(" handleToggleForm ");
  this.setState({ isFormOpen: !this.state.isFormOpen });
};


handleSubmit = (event) => {
  console.log(" handleSubmit ");

  event.preventDefault();
  const data = new FormData(event.target);
  const formData = {
    paidFor: data.get('paidFor'),
    amount: data.get('amount'),
    };
    console.log(formData);
  //fetch(serverUrl+'monthly-expense/add',{
  fetch('http://localhost:9050/monthly-expense/add', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(resp => {
    //let saveedEnity=data.entity;
    console.log(resp);
  //adding object in list.
  debugger;
  const obj=resp.data.entity;
  this.state.items.push(obj);
  })
  .catch(error => console.error(error));
};


componentDidMount(){
  //call api for fetching Data.
  console.log("inactive api call");
  this.fetchAccountsData();
} 

 addExpanse=()=>{
  console.log("AddExpanse");
  const newItem = { id: 400, paidFor: 'New User', amount: 400, createdTime: "1679159469870"};
  console.log("adding newItem : ");
  console.log(newItem);
  this.setState({ items: [...this.state.items, newItem] });
  //alert("Hi Add");
  return(<div><h2>Hi All</h2></div>);
}

render() {
    //return template.call(this);
    return <div>
     <h2 className="title_head">Hi Accounts Page welcomes you</h2>
    <center>
     <div className="accounts-table-div">
     <>
      {this.state.isFormOpen &&
        <div className="form-popup">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Reason" name="paidFor" />
            <input type="text" placeholder="Money" name="amount" />
            <button type="submit">Submit</button>
            <button type="button" onClick={this.handleToggleForm}>Cancel</button>
          </form>
        </div>
      }
      <button onClick={this.handleToggleForm}>Add Expanse</button>
    </>

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