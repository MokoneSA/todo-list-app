import React, { useEffect } from 'react'
// import { v4 as uuidv4 } from 'uuid'
// import TodoForm from './TodoForm'
// import TodoList from './TodoList'
// import EditTodoForm from './EditTodoForm'
import { useState } from 'react'
import {AiTwotoneDelete, AiOutlineEdit} from 'react-icons/ai'
import { IoMdAdd } from 'react-icons/io'
// import { uuid } from 'uuidv4'
// uuidv4();

const localData = () => {
    let list = localStorage.getItem('todo-list');

    if(list){
        return JSON.parse(localStorage.getItem('todo-list'))
    }else {
        return [];
    }
}

const Home = (todo) => {
    // const [todos, setTodos] = useState([])
    
    const [input,setInput] = useState("")
    const [item, setItem] = useState([])


    // Handles the add task function
    const addTodo = (e) => {
        e.preventDefault()
        // const newTaskList = [ ...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }];
        // setTodos(newTaskList);
        setItem([...item,input]);
        setInput("");
        console.log(item)
    }

    // Saving to local storage
    useEffect(() => {
        localStorage.setItem('todo-list', JSON.stringify(item));
    }, [item])

    // Handles the delete function
    // const deleteTodo = (id) => {
    //     const newTaskList = item.filter((todo) => todo.id !== id);
    //     setItem(newTaskList);
    //     localStorage.setItem('todos', JSON.stringify(item));
    // }

    // Handles the edit function
    // const editTodo = (id) => {
    //     setTodos(todos.map(( todo ) => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo )
    //      );

    // }

    // const editTask = (task, id) => {
    //     const newTaskList = todos.map(( todo ) => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo )
    //     setTodos( newTaskList );
    //     localStorage.setItem('todos')
    // }

    //
    // const toggleComplete = (id) => {
    //     //const newTaskList = [ ...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }];
    //     const newTaskList = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed} : todo)
    //     setTodos(newTaskList);
    //     localStorage.setItem('todos', JSON.stringify(newTaskList));
    // }


    // useEffect(() => {
    //     const savedTodoList = JSON.parse(localStorage.getItem('todos')) || [];
    //     setTodos(savedTodoList);
    // }, []);

    return (
    <div className='todo-app'>
        {/* <div>
            <h1>Todo App</h1>
            <TodoForm addTodo={addTodo} />
        </div>
        <div>
            { todo.map((todo) => todo.isEditing ? 
                ( < EditTodoForm editTodo={editTask} task={todo} /> ) : 
                ( < TodoList key={todo.id} task={todo} deleteTodo={deleteTodo} editTodo={editTodo} toggleComplete={toggleComplete} todo={todo} /> )) }
            {/* <TodoList key={todo.id} task={todo} deleteTodo={deleteTodo} editTodo={editTodo} toggleComplete={toggleComplete} />
        </div> */}
        <div >
            <h1>Todo List App</h1>
            <form className='todolist-form' onSubmit={addTodo}>
                <input type='text' onChange={(e) => setInput(e.target.value)} />
                <button><IoMdAdd className='add-btn'/></button>
            </form>
        </div>
        <div className='todolist-display'>
            {
                item.map((val) => (
                    <div className='display-list'>
                        <h2>{val}</h2>
                        <AiOutlineEdit className='edit-btn'/>
                        <AiTwotoneDelete className='delete-btn' />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Home;