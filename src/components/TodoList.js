import React from 'react'

const TodoList = (task,toggleComplete, deleteTodo, editTodo, todo) => {

  return (
        <div className='todo'>
            <div className='todo-list'>
                {/* <p className={`${task.completed ? 'completed' : ""}`} onClick={() => toggleComplete(task.id)}> {task.task} </p>
                <button onClick={() => editTodo(task.id)}>Edit</button>
                <button onClick={() => deleteTodo(task.id)}>Delete</button> */}
              <ul>
                {todo.map((t) => (
                  <li>
                    <span key={todo.id} onClick={() => toggleComplete(task.id)}>{task.todo}</span>
                    <button onClick={() => editTodo(todo.id)}>Edit</button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
        </div>
  )
}

export default TodoList;