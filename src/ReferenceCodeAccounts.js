// import logo from './logo.svg';
// import './App.css';
// import Table from 'react-bootstrap/Table';
// import axios from 'axios';
// import DateObject from "react-date-object";
// import React, {expanses, list, useState, useEffect} from 'react';

// function App() {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState([]);
//     // Note: the empty deps array [] means
//   // this useEffect will run once
//   // similar to componentDidMount()
//   useEffect(() => {
//     axios.get(`http://localhost:9050/monthly-expense/fetch-all`)
//       .then((result) => {
//           setIsLoaded(true);
//           console.log(result);
//           console.log((new DateObject(1678092003000)).format());
//           let resObj=result.data.data;
//           debugger;
//           let monthlyExpenseList =resObj["monthly-expanses-list"]; 
//           setItems(monthlyExpenseList);
//         },
//         (error) => {
//           alert("Please check service is Down :"+error);
//           setIsLoaded(true);
//           setError(error);
//         }
//       )
//   }, []);
//   if (error) {
//     return <div>Error: {error.message}</div>;
//   } else if (!isLoaded) {
//     return <div>Loading...</div>;
//   } else {
//     //debugger;
//   return (
//     <div className="App">
//       <header className="App-header">
//      {/* {Table} */}
//     <div className="dv_table">
//           <h3>Accounts</h3>
//      <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>#</th>
//           <th>Paid For(Description)</th>
//           <th>Amount Paid</th>
//           <th>Date & TIme</th>
//         </tr>
//       </thead>
//       <tbody>
//         {items.map((item, i) => (
//         <tr key={item.id}>
//         <td>{(i+1)}</td>
//         <td>{item.paidFor}</td>
//         <td>{item.amount}</td>
//         <td>{new DateObject(item.createdTime).format("YYYY-MM-dd hh:mm a") }</td>
//         </tr>
//          ))}

//       </tbody>
//     </Table>
//     </div>
    
//     {/* <img src={logo} className="App-logo" alt="logo" />
//     <p>Edit <code>src/App.js</code> and save to reload.</p>
//     <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer"> Learn React</a> */}
//       </header>
//     </div>
//   );
// }
// }

// export default App;
