import React, { useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Task } from '../components'
import { fetchTasks, setTasks } from '../utils/features/taskSlice';

function MainPageLayout() {
    // grab dispatch function
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTasks())
    }, []);

    const onDragEnd = (result) => {
        console.log(result);
        const {source , destination, draggableId} = result;
        // handling edge cases when drop and drag should not work.
        // case1: if destination is null
        // case2: if card is dragged and dropped in same position
        if(!destination || (destination.droppableId == source.droppableId && destination.index === source.index))
          return;
    
        dispatch(setTasks(source, destination, draggableId))
      }

    return (
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <div className='flex w-full h-full'>
                <aside className='bg-red-100 w-[20%]'>
                    <Navbar />
                </aside>
                <section className='bg-green-100 w-[80%]'>
                    <Task />
                </section>
            </div>
        </DragDropContext>
    )
}

export default MainPageLayout