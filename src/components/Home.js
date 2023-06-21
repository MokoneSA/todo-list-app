import React, { useState, useEffect } from 'react'
// import { v4 as uuidv4 } from 'uuid'
// import TodoForm from './TodoForm'
// import TodoList from './TodoList'
// import EditTodoForm from './EditTodoForm'

/* importing react icons */
import {AiTwotoneDelete, AiOutlineEdit} from 'react-icons/ai'
// import { IoMdAdd } from 'react-icons/io'

const localData = () => {
    let list = localStorage.getItem('todo-list');

    if(list){
        return JSON.parse(localStorage.getItem('todo-list'))
    }else {
        return [];
    }
}

const Home = () => {
    
    const [listItem, setListItem] = useState(localData());
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");



    // Handles the add task function
    const addTodo = (e) => {
        e.preventDefault()

        let newTask = {
            taskName,
            taskDescription
        }

        setListItem([...listItem, newTask]);
        setTaskName('')
        setTaskDescription('')

        console.log(newTask)
        
    }

    //Handles the delete function
    const deleteTodo = () => {

        const filteredItem = listItem.filter((value, index) => {
            console.log(value !== value )
            console.log(value);
        });

        setListItem(filteredItem);
        console.log('Selected item', filteredItem)

        // let firstNames = ["super", "spider", "ant", "iron"]
        // let male = "man";
        // let female = "woman";

        // let fullNames = firstNames.map(function(firstName, index) {
        //     return (index == 0) ? firstName + female : firstName + male;
        // });

        // console.log(fullNames);

    }

    // Saving to local storage
    useEffect(() => {
        localStorage.setItem('todo-list', JSON.stringify(listItem));
    }, [listItem])

    

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
    <>
        <div className='todo-app'>
            <div className='todolist-header'>
                <h1>Todo List App</h1>
                <form className='todolist-form' onSubmit={addTodo}>
                    <div className='form-inputs'>
                        <input 
                        type='text'
                        required
                        value={taskName} 
                        onChange={(e) => setTaskName(e.target.value)} 
                        placeholder='Enter task name'
                        />
                        <input 
                        type='text'
                        required
                        value={taskDescription} 
                        onChange={(e) => setTaskDescription(e.target.value)} 
                        placeholder='Enter description'
                        />
                    </div>
                    <div className='form-check'>
                            <input type='radio' name='priority' value='low' /> Low
                            <input type='radio' name='priority' value='medium'/>Medium
                            <input type='radio' name='priority' value='high'/>High
                    </div>
                    <button className='btn-add'>ADD</button>
                </form>
            </div>
            <div className='todolist-display'>
                {
                    listItem.map((task, index) => (
                        <div className='display-list' key={index}>
                            <div className='task-details'>
                                <h3 className='task-heading'>{task.taskName}</h3>
                                <p className='task-description'>{task.taskDescription}</p>
                            </div>
                            <div>
                                <AiOutlineEdit className='edit-btn' />
                                <AiTwotoneDelete className='delete-btn' onClick={deleteTodo} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  );
}

export default Home;