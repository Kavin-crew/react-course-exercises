import { useState } from 'react';
import './App.css';

const initialTask = [
  {
    id: 1,
    text: 'buy bread',
  },
  {
    id: 2,
    text: 'go shopping',
  },
  {
    id: 3,
    text: 'go to school',
  },
  {
    id: 4,
    text: 'go study',
  },
];

export default function App() {
  const [toDo, setToDo] = useState(initialTask);
  const [selectedTodo, setSelectedTodo] = useState(null);

  function handleAddTodo(newToDo) {
    setToDo(toDos => [...toDos, newToDo]);
    setSelectedTodo(null);
  }

  function handleDeleteTodo(id) {
    setToDo(todos => todos.filter(todo => todo.id !== id));
    setSelectedTodo(null);
  }

  function handleSelection(todo) {
    // if selected id is null, we can do optional chaining to check if selected does exist
    setSelectedTodo(selected => (selected?.id === todo.id ? null : todo));
  }

  function handleUpdateTodo(updatedTodo) {
    setToDo(todos =>
      todos.map(todo =>
        todo.id === selectedTodo.id ? { ...todo, text: updatedTodo } : todo
      )
    );
  }

  return (
    <div className="app">
      <div className="container">
        <Header />
        <TaskToDo onAddToDo={handleAddTodo} />
        <TodoList
          toDo={toDo}
          onDeleteToDo={handleDeleteTodo}
          onSelection={handleSelection}
        />
      </div>
      {selectedTodo && (
        <FormUpdateTodo
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          onUpdateTodo={handleUpdateTodo}
        />
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Get Things Done!</h1>
    </header>
  );
}

function TaskToDo({ onAddToDo }) {
  const [newToDo, setNewToDo] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!newToDo) return;
    const id = crypto.randomUUID();
    const newItem = { id, text: newToDo };
    onAddToDo(newItem);
    setNewToDo('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What is the task today?"
        value={newToDo}
        onChange={e => setNewToDo(e.target.value)}
      />
      <button className="btn">Add Task</button>
    </form>
  );
}

function TodoList({ toDo, onDeleteToDo, onSelection }) {
  return (
    <ul className="list">
      {toDo.map(todo => (
        <ToDo
          todo={todo}
          key={todo.id}
          onDeleteToDo={onDeleteToDo}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

function ToDo({ todo, onDeleteToDo, onSelection }) {
  return (
    <li className="todo__item">
      <span>{todo.text}</span>
      <button onClick={() => onSelection(todo)}>📝</button>
      <button onClick={() => onDeleteToDo(todo.id)}>❌</button>
    </li>
  );
}

function FormUpdateTodo({ selectedTodo, onUpdateTodo, setSelectedTodo }) {
  const [updatedTodo, setUpdatedTodo] = useState(selectedTodo.text);

  function handleUpdateTodo(e) {
    e.preventDefault();
    onUpdateTodo(updatedTodo);
    setUpdatedTodo(updatedTodo);
    setSelectedTodo(null);
  }
  return (
    <form onSubmit={handleUpdateTodo}>
      <span onClick={() => setSelectedTodo(null)}>❌</span>
      <input
        type="text"
        value={updatedTodo}
        onChange={e => setUpdatedTodo(e.target.value)}
      />
      <button className="btn">Update</button>
    </form>
  );
}
