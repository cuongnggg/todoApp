const API_URL = 'http://localhost:3000/todos';

const app = {
  	todos: [],

  	addTodo() {
	    if (this.newTodoText.trim()) {
			const newTodo = {
				id: Math.random().toString(36).substr(2, 9),
				text: this.newTodoText,
				completed: false
			};

	      	this.todos.push(newTodo);
	      	this.newTodoText = '';

	      	fetch(API_URL, {
	        	method: 'POST',
	        	headers: {
	          		'Content-Type': 'application/json'
	        	},
	        	body: JSON.stringify(newTodo)
	      	})
	        .then(response => response.json())
	        .then(data => {
	          this.todos.unshift(data);
	          this.newTodoText = '';
	        })
	        .catch(error => {
	          console.error(error);
	        });
	    }
  	},

  	deleteTodo(id) {
    	this.todos = this.todos.filter(todo => todo.id !== id);

	    fetch(`${API_URL}/${id}`, {
	      	method: 'DELETE'
	    })
	    .then(response => response.json())
	    .then(data => {
	        console.log('Todo deleted');
	    })
	    .catch(error => {
	       console.error(error);
	    });
  	}
};