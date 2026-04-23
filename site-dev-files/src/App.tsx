import { useState } from 'react'
import './App.css'

function Projects() {
  let array: string[] = ["one","two","three"];

  return (
    <ul>
      {array.map((str, index) => {
        return (
          <li key={index}>
            <h3>{str}</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione officiis, quis suscipit minima asperiores at ipsum voluptatem repellat adipisci eum deleniti, quibusdam in! Nobis explicabo natus quaerat assumenda architecto quia!</p>
          </li>
        )
      })}
    </ul>
  )
}

function App() {
  return (
    <>
      <header>
        <h1>Ryan Samoyedny Portfolio</h1>
      </header>
      <nav>
        <ul>
          <li><a href="#about-me">About Me</a></li>
          <li><a href="#featured-project">Featured Project</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#extras">Extras</a></li>
        </ul>
      </nav>
      <main>
        <section id="about-me">
          <h2>About Me</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed impedit quaerat soluta molestiae deserunt magnam nam quos, asperiores voluptatum porro magni libero doloremque provident, sunt officiis eum veniam sequi! Officia dolor laudantium est animi impedit voluptatem cupiditate magni similique ipsam vero saepe quae sint possimus, eius, laboriosam repudiandae quaerat perspiciatis.</p>
        </section>
        <section id="featured-project">
          <h2>Featured Project</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam est optio ab officiis, velit eligendi vero corporis! Iure voluptate dicta, velit reiciendis veritatis rerum dolorem similique perferendis, eos mollitia porro quaerat vitae maiores cum placeat saepe autem a. Quia consequatur necessitatibus similique, quos rem consequuntur velit inventore molestias sequi!</p>
        </section>
        <section id="projects">
          <h2>Projects</h2>
          <Projects/>
        </section>
        <section id="extras">
          <h2>Extras</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam est optio ab officiis, velit eligendi vero corporis! Iure voluptate dicta, velit reiciendis veritatis rerum dolorem similique perferendis, eos mollitia porro quaerat vitae maiores cum placeat saepe autem a. Quia consequatur necessitatibus similique, quos rem consequuntur velit inventore molestias sequi!</p>
        </section>
      </main>
      <footer>

      </footer>
    </>
  )
}

export default App
