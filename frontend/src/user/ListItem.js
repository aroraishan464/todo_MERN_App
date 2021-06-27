import React, { Component } from 'react';
import '../styling/todoListItem.scss'
import { updateTodo, deleteTodo } from './helper/backend';
import { isAuthenticated } from '../auth/helper/authBackend';

const _ = require("lodash");
const moment = require("moment");

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: this.props.item.done,
        }
        this.handleCheck = this.handleCheck.bind(this);
        this.labelRef = React.createRef();
        this.trashRef = React.createRef();
    }
    handleCheck() {
        const { token, user } = isAuthenticated();
        const { item } = this.props;
        const checking = !this.state.done;
        updateTodo(token, user._id, item._id, { "done": checking })
        this.setState({ done: checking });
    }
    handleCheckBox = (event) => {
        this.setState({
            done: event.target.checked
        });
    }
    handleMouseEnter = () => {
        const { style } = this.labelRef.current;
        style.overflow = "scroll";
        style.whiteSpace = "normal";
        style.textOverflow = "normal";
        style.height = this.labelRef.current.scrollHeight + 10 + "px";
        this.trashRef.current.style.height = this.labelRef.current.scrollHeight + 10 + "px";
        style.overflow = "hidden";
    }
    handleMouseOut = () => {
        const { style } = this.labelRef.current;
        style.whiteSpace = "nowrap";
        style.textOverflow = "ellipsis";
        style.height = "8vh";
        this.trashRef.current.style.height = "8vh";
    }

    removeTodo = () => {
        const { token, user } = isAuthenticated();
        const { item } = this.props;
        _.remove(this.props.todoList, (el) => {
             return el._id === this.props.item._id;
        }); 
        this.props.updateTodoList(this.props.todoList);
        deleteTodo(token, user._id, item._id);
    }

    render() {
        const { item } = this.props;
        return (
            <li>
                <input type="checkbox" checked={this.state.done} onChange={this.handleCheckBox} onClick={this.handleCheck} />
                <label ref={this.labelRef} onMouseOver={this.handleMouseEnter} onMouseOut={this.handleMouseOut} onClick={this.handleCheck}>
                    <div className="time">{moment(item.createdAt).fromNow()}</div>
                    <br/>
                    {item.content}
                </label>
                <div ref={this.trashRef} className="remove-todo" onClick={this.removeTodo}><img src={require("./icons/trash-can.svg")} alt="remove icon"></img></div>
            </li>
        );
    }
}

export default ListItem
