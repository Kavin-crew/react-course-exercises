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

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>todo</h1>
        <button className="btn">
          <span role="button" aria-label="plus">
            ➕
          </span>
        </button>
      </header>
      <aside className="sidebar">
        <ul className="tag__list">
          <li className="tag__item">
            <button className="btn">
              <span>&nbsp;</span> work
            </button>
          </li>
          <li className="tag__item">
            <button className="btn">
              <span>&nbsp;</span> study
            </button>
          </li>
          <li className="tag__item">
            <button className="btn">
              <span>&nbsp;</span> entertainment
            </button>
          </li>
          <li className="tag__item">
            <button className="btn">
              <span>&nbsp;</span> family
            </button>
          </li>
          <li className="tag__item">
            <button className="btn">
              <span>&nbsp;</span> work
            </button>
          </li>
          <li className="tag__item">
            <input type="checkbox" name="done-task" />
            <label htmlFor="done-task">Hide Done Tasks</label>
          </li>
        </ul>
      </aside>
      <main className="main">
        <section className="main__content">
          <h2>The First task title</h2>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          <div className="content__tags">
            <ul className="content__tags_list">
              <li className="content__tag">
                <span>&nbsp;</span>
              </li>
              <li className="content__tag">
                <span>&nbsp;</span>
              </li>
            </ul>

            <div className="main__checkbox">
              <input type="checkbox" name="done" />
              <label htmlFor="done">Done</label>
            </div>

            <div className="edit">
              <button className="btn">...</button>

              <div className="controls">
                <button className="btn">Edit</button>
                <button className="btn">Delete</button>
              </div>
            </div>
          </div>
        </section>
        <section className="main__content">
          <h2>The First task title</h2>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          <div className="content__tags">
            <ul className="content__tags_list">
              <li className="content__tag">
                <span>&nbsp;</span>
              </li>
              <li className="content__tag">
                <span>&nbsp;</span>
              </li>
            </ul>

            <div className="main__checkbox">
              <input type="checkbox" name="done" />
              <label htmlFor="done">Done</label>
            </div>

            <div className="edit">
              <button className="btn">...</button>

              <div className="controls">
                <button className="btn">Edit</button>
                <button className="btn">Delete</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
