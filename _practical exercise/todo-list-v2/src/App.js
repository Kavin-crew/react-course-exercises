import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const initialTask = [
  {
    id: 1,
    title: 'The first task title',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, vel aliquam ipsa ea consectetur quod dicta. Sapiente fugit excepturi perferendis!',
    tags: ['work', 'entertainment', 'family'],
    isDone: false,
  },
  {
    id: 2,
    title: 'The second task title',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque voluptatibus unde consequuntur doloremque vitae quod distinctio, delectus illum incidunt modi velit impedit maxime reprehenderit eos. Blanditiis quis obcaecati autem labore.',
    tags: ['work'],
    isDone: true,
  },
  {
    id: 3,
    title: 'The second task title',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    tags: ['work', 'family'],
    isDone: false,
  },
  {
    id: 4,
    title: 'The fourth task title',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit ipsum dolor sit amet consectetur, adipisicing elit.',
    tags: ['family'],
    isDone: false,
  },
  {
    id: 5,
    title: 'The fifth task title',
    text: 'Lorem ipsum dolor sit.',
    tags: ['work', 'study'],
    isDone: true,
  },
];

const initialTags = [
  {
    id: '1',
    text: 'Work',
    color: '#0076dc',
  },
  {
    id: '2',
    text: 'Family',
    color: '#0ecad4',
  },
  {
    id: '3',
    text: 'Study',
    color: '#6a92b8',
  },
  {
    id: '4',
    text: 'Hobby',
    color: '#66adea',
  },
  {
    id: '5',
    text: 'Others',
    color: '#8f75ef',
  },
];

export default function App() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [toDo, setTodo] = useState(initialTask);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [sortBy, setSortBy] = useState(false);
  const [curOpenEdit, setCurOpenEdit] = useState(null);

  function handleOpenForm() {
    setPopupOpen(open => !open);
  }

  function handleOpenUpdateForm() {
    setSelectedTodo(open => !open);
  }

  // adding
  function handleAddToDo(newToDo) {
    setTodo(toDos => [...toDos, newToDo]);
    setPopupOpen(false);
  }

  // editing
  function handleSelection(toDo) {
    setSelectedTodo(selected => (selected?.id === toDo.id ? null : toDo));
  }

  function handleUpdateTodo(updatedTodo) {
    setTodo(toDos =>
      toDos.map(todo =>
        todo.id === selectedTodo.id
          ? { ...todo, title: updatedTodo.title, text: updatedTodo.text }
          : todo
      )
    );
  }

  // deleting
  function handleDeleteToDo(id) {
    setTodo(toDos => toDos.filter(todo => todo.id !== id));
    setPopupOpen(false);

    toast('Removed task!', {
      icon: '🗑️',
    });
  }

  // toggle task done
  function handleToggleTodo(id) {
    setTodo(toDos =>
      toDos.map(todo =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }

  function handleToggleHideTodo() {
    setSortBy(sorted => !sorted);
  }

  return (
    <div className="container">
      <Toaster />
      <Header handleOpenForm={handleOpenForm} />
      <Sidebar onSortTodo={handleToggleHideTodo} />
      <Main
        toDo={toDo}
        onDelete={handleDeleteToDo}
        onSelection={handleSelection}
        onToggleTodo={handleToggleTodo}
        sortBy={sortBy}
        initialTags={initialTags}
        curOpenEdit={curOpenEdit}
        setCurOpenEdit={setCurOpenEdit}
      />

      {/* adding new todo */}
      {popupOpen && (
        <>
          <PopUpForm onOpenForm={handleOpenForm} onAddToDo={handleAddToDo} />
          <PopUpOverlay onOpenForm={handleOpenForm} />
        </>
      )}

      {/* updating todo */}
      {selectedTodo && (
        <>
          <PopUpFormUpdate
            onUpdateTodo={handleUpdateTodo}
            onSelection={setSelectedTodo}
            selectedTodo={selectedTodo}
            onOpenForm={handleOpenUpdateForm}
          />
          <PopUpOverlay onOpenForm={handleOpenUpdateForm} />
        </>
      )}
    </div>
  );
}

function Header({ handleOpenForm }) {
  return (
    <header className="header">
      <h1>todo</h1>
      <button className="btn" onClick={handleOpenForm}>
        <span role="button" aria-label="plus">
          ➕
        </span>
      </button>
    </header>
  );
}

function Sidebar({ onSortTodo }) {
  return (
    <aside className="sidebar">
      <TagList onSortTodo={onSortTodo} />
    </aside>
  );
}

function TagList({ onSortTodo }) {
  return (
    <>
      <ul className="tag__list">
        {initialTags.map(tag => (
          <Tag tag={tag} key={tag.id} />
        ))}
      </ul>
      <input
        type="checkbox"
        name="done-task"
        id="done-task"
        onChange={onSortTodo}
      />
      <label htmlFor="done-task">Hide Done Tasks</label>
    </>
  );
}

function Tag({ tag }) {
  return (
    <li className="tag__item">
      <button className="btn">
        <span style={{ backgroundColor: tag.color }}>&nbsp;</span> {tag.text}
      </button>
    </li>
  );
}

function Main({
  toDo,
  onDelete,
  onSelection,
  onToggleTodo,
  sortBy,
  initialTags,
  curOpenEdit,
  setCurOpenEdit,
}) {
  // derived state based on the todo array
  let sortedTodo;
  if (sortBy === false) sortedTodo = toDo;
  if (sortBy === true)
    sortedTodo = toDo.slice().filter(done => done.isDone === false);

  return (
    <main className="main">
      {sortedTodo.map((task, i) => (
        <MainContent
          task={task}
          key={task.id}
          onDelete={onDelete}
          onSelection={onSelection}
          onToggleTodo={onToggleTodo}
          initialTags={initialTags}
          curOpenEdit={curOpenEdit}
          setCurOpenEdit={setCurOpenEdit}
          num={i}
        />
      ))}
    </main>
  );
}

function MainContent({
  task,
  onDelete,
  onSelection,
  onToggleTodo,
  initialTags,
  curOpenEdit,
  setCurOpenEdit,
}) {
  return (
    <section className={`main__content ${task.isDone ? 'isDone' : ''}`}>
      <h2 style={task.isDone ? { textDecoration: 'line-through' } : {}}>
        {task.title}
      </h2>
      <p style={task.isDone ? { textDecoration: 'line-through' } : {}}>
        {task.text}
      </p>
      <div className="content__tags">
        <TagContentList task={task} initialTags={initialTags} key={task.id} />

        <div className="main__checkbox">
          <input
            type="checkbox"
            name={`done${task.id}`}
            id="done"
            value={task.isDone}
            defaultChecked={task.isDone}
            onChange={() => onToggleTodo(task.id)}
          />
          <label htmlFor={`done${task.id}`}>Done</label>
        </div>

        <EditControl
          task={task}
          onDelete={onDelete}
          onSelection={onSelection}
          curOpenEdit={curOpenEdit}
          setCurOpenEdit={setCurOpenEdit}
        />
      </div>
    </section>
  );
}

function TagContentList({ task, initialTags }) {
  const [tagColor, setTagColor] = useState(initialTags);
  const [taskColor, setTaskColor] = useState(task.tags);

  return (
    <ul className="content__tags_list">
      {taskColor.map((tag, i) => (
        <TagContent tag={tag} key={tag.id} />
      ))}
    </ul>
  );
}

function TagContent({ color }) {
  console.log(color);
  return (
    <li className="content__tag">
      <span style={{ background: color }}>&nbsp;</span>
    </li>
  );
}

function EditControl({
  task,
  onSelection,
  onDelete,
  curOpenEdit,
  setCurOpenEdit,
}) {
  const isOpen = task.id === curOpenEdit;

  function handleOpenControls() {
    setCurOpenEdit(isOpen ? null : task.id);
  }

  function handleOnEdit() {
    onSelection(task);
    setCurOpenEdit(false);
  }
  return (
    <div className="edit">
      <button className="btn" onClick={handleOpenControls}>
        ...
      </button>

      {isOpen && (
        <div className="controls">
          <button className="btn" onClick={handleOnEdit}>
            Edit
          </button>
          <button className="btn" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

function PopUpForm({ onOpenForm, onAddToDo }) {
  // adding states to new input as New To Do item
  const [newToDoTitle, setNewToDoTitle] = useState('');
  const [newToDoText, setNewToDoText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!newToDoText || !newToDoTitle) {
      toast.error('Please input all fields');
      return;
    }

    const id = crypto.randomUUID();
    const newToDoEntry = {
      id,
      title: newToDoTitle,
      text: newToDoText,
      isDone: false,
      tags: [],
    };

    onAddToDo(newToDoEntry);

    toast.success('Successfully added!');
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      toDoTitle={newToDoTitle}
      toDoText={newToDoText}
      seToDoTitle={setNewToDoTitle}
      setToDoText={setNewToDoText}
      onSelection={onOpenForm}
    />
  );
}

function PopUpFormUpdate({
  selectedTodo,
  onUpdateTodo,
  onSelection,
  onOpenForm,
}) {
  // adding states to new input as New To Do item
  const [newToDoTitle, setNewToDoTitle] = useState(selectedTodo.title);
  const [newToDoText, setNewToDoText] = useState(selectedTodo.text);

  function handleSubmit(e) {
    e.preventDefault();

    const updatedTodo = { title: newToDoTitle, text: newToDoText };

    onUpdateTodo(updatedTodo);

    onSelection(null);

    toast.success('Successfully updated!');
  }

  // function handleOpenForm() {
  //   onSelection(open => !open);
  // }

  return (
    <Form
      handleSubmit={handleSubmit}
      toDoTitle={newToDoTitle}
      toDoText={newToDoText}
      seToDoTitle={setNewToDoTitle}
      setToDoText={setNewToDoText}
      onSelection={onOpenForm}
    />
  );
}

function Form({
  handleSubmit,
  onSelection,
  toDoTitle,
  toDoText,
  seToDoTitle,
  setToDoText,
}) {
  return (
    <form className="form" onSubmit={handleSubmit} method="post">
      <button className="btn form__close_btn" onClick={onSelection}>
        <span role="button" aria-label="close">
          ❌
        </span>
      </button>
      <div className="form__container">
        <div className="form__row">
          <label htmlFor="form__title">Title: </label>
          <input
            type="text"
            name="form__title"
            value={toDoTitle}
            onChange={e => seToDoTitle(e.target.value)}
            placeholder="Add title *"
            required
          />
        </div>
        <div className="form__row">
          <label htmlFor="form__text">Text: </label>
          <textarea
            type="text"
            name="form__text"
            className="form__text"
            value={toDoText}
            onChange={e => setToDoText(e.target.value)}
            placeholder="Add short description *"
            required
          />
        </div>

        <button className="btn btn-save">Save</button>
      </div>
    </form>
  );
}

function PopUpOverlay({ onOpenForm }) {
  return <div className="pop_up__overlay" onClick={onOpenForm}></div>;
}
