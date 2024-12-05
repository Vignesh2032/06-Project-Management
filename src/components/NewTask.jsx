import { useRef, useState } from "react";
import Modal from "./Modal";

export default function NewTask({ onAddTask }) {

    const [enteredTask, setEnteredTask] = useState('');
    const task = useRef();

    function handleChange(event) {
        setEnteredTask(event.target.value);
    }

    function handleClick() {
        if (enteredTask.trim() === "") {
            task.current.open();
            return;
        }
        onAddTask(enteredTask);
        setEnteredTask('');
    }
    return (
        <>
            <Modal ref={task} buttonCaption="Okay">
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">Oops ... look like you forgot to enter a value.</p>
            </Modal>
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                    onChange={handleChange}
                    value={enteredTask}
                />
                <button onClick={handleClick} className="text-stone-700 hover:text-stone-950">Add Task</button>
            </div>
        </>
    );
}