import React from 'react';
import "./Accounts.css";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import DateObject from "react-date-object";
import 'datatables.net-responsive-dt';
import DataTable from 'datatables.net-dt';
import { data_fetch_account_list } from './../../DataSet/DataSet';
import { SERVER_BASE_URL, URL_ADD_MONTHLY_EXPANSE, URL_FETCH_NEXT_CHUNK_MONTHLY_EXPANSE} from '../../Utils/URL_CONSTANT';
let table = new DataTable('#accounts_table', {
  retrieve: true, 
  responsive: true
});
table.destroy();
    

class Accounts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: data_fetch_account_list,
      isFormOpen: false,
      isLoaded: false,
      error: "",
      countCall: 0,
      totoalAmount: 0
    };
  }

  //AUTO ON LOAD CALL FUNCTION.
  componentDidMount() {
    //call api for fetching Data.
    console.log("inactive api call");
    //debugger
    this.fetchAccountsData();
  }

  componentWillUnmount() {
    //you code.
  }

  render() {
    //return template.call(this);  
    return <div className='accounts-body-div'>
      <h2 className="title_head">Monthly Expanses(Spendings)</h2>
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

          <Table id="accounts_table" striped bordered hover> 
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
                  <td>{(i + 1)}</td>
                  <td>{item.paidFor}</td>
                  <td><b>{parseFloat(item.amount).toFixed(2)}</b></td>
                  <td>{new DateObject(item.createdTime).format("YYYY-MM-dd hh:mm a")}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td style={{ 'fontSize': '2rem', 'textAlign': 'right' }}>
                  <b>Total Amount : {(this.state.items.reduce((total, item) => total + item.amount, 0)).toFixed(2)}</b>
                </td>
                <td></td> 
              </tr>
            </tbody>
          </Table>
        </div></center>
    </div>;
}

  //Fetch API for calling 
  fetchAccountsData = () => {
    axios.get(SERVER_BASE_URL + URL_FETCH_NEXT_CHUNK_MONTHLY_EXPANSE+"/0/20" )
      .then((result) => {
        //console.log((new DateObject(1678092003000)).format());
        let resObj = result.data.data;
        let monthlyExpenseList = resObj["entity-list"];
        this.setState({ countCall: this.state.countCall + 1, isLoaded: true, items: [...monthlyExpenseList] });
        //let itemsList=this.state.items;
        // debugger;
        console.log(" total calls : " + this.state.countCall);
      },
        (error) => {
          //warningAlertMsg(error);
          console.error("Please check service is Down :" + error);
          this.setState({ isLoaded: true, error: error });
        }
      )
  }
  //FORM HANDLE.
  handleToggleForm = () => {
    console.log(" handleToggleForm ");
    this.setState({ isFormOpen: !this.state.isFormOpen });
  };
  //FORM SUBIT.  
  handleSubmit = (event) => {
    console.log(" handleSubmit ");
    event.preventDefault();
    const data = new FormData(event.target);
    //debugger;
    const formData = {
      paidFor: data.get('paidFor'),
      amount: parseFloat(data.get('amount')),
      createdTime: '1679159469870',
      id: Math.floor((Math.random() * 100) + 1)
    };
    console.log(formData);
    let isValidData = validateFormData(formData);
    if (!isValidData) {
      // it execute, when validation failed
      return;
    }
    this.setState({ items: this.state.items.concat(formData) });
    //FETCH-API URL.
    fetch(SERVER_BASE_URL + URL_ADD_MONTHLY_EXPANSE, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
      .then(resp => {
        //let saveedEnity=data.entity;
        console.log(resp);
        //adding object in list.
        //debugger;
        if(resp.success==false){
          warningAlertMsg(resp.message)
          return;
        }else {
        const obj = resp.data;
        let itemList=this.state.items;
        itemList.push(obj);
        this.setState(itemList);
        warningAlertMsg(formData.paidFor + " - of Rs : " + formData.amount + " added successfully!")
        }
      })
      .catch(error => {
        console.error(error)
        warningAlertMsg("Error! : " + error);
      });
  };

  addExpanse = () => {
    console.log("AddExpanse");
    const newItem = { id: 400, paidFor: 'New User', amount: 400, createdTime: "1679159469870" };
    console.log("adding newItem : ");
    console.log(newItem);
    this.setState({ items: [...this.state.items, newItem] });
    //warningAlertMsg("Hi Add");
    return (<div><h2>Hi All</h2></div>);
  }

  addExpanseModalForm = () => {
    console.log("hey modal open.");
    warningAlertMsg("hey modal open..");
  }

}
export default Accounts;

const validateFormData = (formObj) => {
  let paidFor = formObj.paidFor;
  let amount = formObj.amount;
  if (paidFor.length < 1) {
    warningAlertMsg("Please Provide Reason in Words(3 to 100 char long)");
    return false;
  } else if (isNaN(amount) || amount < 1) {
    warningAlertMsg("Please Provide Amount in Rupees(Zero Amount is Not valid)");
    return false;
  }
  return true;
}

const warningAlertMsg = (errorMsg) => {
  alert(errorMsg);
}