import {useReducer, useRef, useState} from "react";
import {reducer} from "./reduser";

let initialState = [
    {
        id: 0,
        text: "Call the manager",
        done: true
    },
    {
        id: 1,
        text: "Check the emails",
        done: false
    },
    {
        id: 2,
        text: "Write the report",
        done: false
    },
];



function TasksList() {
    const [nextID, setNextID] = useState(initialState.length);

    //the list of the data states
    const [state, dispatch] = useReducer(reducer, initialState);
    const [sortType, setSortType] = useState(true);

    //the editing states
    const [edit, setEdit] = useState("");
    const [editId, setEditId] = useState(null);
    const inputText = useRef(null);

    //dispatch adding task settings
    const addHandler = (text) => {
        setNextID(nextID + 1);
        dispatch(
            {
                type: 'add',
                id: nextID,
                text: text
            }
        )
        inputText.current.value = "";
    }

    //set a task into editing mode
    const editHandler = (task) => {
        setEdit(task.text)
        setEditId(task.id)
    }

    //dispatch edit settings
    const editDone = (task, text) => {
        dispatch(
            {
                type: 'edit',
                id: task.id,
                text: text
            }
        )
        setEditId(null)
    }

    //dispatch delete settings
    const deleteHandler = (task) => {
        dispatch(
            {
                type: 'delete',
                id: task.id
            }
        )
    }

    //dispatch task that have been done or unclicked from done
    const checkedHandler = (task) => {
        dispatch(
            {
                type: 'checked',
                id: task.id
            }
        )
    }

    //dispatch to the sorting function
    const sortHandler = () => {
        dispatch(
            {
                type: 'sort',
                sortType: sortType
            }
        );
        setSortType(!sortType);
    }

    //One task template that has been filling from the list from the state
    const listItems = state.map((task) =>
        <li className={"task"} key={task.id}>
            {editId === task.id
                ?
                <>
                    <div>
                        <input value={edit} onChange={(e) => setEdit(e.target.value)} type={"text"}/>
                    </div>
                    <div>
                        <button onClick={() => editDone(task, edit)}>Change</button>
                        <button onClick={() => setEditId(null)}>Cansel</button>
                    </div>
                </>
                :
                <>
                    <div>
                        <input type={"checkbox"} checked={task.done}
                               onChange={() => checkedHandler(task)}/>
                        <label>{task.text}</label>
                    </div>
                    <div>
                        <button onClick={() =>
                            editHandler(task)}>Edit
                        </button>
                        <button onClick={() =>
                            deleteHandler(task)}>Delete
                        </button>
                    </div>
                </>
            }
        </li>
    )

    return (
        <div className={"tasks-list"}>
            <h1>Tasks to do</h1>
            <form>
                <div>
                    <input ref={inputText} placeholder={"Add task"}
                           type={"text"}/>
                    <button onClick={(event) => {
                        event.preventDefault();
                        addHandler(inputText.current.value);
                    }}>Send
                    </button>
                    <button onClick={(event) => {
                        event.preventDefault();
                        sortHandler();
                    }}>{`Sort ${sortType ? 'A-Z' : "Z-A"}`}</button>
                </div>
            </form>
            <ul>{listItems}</ul>
        </div>
    )
}

export default TasksList;