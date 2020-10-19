import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import Dropdown from 'react-bootstrap/Dropdown'

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class WHList extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = { items: [], nextID: 0, editIndex: 0, store: '', priority: -1, notes:'', date: "", mode:"Add",
                    storage: ["Front Shelves", 
                                "Back Shelves", 
                                "Back Room",
                                "Fire Exit"],
                    priorities: [1,2,3,4,5]}
  }

  submit() {
    // If we're adding an item to the list...
    if (this.state.mode === "Add")
    {
      this.setState({ 
        nextID: this.state.nextID + 1,
        store: "",
        priotity: "",
        notes: "",
        date: "",
        items: [...this.state.items, 
                {record: {store: this.state.store, 
                          priority: this.state.priority, 
                          notes: this.state.notes, 
                          date: this.state.date},
                id: this.state.nextID + 1}]
      })
    } 
    else 
    {
      var newItems = this.state.items;

      newItems[this.state.editIndex].record.store = this.state.store ?? newItems[this.state.editIndex].record.name;
      newItems[this.state.editIndex].record.priority = this.state.priority ?? newItems[this.state.editIndex].record.priority;
      newItems[this.state.editIndex].record.date = this.state.date ?? newItems[this.state.editIndex].record.date;
      newItems[this.state.editIndex].record.notes = this.state.notes ?? newItems[this.state.editIndex].record.notes;

      this.setState({ 
        mode: "Add",
        store: "",
        priority: "",
        notes: "",
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
      store: editItem.record.store,
      priority: editItem.record.priority,
      notes: editItem.record.notes,
      date: editItem.record.date,
      mode: "Edit",
      editIndex: this.state.items.indexOf(editItem)
    })    
  } 

  render() {
    return (
      <div className="col-sm">
        <div className="category-title">
          <h3>Warehouse Tasks</h3>  
        </div>
        <div className="inputs">
            <Dropdown className="employee" onSelect={(event)  => this.setState({store: this.state.storage[event ?? 0]})}>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                {this.state.store != ""? this.state.store: "Storage Area"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {this.state.storage.map((store, id) => 
                                        <Dropdown.Item eventKey={id}> {store} </Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="employee" onSelect={(event)  => this.setState({priority: this.state.priorities[event ?? 0]})}>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                {this.state.priority > 0? this.state.priority: "Priority"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {this.state.priorities.map((store, id) => 
                                        <Dropdown.Item eventKey={id}> {store} </Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
            <DatePicker className = "date" 
                        placeholder = "Deadline"
                        selected={this.state.date}
                        onChange={(value, event)  => this.setState({date: value})}
                        value={this.state.date}/>
            <input className="input-group description" type="text" placeholder="Notes"
                onChange={(event) => this.setState({notes: event.target.value})}
                value={this.state.notes || ''} />
            <Button className = "my-btn" variant="light"  onClick={this.submit.bind(this)}>{this.state.mode}</Button>     
        </div>
  
        <ListGroup>
        {this.state.items.map( 
            ({record,id}) => 
            <ListGroupItem key={id}>
              {Object.keys(record).map((key) => <p>{record[key].toString()}</p>)}
              <Button variant="light" onClick={this.edit.bind(this,id)}> Edit </Button> 
              <Button variant="light" onClick={this.delete.bind(this,id)}> Delete </Button> 
            </ListGroupItem>)}
        </ListGroup>
      </div>
    )
  }

};

export default WHList;