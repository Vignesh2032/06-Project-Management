import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSideBar from "./components/ProjectSideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: []
    });

    function handleAddTask(text) {
        setProjectsState(prevState => {
            const TaskId = Math.random();
            const newTask = {
                text: text,
                projectId: prevState.selectedProjectId,
                id: TaskId
            }
            return {
                ...prevState,
                tasks: [newTask, ...prevState.tasks]
            };
        });
    }
    function handleDeleteTask(id) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter(
                    (task) => task.id !== id
                )
            };
        });
    }
    function handleSelectProject(id) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: id
            };
        });
    }

    function handleStartAddProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: null
            };
        });
    }

    function handleCancelAddProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined
            };
        });
    }
    function handleAddProject(projectData) {
        setProjectsState(prevState => {
            const projectId = Math.random();
            const newProject = {
                ...projectData,
                id: projectId
            }
            return {
                ...prevState,
                projects: [...prevState.projects, newProject],
                selectedProjectId: undefined
            }
        });
    }

    function handleDeleteProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter(
                    (project) => project.id !== prevState.selectedProjectId
                )
            };
        });
    }

    const selectedProject = projectsState.projects.find(
        project => project.id === projectsState.selectedProjectId
    );

    let content = (
        <SelectedProject
            project={selectedProject}
            onDeleteProject={handleDeleteProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            tasks={projectsState.tasks}
        />
    );

    if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
    }
    else if (projectsState.selectedProjectId === null) {
        content = <NewProject onAddProject={handleAddProject} onCancelProject={handleCancelAddProject} />
    }
    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectSideBar
                onStartAddProject={handleStartAddProject}
                projects={projectsState.projects}
                onSelectProject={handleSelectProject}
                selectedProjectId={projectsState.selectedProjectId}
            />
            {content}
        </main>
    );
}

export default App;
