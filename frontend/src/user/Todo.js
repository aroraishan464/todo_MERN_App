import React, { useState, useEffect } from 'react'
import Base from '../Core/Base'
import '../styling/todo.scss'
import { isAuthenticated } from '../auth/helper/authBackend'
import { getTodoList } from './helper/backend'
import { Redirect } from 'react-router-dom'

import Header from './Header'
import AddTodo from './AddTodo'
import ListItem from './ListItem'

function Todo() {

    const [todoList, setTodoList] = useState(null);

    const { token, user } = isAuthenticated();

    const getInitialTodoList = () => {
        if (isAuthenticated()) {
            getTodoList(token, user._id)
                .then(data => {
                    setTodoList(data);
                });
        }
    }

    useEffect(getInitialTodoList, []);

    const updateTodoList = (todoList) => {
        const data = Array.from(todoList);
        setTodoList(data);
    }

    return (
        <React.Fragment>
            <Base>
                <div className="todo-container">
                    <Header />
                    <AddTodo updateTodoList={updateTodoList} getInitialTodoList={getInitialTodoList} todoList={todoList} />
                    <div className="todos-container">
                        <ul>
                            {todoList && todoList.map((item, index) => (
                                <ListItem item={item} key={item._id} updateTodoList={updateTodoList}
                                    getInitialTodoList={getInitialTodoList} todoList={todoList} />)
                            )}
                        </ul>
                    </div>
                </div>
            </Base>
            {!isAuthenticated() && <Redirect to="/" />}
        </React.Fragment>
    )
}

export default Todo


