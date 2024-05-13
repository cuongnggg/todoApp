const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const todos = [];
//GET
app.get('/todos', (req, res) => {
	res.json(todos);
})
//ADD
app.post('/todos', (req, res) => {
	const newTodo = req.body;
	newTodo.id = Math.random().toString(36).substr(2, 9);
	todos.push(newTodo);
	res.json(newTodo);
})

//UPDATE
app.put('/todos/:id', (req, res) => {
	const id = req.params.id;
	const updatedTodo = req.body;

	const todoIndex = todos.findIndex(todo => todo.id === id);
	if(todoIndex !== -1) {
		todos[todoIndex] = updatedTodo;
		res.json(updatedTodo);
	} else {
		res.status(404).json({message: 'Task not found'});
	}
});

//DELETE
app.delete('/todos/:id', (req, res) => {
	const id = req.params.id;
	const todoIndex = todos.findIndex(todo => todo.id === id);
	if(todoIndex !== -1) {
		todos.splice(todoIndex, 1);
		res.json({message: 'Task deleted!'});
	} else {
		res.status(404).json({message: 'Task not found'});
	}
})

app.listen(port, () => {
	console.log('Server listens on port: ' + port);
})