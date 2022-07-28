import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { taskLists } from '../../constants'
import { completedTask, inProgressTasks, todoTasks } from '../../utils/dummy'
import Card from '../Card/Card'

function List({ listType }) {
    return (
        <Droppable droppableId={listType.toString()}>
            {
                (provided) => (
                    <div className='h-full w-full flex flex-col gap-4' ref={provided.innerRef} {...provided.droppableProps}>
                        {listType == taskLists.TODO && (
                            todoTasks.map((item, index) => <Card data={item} index={index}/>)
                        )}
                        {listType == taskLists.INPROGRESS && (
                            inProgressTasks.map((item, index) => <Card data={item} index={index}/>)
                        )}
                        {listType == taskLists.COMPLETED && (
                            completedTask.map((item, index) => <Card data={item} index={index}/>)
                        )}
                    </div>
                )
            }
        </Droppable>
    )
}

export default List