import React from 'react';
import Button from 'react-bootstrap/Button';
import ItemList from './ItemList.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class CategoryList extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = { categories: [], nextID: 0, editIndex: 0, input: "", mode:"Add"}
    }
  
    submit() {
      if (this.state.mode === "Add")
      {
        this.setState({ 
          nextID: this.state.nextID + 1,
          input: "",
          categories: [...this.state.categories, 
                  {input: this.state.input, id: this.state.nextID + 1}]
        })
      } 
      else 
      {
        var newItems = this.state.items;
        newItems[this.state.editIndex].item = this.state.input;

        this.setState({ 
          mode: "Add",
          input: "",
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
        input: editItem.item,
        mode: "Edit",
        editIndex: this.state.items.indexOf(editItem)
      })    
    } 

    render 
  
    render() {
      return (
        <div>
            <div className="row">
                <div className="title">
                    <h1>Categories</h1>
                </div>
                <input className="input-group" type="text" 
                onChange={(event) => this.setState({input: event.target.value})}
                value={this.state.input} />
                <Button className="my-btn" variant="light"  onClick={this.submit.bind(this)}>{this.state.mode}</Button>     
            </div>
            <div className="row">
                {this.state.categories.map(element => <ItemList category={element.input}/>)}
            </div>
        </div>
      )
    }
  
  };
  
  export default CategoryList;