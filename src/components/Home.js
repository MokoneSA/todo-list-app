import React, { useState, useEffect } from 'react'

/* importing react icons */
// import { FaSearch } from "react-icons/fa"
import {AiTwotoneDelete, AiOutlineEdit, AiOutlineSearch} from 'react-icons/ai'


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
    const [searchQuery, setSearchQuery] = useState([]);
    const [Priority, setPriority] = useState()


    // Handles the radio buttons
    const handleRadioButtons = (e) => {
        setPriority(e.target.value);
        console.log(Priority)
    }


    // Handles the add task function
    const addTodo = (e) => {
        e.preventDefault()

        let newTask = {
            taskName,
            taskDescription,
            Priority
        }

        setListItem([...listItem, newTask]);
        setTaskName('');
        setTaskDescription('');
        setPriority('');
    }


    // Handles update function
    const handleUpdate = (e, task) => {
        e.preventDefault()

        let editedTask = {
            taskName,
            taskDescription,
            Priority
        }

        setTaskName(taskName)
        setTaskDescription(taskDescription)
        setPriority(Priority)

        setListItem(listItem.map(task => {
           return task.taskName === taskName ? editedTask : task
        }))

        setTaskName('');
        setTaskDescription('');
        setPriority('');

    }

    // Handle the search function
    const handleSearch = (taskName) => {

        const searchItem = JSON.parse(localStorage.getItem('todo-list'));

        setSearchQuery (
            searchItem.filter(task => {
                return task.taskName === taskName
            })
        )
        setSearchQuery()

        console.log(searchItem);

        
    }

    //Handles the delete function
    const deleteTodo = (taskName) => {
        console.log(taskName)
        const newTask = listItem.filter(task => {
            return task.taskName !== taskName
        })

        setListItem(newTask);
        console.log(newTask)
    }

    // Handles the edit function
    function handleEdit (task) {
        setTaskName(task.taskName);
        setTaskDescription(task.taskDescription);
        setPriority(task.Priority);
        
        console.log(task)
    } 

    // Saving to local storage
    useEffect(() => {
        localStorage.setItem('todo-list', JSON.stringify(listItem));
    }, [listItem])



    return (
    <>
        <div className='todo-app'>
            <div className='todolist-header'>
                <h1>Todo List App</h1>
                <form className='todolist-form'>
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
                            <div className='form-radio'>
                            <input 
                                className='radio-btn1' 
                                type='radio' 
                                name='priority' 
                                value='low'
                               
                                onChange={handleRadioButtons} 
                            /> <span className='radio-btn1'> Low </span>
                            <input 
                                className='radio-btn2' 
                                type='radio' 
                                name='priority' 
                                value='medium'
                                
                                onChange={handleRadioButtons} 
                            /> <span className='radio-btn2'> Medium </span>
                            <input 
                                className='radio-btn3' 
                                type='radio' 
                                name='priority' 
                                value='high'
                                
                                onChange={handleRadioButtons}
                            /> <span className='radio-btn3'> High </span>
                            </div>
                    </div>
                        <button className='btn-add' onClick={addTodo}>ADD</button> 
                        <button className='btn-update' onClick={(e) => handleUpdate(e, taskName)}> UPDATE</button>
                </form>
            </div>
            <div className='todolist-display'>
                <div className='search-section'>
                    <input type='text' placeholder='Search' />
                    <span><AiOutlineSearch className="searcn-btn" onClick={() => handleSearch(taskName)} /></span>
                </div>
                {
                    listItem.map((task, index) => ( 
                        <div className={`display-list ${task.Priority}`} key={index}>
                            <div className='task-details'>
                                <h3 className='task-heading'>{task.taskName}</h3>
                                <p className='task-description'>{task.taskDescription}</p>
                            </div>
                            <div>
                                <AiOutlineEdit 
                                    className='edit-btn' 
                                    onClick={() => handleEdit(task, index) } 
                                />

                                <AiTwotoneDelete 
                                    className='delete-btn' 
                                    onClick={() => deleteTodo(task.taskName)} 
                                />
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