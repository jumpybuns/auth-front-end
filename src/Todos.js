import React, { Component } from 'react'
import request from 'superagent'


export default class Todos extends Component {
    state = {
        todos: [],
        todo: '',
        loading: false

    }

    componentDidMount = async () => {
        await this.fetchTodos()
    }

    fetchTodos = async () => {
        const { token } = this.props;
        
        await this.setState({ loading: true });
        
        const response = await request.get('https://aqueous-everglades-52783.herokuapp.com/api/todos')
        .set('Authorization', token)

        await this.setState({ todos: response.body, loading: false })

    };

    handleSubmit = async (e) => {
        const { todo } = this.state;
        const { token } = this.props;

        e.preventDefault();

        const newTodo = {
            todo: todo
        };

        await this.setState({ loading: true });

        await request.post('https://aqueous-everglades-52783.herokuapp.com/api/todos')
        .send(newTodo)
        .set('Authorization', token);

        await this.fetchTodos();

    };

    handleCompletedClick = async (someId) => {
        const { token } = this.props;

        await request.put(`https://aqueous-everglades-52783.herokuapp.com/api/todos/${someId}`)
        .set('Authorization', token ) ;

        await this.fetchTodos();
    }

    render() {
        const {
            todo,
            loading,
            todos
        } = this.state;
        return (
            <div className="list">
                <p classname="You">You're Gonna Help Your Poor Old Mother Ain'cha?</p>
                <form className="todos" onSubmit={this.handleSubmit}>
                    <label>
                        Add A Todo:
                        <input value={todo} onChange={(e) => this.setState({ todo: e.target.value })} />
                    </label>
                    <label>
                        <button className="button">Add</button>
                    </label>
                </form>
                {
                    loading
                    ? 'HOl UP!!'
                    : todos.map(todo => <div key={`${todo.todo}${todo.id}${Math.random()}`} style={{
                        textDecoration: todo.completed ? 'line-through' : 'none' }
                    }>
                    todo: {todo.todo}
                    {
                        todo.completed ? '' 
                        : <button onClick={() => this.handleCompletedClick(todo.id)}>
                        Complete Todo </button>
                    }
                    </div>)
                }
            </div>
        )
    }
}
