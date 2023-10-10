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
    id: 3,
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
  return (
    <div className="container">
      <Header />
      <Sidebar />
      <Main />
      <PopUpForm />
      <PopUpOverlay />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>todo</h1>
      <button className="btn">
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
      <input type="checkbox" name="done-task" />
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

function Main() {
  return (
    <main className="main">
      {initialTask.map(task => (
        <MainContent task={task} />
      ))}
    </main>
  );
}

function MainContent({ task }) {
  return (
    <section className="main__content">
      <h2>{task.title}</h2>
      <p>{task.text}</p>
      <div className="content__tags">
        <TagContentList />

        <div className="main__checkbox">
          <input type="checkbox" name="done" />
          <label htmlFor="done">Done</label>
        </div>

        <EditControl />
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

function EditControl() {
  return (
    <div className="edit">
      <button className="btn">...</button>

      <div className="controls">
        <button className="btn">Edit</button>
        <button className="btn">Delete</button>
      </div>
    </div>
  );
}

function PopUpForm() {
  return (
    <form className="form">
      <button className="btn form__close_btn">
        <span role="button" aria-label="close">
          ❌
        </span>
      </button>
      <div className="form__container">
        <div className="form__row">
          <label htmlFor="form__title">Title: </label>
          <input type="text" name="form__title" />
        </div>
        <div className="form__row">
          <label htmlFor="form__text">Text: </label>
          <textarea type="text" name="form__text" className="form__text" />
        </div>
        <ul className="form__tag_list">
          <li className="form__tag_item">
            <input type="checkbox" name="form__Work" />
            <label htmlFor="form__Work">Work</label>
          </li>
          <li className="form__tag_item">
            <input type="checkbox" name="form__Family" />
            <label htmlFor="form__Family">Family</label>
          </li>
          <li className="form__tag_item">
            <input type="checkbox" name="form__Study" />
            <label htmlFor="form__Study">Study</label>
          </li>
          <li className="form__tag_item">
            <input type="checkbox" name="form__Hobby" />
            <label htmlFor="form__Hobby">Hobby</label>
          </li>
          <li className="form__tag_item">
            <input type="checkbox" name="form__Others" />
            <label htmlFor="form__Others">Others</label>
          </li>
        </ul>
        <button className="btn btn-save">Save</button>
      </div>
    </form>
  );
}

function PopUpOverlay() {
  return <div className="pop_up__overlay"></div>;
}
