import { createSlice } from '@reduxjs/toolkit'
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { taskLists } from '../../constants';
import { db } from '../firebase';


const initialState = {
    todoCount: 0,
    todoTaskList: [],
    inProgressCount: 0,
    inProgressTaskList: [],
    completedCount: 0,
    completedTaskList: []
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTodoList: (state, action) => {state.todoTaskList = action.payload},
        setInProgressList: (state, action) => {state.inProgressTaskList = action.payload},
        setCompletedList: (state, action) => {state.completedTaskList = action.payload},
        setData: (state, action) => {
            const { tododata, todocount, inprogressdata, inprogresscount, completeTaskdata, completeTaskcount } = action.payload;
            state.todoCount = todocount;
            state.todoTaskList = tododata;
            state.inProgressCount = inprogresscount;
            state.inProgressTaskList = inprogressdata;
            state.completedCount = completeTaskcount;
            state.completedTaskList = completeTaskdata;
        },
        increment: (state, action) =>{
            switch (action.payload) {
                case taskLists.COMPLETED:
                    state.completedCount = state.completedCount + 1;
                    break;
                case taskLists.INPROGRESS:
                    state.inProgressCount = state.inProgressCount + 1; 
                    break;
                case taskLists.TODO:
                    state.todoCount = state.todoCount + 1;
                    break;           
            }
        },
        decrement: (state, action) =>{
            switch (action.payload) {
                case taskLists.COMPLETED:
                    state.completedCount = state.completedCount - 1;
                    break;
                case taskLists.INPROGRESS:
                    state.inProgressCount = state.inProgressCount - 1; 
                    break;
                case taskLists.TODO:
                    state.todoCount = state.todoCount - 1;
                    break;           
            }
        }
    }
});

// fetch to do tasks
export function fetchTasks() {
    return async function fetchTasksThunk(dispatch) {
        try {
            // get document reference for todo Tasks
            var querySnapshot = await getDocs(collection(db, "todoTasks"));
            // prepare the todo data
            var tododata = [];
            querySnapshot.forEach((doc) => {
                tododata.push(doc.data());
            });
            var todocount = tododata.length;
            // fetch inprogress task
            querySnapshot = await getDocs(collection(db, 'inProgressTasks'));
            // prepare the inprogress data
            var inprogressdata = [];
            querySnapshot.forEach((doc) => {
                inprogressdata.push(doc.data());
            });
            var inprogresscount = inprogressdata.length;
            // fetch complete task
            querySnapshot = await getDocs(collection(db, 'completedTasks'));
            // prepare the inprogress data
            var completeTaskdata = [];
            querySnapshot.forEach((doc) => {
                completeTaskdata.push(doc.data());
            });
            var completeTaskcount = completeTaskdata.length;

            dispatch(setData({
                todocount: todocount,
                tododata: tododata,
                inprogresscount: inprogresscount,
                inprogressdata: inprogressdata,
                completeTaskcount: completeTaskcount,
                completeTaskdata: completeTaskdata
            }));

        } catch (err) {
            console.log(err);
        }
    }
}

// drag and drop tasks
export function setTasks(source, destination, draggableId) {
    return async function setTasks(dispatch, getState) {
        const { todoTaskList, inProgressTaskList, completedTaskList } = getState().tasks;
        var item;
        if (source.droppableId == taskLists.TODO) {
            console.log('triggered');
            item = todoTaskList[source.index];
            dispatch(decrement(taskLists.TODO));
            const newList = todoTaskList.filter(it => it.id != item.id);
            dispatch(setTodoList(newList));
        }
        else if (source.droppableId == taskLists.INPROGRESS) {
            item = inProgressTaskList[source.index];
            dispatch(decrement(taskLists.INPROGRESS));
            const newList = inProgressTaskList.filter(it => it.id != item.id);
            dispatch(setInProgressList(newList));
        }
        else if (source.droppableId == taskLists.COMPLETED) {
            item = completedTaskList[source.index];
            dispatch(decrement(taskLists.COMPLETED));
            const newList = completedTaskList.filter(it => it.id != item.id);
            dispatch(setCompletedList(newList));
        }

        console.log(item);

        if(destination.droppableId == taskLists.TODO){
            dispatch(increment(taskLists.TODO));
            const newList = [...todoTaskList];
            newList.splice(destination.index, 0, item);
            dispatch(setTodoList(newList));
        }
        else if(destination.droppableId == taskLists.INPROGRESS){
            console.log('triggered');
            dispatch(increment(taskLists.INPROGRESS));
            const newList = [...inProgressTaskList];
            newList.splice(destination.index, 0, item);
            dispatch(setInProgressList(newList));
        }
        else if(destination.droppableId == taskLists.COMPLETED){
            dispatch(increment(taskLists.COMPLETED));
            const newList = [...completedTaskList];
            newList.splice(destination.index, 0, item);
            dispatch(setCompletedList(newList));
        }

        // now we have to set data aynchrnously to firestore
        dispatch(setTasksAsync());
    }
}

export function setTasksAsync(){
    return async function setTasksAsyncThunk(dispatch, getState){
        const { todoTaskList, inProgressTaskList, completedTaskList } = getState().tasks;
        // delete all todoTasks
        var querySnapshot = await getDocs(collection(db, 'todoTasks'));
        querySnapshot.forEach(async dc => {
            var id = dc.data().id;
            await deleteDoc(doc(db, 'todoTasks', id));
        });
        // delete all inProgressTasks
        querySnapshot = await getDocs(collection(db, 'inProgressTasks'));
        querySnapshot.forEach(async dc => {
            var id = dc.data().id;
            await deleteDoc(doc(db, 'inProgressTasks', id));
        });

         // delete all completedTasks
         querySnapshot = await getDocs(collection(db, 'completedTasks'));
         querySnapshot.forEach(async dc => {
             var id = dc.data().id;
             await deleteDoc(doc(db, 'completedTasks', id));
         });

        //  add the new todo task list to firestore
        todoTaskList.forEach(async item => {
            const id = item.id;
            await setDoc(doc(db, 'todoTasks', id), item);
        });

        // add the new in progress list to firestore
        inProgressTaskList.forEach(async item => {
            const id = item.id;
            await setDoc(doc(db, 'inProgressTasks', id), item);
        });

        // add the new completed Task list to firestore
        completedTaskList.forEach(async item => {
            const id = item.id;
            await setDoc(doc(db, 'completedTasks', id), item);
        });
    }
}

export const { setData, increment, decrement, setTodoList, setCompletedList, setInProgressList} = taskSlice.actions

export default taskSlice.reducer