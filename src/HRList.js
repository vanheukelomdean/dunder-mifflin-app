import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

class HRList extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = { items: [], nextID: 0, editIndex: 0, name: '', desc:'', date: '', mode:"Add",
                    employees: ["Michael Scott", 
                                "Jim Halpert", 
                                "Pam Beeesly",
                                "Dwight Schrute",
                                "Stanley Hudson",
                                "Andy Bernard",
                                "Phyllis Vance",
                                "Erin Hannon",
                                "Oscar Martinez",
                                "Angela Martin",
                                "Kevin Malone",
                                "Pete Miller",
                                "Ryan Howard",
                                "Kelly Kapoor",
                                "Darryl Philbin"]}
  }

  submit() {
    if (this.state.mode === "Add")
    {
      var obj = 
      console.log(obj);

      this.setState({ 
        name: "",
        desc: "",
        date: "",
        nextID: this.state.nextID + 1,
        items: [...this.state.items,
                  {record: {name: this.state.name,
                            desc: this.state.desc,
                            date: this.state.date}, 
                  id: this.state.nextID + 1}]
      })
      console.log(this.state.items);
    } 
    else 
    {
      var newItems = this.state.items;

      newItems[this.state.editIndex].record.name = this.state.name ?? newItems[this.state.editIndex].record.name;
      newItems[this.state.editIndex].record.desc = this.state.desc ?? newItems[this.state.editIndex].record.desc;
      newItems[this.state.editIndex].record.date = this.state.date ?? newItems[this.state.editIndex].record.date;

      this.setState({ 
        mode: "Add",
        name: "",
        desc: "",
        date: "",
        items: newItems
      })      
    }
  }

  delete(delID) {
    
    if (this.state.mode !== "Edit")
    {
      this.setState({ 
        items: this.state.items.filter( ({item,id}) => id !== delID )
      })
    }    
  }

  edit(editID) {

    var editItem = this.state.items.find( ({item,id}) => id === editID );

    this.setState({ 
      mode: "Edit",
      name: editItem.record.name,
      desc: editItem.record.desc,
      date: editItem.record.date,
      editIndex: this.state.items.indexOf(editItem)
    })    
  } 

  render() {
    return (
      <div className="col-sm">
        <div className="category-title">
          <h3>HR Incidents</h3>  
        </div>
        <div className="inputs">
            <Dropdown className="employee" onSelect={(event)  => this.setState({name: this.state.employees[event?? 0]})}>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    {this.state.name != ""? this.state.name: "Employee"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {this.state.employees.map((employee, id) => 
                                        <Dropdown.Item eventKey={id}> {employee} </Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
            <input className="input-group description" type="text" placeholder="Description"
                    onChange={(event) => this.setState({desc: event.target.value})}
                    value={this.state.desc || ''} />
            <DatePicker className = "date" 
                        selected={this.state.date}
                        onChange={(value, event)  => this.setState({date: value})}
                        value={this.state.date}/>
            <Button variant="light"  onClick={this.submit.bind(this)}>{this.state.mode}</Button>       
        </div>

        <ListGroup>
        {this.state.items.map( 
            ({record, id}) => 
            <ListGroupItem key={id}>
              {Object.keys(record).map((key) => <p>{record[key].toString()}</p>)}
              <Button className="my-btn" variant="light" onClick={this.edit.bind(this,id)}> Edit </Button> 
              <Button className="my-btn" variant="light" onClick={this.delete.bind(this,id)}> Delete </Button> 
            </ListGroupItem>)}
        </ListGroup>
      </div>
    )
  }

};

export default HRList;