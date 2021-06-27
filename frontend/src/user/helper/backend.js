
export const getTodoList = (token, userId) => {
    return fetch(`/api/user/todo-list/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const createTodo = (token, userId, todo) => {
    return fetch(`/api//todo/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(todo)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const updateTodo = (token, userId, todoId, todo) => {
    return fetch(`/api//todo/${userId}/${todoId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(todo)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const deleteTodo = (token, userId, todoId) => {
    return fetch(`/api//todo/${userId}/${todoId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}


export const changePassword = (token, userId, user) => {
    return fetch(`/api/user/changePassword/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getUser = (token, userId) => {
    return fetch(`/api/user/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const updateTheUser = (token, userId, user) => {
    
    // for (var pair of user.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }

    return fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};