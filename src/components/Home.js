import React, { useState, useEffect } from 'react'
import Search from './Search'
import ListItems from './ListItems'
import { BiLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'


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
    const [searchQuery, setSearchQuery] = useState("");
    const [priority, setPriority] = useState()
    const [isSearching, setIsSearching] = useState(false);

    // Handles the logout
    const navigate = useNavigate();
    const routeToLogin = () => {
    navigate('login')
    };


    // Handles the radio buttons
    const handleRadioButtons = (e) => {
        setPriority(e.target.value);
        console.log(e.target.value)
    }


    // Handles the add task function
    const addTodo = (e) => {
        e.preventDefault()

        let newTask = {
            taskName,
            taskDescription,
            priority
        }

        setListItem([...listItem, newTask]);
        setTaskName('');
        setTaskDescription('');
        setPriority('');
    }


    // Handles update function
    const handleUpdate = (e) => {
        e.preventDefault()

        let editedTask = {
            taskName,
            taskDescription,
            priority
        }

        setTaskName(taskName)
        setTaskDescription(taskDescription)
        setPriority(priority)

        setListItem(listItem.map(task => {
           return task.taskName === taskName ? editedTask : task
        }))

        setTaskName('');
        setTaskDescription('');
        setPriority('');

    }

    // Handle the search function
    const handleSearch = (taskName) => {
        const searchData = JSON.parse(localStorage.getItem('todo-list'));

        setSearchQuery (
        searchData.filter(index => {
            return index.taskName === taskName
        })
        )
        setIsSearching(true);
        console.log(searchQuery)
    };

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
                < Search onSearch={handleSearch} />
                {searchQuery.length ? 
                   <ListItems handleEdit={handleEdit} deleteTodo={deleteTodo} listItem={searchQuery} priority={priority}/>
                   :
                   <ListItems handleEdit={handleEdit} deleteTodo={deleteTodo} listItem={listItem} priority={priority}/>
                }
            </div>
            <div className='logout'>
                <button className='logout-btn' onClick={() => routeToLogin()}>LOG OUT </button><BiLogOut className='logout-icon' />
            </div>
        </div>
    </>
  );
}

export default Home;