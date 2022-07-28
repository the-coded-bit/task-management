import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { taskLists } from '../../constants'
import Card from '../Card/Card'

function List({ listType }) {
    const {todoTaskList, inProgressTaskList, completedTaskList} = useSelector((state) => state.tasks);
    return (
        <Droppable droppableId={listType.toString()}>
            {
                (provided) => (
                    <div className='h-full w-full flex flex-col gap-4 overflow-y-scroll' ref={provided.innerRef} {...provided.droppableProps}>
                        {listType == taskLists.TODO && (
                            todoTaskList.map((item, index) => <Card data={item} index={index}/>)
                        )}
                        {listType == taskLists.INPROGRESS && (
                            inProgressTaskList.map((item, index) => <Card data={item} index={index}/>)
                        )}
                        {listType == taskLists.COMPLETED && (
                            completedTaskList.map((item, index) => <Card data={item} index={index}/>)
                        )}
                    </div>
                )
            }
        </Droppable>
    )
}

export default List