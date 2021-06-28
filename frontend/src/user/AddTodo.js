import React, { useState } from 'react'
import '../styling/addTodo.scss'
import { isAuthenticated } from '../auth/helper/authBackend';
import { createTodo } from './helper/backend';
import { v4 as uuidv4 } from 'uuid';

const AddTodo = ({ updateTodoList, todoList, getInitialTodoList }) => {

    const [inputValue, setInputValue] = useState('');

    const handleChange = event => {
        setInputValue(event.target.value);
    }

    const { token, user } = isAuthenticated();
    const addTodo = () => {
        todoList.unshift({
            _id: uuidv4(),
            content: inputValue,
            done: false,
            createdAt: Date.now()
        });
        updateTodoList(todoList);
        createTodo(token, user._id, { "content": inputValue })
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                if (data.success) {
                    getInitialTodoList();
                    setInputValue('');
                }
            });
    }

    return (
        <div>
            <div className="add-container">
                <img src={require('./icons/add_todo.svg')} alt="add todo icon" className="add_icon"></img>
                <div className="textBox">
                    <input type="text" placeholder="write your todo here" value={inputValue} onChange={handleChange} />
                </div>
                <div className="addTodo-btn" onClick={addTodo}>ADD</div>
            </div>
        </div>
    )
}

export default AddTodo
