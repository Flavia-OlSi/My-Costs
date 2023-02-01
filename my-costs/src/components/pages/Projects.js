import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import Message from "./Message"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../project/ProjectCard"
import Loading from "../layout/Loading"
import styles from "./Projects.module.css"

function Projects() {

    const [projects, setPorjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    setPorjects(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
        }, 300)
    }, [])

    return (
        <div className={styles.project_container} >
            <div className={styles.title_container} >
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="sucess" msg={message} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => <ProjectCard
                        id={project.id}
                        name={project.name}
                        budge={project.budge}
                        category={project.category.name}
                        key={project.id}
                    />)
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}

export default Projects;