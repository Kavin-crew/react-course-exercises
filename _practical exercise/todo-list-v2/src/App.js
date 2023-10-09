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
