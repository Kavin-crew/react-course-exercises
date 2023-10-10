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
    isDone: false,
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
    isDone: false,
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

  function handleOpenForm() {
    setPopupOpen(open => !open);
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

  return (
    <div className="container">
      <Toaster />
      <Header handleOpenForm={handleOpenForm} />
      <Sidebar />
      <Main
        toDo={toDo}
        onDelete={handleDeleteToDo}
        onSelection={handleSelection}
      />

      {selectedTodo && (
        <PopUpFormUpdate
          onUpdateTodo={handleUpdateTodo}
          onSelection={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
      {selectedTodo && <PopUpOverlayUpdate onSelection={setSelectedTodo} />}

      {popupOpen && (
        <PopUpForm onOpenForm={handleOpenForm} onAddToDo={handleAddToDo} />
      )}
      {popupOpen && <PopUpOverlay onOpenForm={handleOpenForm} />}
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

function Sidebar() {
  return (
    <aside className="sidebar">
      <TagList />
    </aside>
  );
}

function TagList() {
  return (
    <>
      <ul className="tag__list">
        {initialTags.map(tag => (
          <Tag tag={tag} key={tag.id} />
        ))}
      </ul>
      <input type="checkbox" name="done-task" id="done-task" />
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

function Main({ toDo, onDelete, onSelection }) {
  return (
    <main className="main">
      {toDo.map(task => (
        <MainContent
          task={task}
          key={task.id}
          onDelete={onDelete}
          onSelection={onSelection}
        />
      ))}
    </main>
  );
}

function MainContent({ task, onDelete, onSelection }) {
  return (
    <section className="main__content">
      <h2>{task.title}</h2>
      <p>{task.text}</p>
      <div className="content__tags">
        <TagContentList />

        <div className="main__checkbox">
          <input type="checkbox" name="done" id="done" />
          <label htmlFor="done">Done</label>
        </div>

        <EditControl
          task={task}
          onDelete={onDelete}
          onSelection={onSelection}
        />
      </div>
    </section>
  );
}

function TagContentList() {
  return (
    <ul className="content__tags_list">
      <TagContent />
    </ul>
  );
}

function TagContent() {
  return (
    <li className="content__tag">
      <span>&nbsp;</span>
    </li>
  );
}

function EditControl({ task, onSelection, onDelete }) {
  return (
    <div className="edit">
      <button className="btn">...</button>

      <div className="controls">
        <button className="btn" onClick={() => onSelection(task)}>
          Edit
        </button>
        <button className="btn" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
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
      tags: [],
    };

    onAddToDo(newToDoEntry);

    toast.success('Successfully added!');
  }

  return (
    <form className="form" onSubmit={handleSubmit} method="post">
      <button className="btn form__close_btn" onClick={onOpenForm}>
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
            value={newToDoTitle}
            onChange={e => setNewToDoTitle(e.target.value)}
          />
        </div>
        <div className="form__row">
          <label htmlFor="form__text">Text: </label>
          <textarea
            type="text"
            name="form__text"
            className="form__text"
            value={newToDoText}
            onChange={e => setNewToDoText(e.target.value)}
          />
        </div>
        <ul className="form__tag_list">
          <li className="form__tag_item">
            <input type="checkbox" name="form__Work" id="form__Study" />
            <label htmlFor="form__Work">Work</label>
          </li>
          <li className="form__tag_item">
            <input type="checkbox" name="form__Family" id="form__Family" />
            <label htmlFor="form__Family">Family</label>
          </li>
          <li className="form__tag_item">
            <input type="checkbox" name="form__Study" id="form__Study" />
            <label htmlFor="form__Study">Study</label>
          </li>
          <li className="form__tag_item">
            <input type="checkbox" name="form__Hobby" id="form__Hobby" />
            <label htmlFor="form__Hobby">Hobby</label>
          </li>
          <li className="form__tag_item">
            <input type="checkbox" name="form__Others" id="form__Others" />
            <label htmlFor="form__Others">Others</label>
          </li>
        </ul>
        <button className="btn btn-save">Save</button>
      </div>
    </form>
  );
}

function PopUpFormUpdate({ selectedTodo, onUpdateTodo, onSelection }) {
  console.log(onSelection);
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

  return (
    <form className="form" onSubmit={handleSubmit} method="post">
      <button
        className="btn form__close_btn"
        onClick={() => onSelection(open => !open)}
      >
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
            value={newToDoTitle}
            onChange={e => setNewToDoTitle(e.target.value)}
          />
        </div>
        <div className="form__row">
          <label htmlFor="form__text">Text: </label>
          <textarea
            type="text"
            name="form__text"
            className="form__text"
            value={newToDoText}
            onChange={e => setNewToDoText(e.target.value)}
          />
        </div>

        <button className="btn btn-save">Update</button>
      </div>
    </form>
  );
}

function PopUpOverlayUpdate({ onSelection }) {
  return (
    <div
      className="pop_up__overlay"
      onClick={() => onSelection(open => !open)}
    ></div>
  );
}

function PopUpOverlay({ onOpenForm }) {
  return <div className="pop_up__overlay" onClick={onOpenForm}></div>;
}
