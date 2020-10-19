//Author: Dr. Kevin Browne, McMaster University

import React from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// This is an example of managing a list of items in React, including delete,
// edit and add operations for the list!

class ItemList extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = { category: props.category?props.category: "Misc.", items: [], nextID: 0, editIndex: 0, input: "", mode:"Add"}
  }

  // We change the text/behavior of our button depending on the mode
  submit() {
    // If we're adding an item to the list...
    if (this.state.mode === "Add")
    {
      this.setState({ 
        nextID: this.state.nextID + 1,
        input: "",
        items: [...this.state.items, 
                {item: this.state.input, id: this.state.nextID + 1}]
      })
    } 
    // If we're editing an item in the list
    else 
    {
      // Create a new items list, modify the item at the edit index
      var newItems = this.state.items;
      newItems[this.state.editIndex].item = this.state.input;


      // Flip back to Add mode, set input textbox to blank, 
      this.setState({ 
        mode: "Add",
        input: "",
        items: newItems
      })      
    }
  }

  // Deletes an item from the list
  delete(delID) {
    
    if (this.state.mode !== "Edit")
    {
      this.setState({ 
        items: this.state.items.filter( ({item,id}) => id !== delID )
      })
    }    
  }

  // Sets the list to edit mode
  edit(editID) {

    var editItem = this.state.items.find( ({item,id}) => id === editID );

    this.setState({ 
      input: editItem.item,
      mode: "Edit",
      editIndex: this.state.items.indexOf(editItem)
    })    
  } 

  render() {
    return (
      <div class="col-sm">
        <div class="category-title">
          <h3>{this.state.category}</h3>  
        </div>
        <input class="input-group" type="text" 
            onChange={(event) => this.setState({input: event.target.value})}
            value={this.state.input} />
        <Button className="my-btn" variant="light"  onClick={this.submit.bind(this)}>{this.state.mode}</Button>       
        <ListGroup>
        {this.state.items.map( 
            ({item,id}) => 
            <ListGroupItem key={id}>
                {item}
                <Button className="my-btn" variant="light" onClick={this.edit.bind(this,id)}> Edit </Button> 
                <Button className="my-btn" variant="light" onClick={this.delete.bind(this,id)}> Delete </Button> 
            </ListGroupItem> )}
        </ListGroup>
      </div>
    )
  }

};

export default ItemList;