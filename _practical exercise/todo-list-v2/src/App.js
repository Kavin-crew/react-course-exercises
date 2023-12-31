import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const initialTask = [
  {
    id: 1,
    title: 'The first task title',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, vel aliquam ipsa ea consectetur quod dicta. Sapiente fugit excepturi perferendis!',
    tags: ['work', 'study', 'family', 'hobby', 'others'],
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
    text: 'work',
    color: '#0076dc',
  },
  {
    id: '2',
    text: 'family',
    color: '#0ecad4',
  },
  {
    id: '3',
    text: 'study',
    color: '#6a92b8',
  },
  {
    id: '4',
    text: 'hobby',
    color: '#66adea',
  },
  {
    id: '5',
    text: 'others',
    color: '#8f75ef',
  },
];

export default function App() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [toDo, setTodo] = useState(initialTask);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [sortBy, setSortBy] = useState(false);
  const [curOpenEdit, setCurOpenEdit] = useState(null);
  const [sortByCat, setSortByCat] = useState(null);

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
          ? {
              ...todo,
              title: updatedTodo.title,
              text: updatedTodo.text,
              tags: updatedTodo.tags,
            }
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

  function handleSetCategory(category) {
    setSortByCat(curCat => (curCat === category ? null : category));
  }

  return (
    <div className="container">
      <Toaster />
      <Header handleOpenForm={handleOpenForm} />
      <Sidebar
        onSortTodo={handleToggleHideTodo}
        onSetCategory={handleSetCategory}
        sortByCat={sortByCat}
      />
      <Main
        toDo={toDo}
        onDelete={handleDeleteToDo}
        onSelection={handleSelection}
        onToggleTodo={handleToggleTodo}
        sortBy={sortBy}
        sortByCat={sortByCat}
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
            initialTags={initialTags}
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

function Sidebar({ onSortTodo, onSetCategory, sortByCat }) {
  return (
    <aside className="sidebar">
      <TagList
        onSortTodo={onSortTodo}
        onSetCategory={onSetCategory}
        sortByCat={sortByCat}
      />
    </aside>
  );
}

function TagList({ onSortTodo, onSetCategory, sortByCat }) {
  return (
    <>
      <ul className="tag__list">
        {initialTags.map(tag => (
          <Tag
            tag={tag}
            key={tag.id}
            onSetCategory={onSetCategory}
            sortByCat={sortByCat}
          />
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

function Tag({ tag, onSetCategory, sortByCat }) {
  return (
    <li className={`tag__item ${sortByCat === tag.text ? 'active' : ''}`}>
      <button className="btn" onClick={() => onSetCategory(tag.text)}>
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
  sortByCat,
  initialTags,
  curOpenEdit,
  setCurOpenEdit,
}) {
  // derived state based on the todo array
  let sortedTodo;
  if (sortBy === false) sortedTodo = toDo;

  if (sortByCat !== null && sortBy === false)
    sortedTodo = toDo.slice().filter(todo => todo.tags.includes(sortByCat));

  if (sortByCat !== null && sortBy === true)
    sortedTodo = toDo.slice().filter(done => done.isDone === false);

  // if (sortByCat === 'work')
  //   sortedTodo = toDo.slice().filter(todo => todo.tags.includes('work'));
  // if (sortByCat === 'family')
  //   sortedTodo = toDo.slice().filter(todo => todo.tags.includes('family'));
  // if (sortByCat === 'study')
  //   sortedTodo = toDo.slice().filter(todo => todo.tags.includes('study'));
  // if (sortByCat === 'hobby')
  //   sortedTodo = toDo.slice().filter(todo => todo.tags.includes('hobby'));
  // if (sortByCat === 'others')
  //   sortedTodo = toDo.slice().filter(todo => todo.tags.includes('others'));

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
  const tags = [...task.tags];

  return (
    <ul className="content__tags_list">
      {tags.map((tag, i) => (
        <TagContent
          tag={tag}
          key={`${Math.random() + 1 + task.id}`}
          initialTags={initialTags}
        />
      ))}
    </ul>
  );
}

function TagContent({ tag, initialTags }) {
  let color;
  initialTags.filter(initTag =>
    initTag.text === tag ? (color = initTag.color) : ''
  );

  return (
    <li className="content__tag" key={tag.id * 100}>
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
  const [work, setWork] = useState(false);
  const [family, setFamily] = useState(false);
  const [study, setStudy] = useState(false);
  const [hobby, setHobby] = useState(false);
  const [others, setOthers] = useState(false);
  const setTags = [];

  function handleSubmit(e) {
    e.preventDefault();

    if (!newToDoText || !newToDoTitle) {
      toast.error('Please input all fields');
      return;
    }

    if (work) setTags.push('work');
    if (family) setTags.push('family');
    if (study) setTags.push('study');
    if (hobby) setTags.push('hobby');
    if (others) setTags.push('others');

    const id = crypto.randomUUID();
    const newToDoEntry = {
      id,
      title: newToDoTitle,
      text: newToDoText,
      isDone: false,
      tags: setTags,
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
      work={work}
      family={family}
      study={study}
      hobby={hobby}
      others={others}
      setWork={setWork}
      setFamily={setFamily}
      setStudy={setStudy}
      setHobby={setHobby}
      setOthers={setOthers}
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
  const selectedTags = [...selectedTodo.tags];

  const work = selectedTags.includes('work');
  const family = selectedTags.includes('family');
  const study = selectedTags.includes('study');
  const hobby = selectedTags.includes('hobby');
  const others = selectedTags.includes('others');
  // console.log(tagArr);

  const [workTag, setWork] = useState(work);
  const [familyTag, setFamily] = useState(family);
  const [studyTag, setStudy] = useState(study);
  const [hobbyTag, setHobby] = useState(hobby);
  const [othersTag, setOthers] = useState(others);

  const tagToUpdate = [];

  function handleSubmit(e) {
    e.preventDefault();

    if (workTag) tagToUpdate.push('work');
    if (familyTag) tagToUpdate.push('family');
    if (studyTag) tagToUpdate.push('study');
    if (hobbyTag) tagToUpdate.push('hobby');
    if (othersTag) tagToUpdate.push('others');

    const updatedTodo = {
      title: newToDoTitle,
      text: newToDoText,
      tags: tagToUpdate,
    };

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
      work={workTag}
      family={familyTag}
      study={studyTag}
      hobby={hobbyTag}
      others={othersTag}
      setWork={setWork}
      setFamily={setFamily}
      setStudy={setStudy}
      setHobby={setHobby}
      setOthers={setOthers}
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
  work,
  family,
  study,
  hobby,
  others,
  setWork,
  setFamily,
  setStudy,
  setHobby,
  setOthers,
}) {
  const active = useRef(null);

  useEffect(function () {
    active.current.focus();
  }, []);

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
            ref={active}
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
        <div className="form__row">
          <ul className="form__tag_list">
            <li className="form__tag">
              <input
                type="checkbox"
                name="work"
                id="work"
                // defaultChecked={work}
                checked={work}
                onChange={e => setWork(e.target.checked)}
              />
              <label htmlFor="work">Work</label>
            </li>
            <li className="form__tag">
              <input
                type="checkbox"
                name="family"
                id="family"
                // defaultChecked={family}
                checked={family}
                onChange={e => setFamily(e.target.checked)}
              />
              <label htmlFor="family">Family</label>
            </li>
            <li className="form__tag">
              <input
                type="checkbox"
                name="study"
                id="study"
                // defaultChecked={study}
                checked={study}
                onChange={e => setStudy(e.target.checked)}
              />
              <label htmlFor="study">Study</label>
            </li>
            <li className="form__tag">
              <input
                type="checkbox"
                name="hobby"
                id="hobby"
                // defaultChecked={hobby}
                checked={hobby}
                onChange={e => setHobby(e.target.checked)}
              />
              <label htmlFor="hobby">Hobby</label>
            </li>
            <li className="form__tag">
              <input
                type="checkbox"
                name="others"
                id="others"
                // defaultChecked={others}
                checked={others}
                onChange={e => setOthers(e.target.checked)}
              />
              <label htmlFor="others">Others</label>
            </li>
          </ul>
        </div>
        <button className="btn btn-save">Save</button>
      </div>
    </form>
  );
}

function PopUpOverlay({ onOpenForm }) {
  return <div className="pop_up__overlay" onClick={onOpenForm}></div>;
}
