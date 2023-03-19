import template from "./Accounts.jsx";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import DateObject from "react-date-object";
import React, {expanses, list, useState, useEffect} from 'react';

class Accounts extends React.Component {
constructor(){
  super();
  this.state = {
    name : "react", items: [
      {
        id: 1,
        paidFor: "Suraj",
        amount: "10000",
        createdTime: "1679159469870"
      },
      {
        id: 12,
        paidFor: "Sunil",
        amount: "2000000",
        createdTime: "1679159469870"
      },
     ]
  };
}

  render() {
    //return template.call(this);
    return <div>
     <h2 className="title_head">Hi Accounts Page welcomes you</h2>
    <center>
     <div className="accounts-table-div">
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
       </tbody>
          <hr/>
          <h4>Total Amount : 200000</h4> 
     </Table>
     </div></center>
  </div>;
  }
}

export default Accounts;
