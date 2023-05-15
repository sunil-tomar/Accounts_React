import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import template from "./About.jsx";

class About extends React.Component {

  state = {
    searchText: '',
  };

  data = [
    { id: 1, name: 'John Doe', age: 25, email: 'johndoe@example.com' },
    { id: 2, name: 'Jane Smith', age: 32, email: 'janesmith@example.com' },
    { id: 3, name: 'Bob Johnson', age: 41, email: 'bobjohnson@example.com' },
    // Add more data objects as needed
  ];

  columns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Age',
      selector: 'age',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
  ];

  handleSearch = (event) => {
    this.setState({ searchText: event.target.value });
  };

  /*filteredData = () => {
    const { searchText } = this.state;
    return this.data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };
*/
filteredData = () => {
  const { searchText } = this.state;
  return this.data.filter((item) => {
    for (let key in item) {
      if (
        item[key]
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  });
};

  render() {
    const { searchText } = this.state;
    const filteredData = this.filteredData();
    return <div>
      <h2 className="title_head">Hi About Page welcomes you</h2>
      <input
        type="text"
        value={searchText}
        onChange={this.handleSearch}
        placeholder="Search by name..."
      />
      <DataTable
        title="My DataTable"
        columns={this.columns}
        data={filteredData}
      />
    </div>;
  }
}

export default About;

