import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

function Card({ data, index }) {
    return (
        <Draggable draggableId={data.id.toString()} index={index}>
            {
                (provided) => (
                    <article className='p-5 flex flex-col gap-1 h-40 shadow-sm bg-[#ffffff]' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <h1 className='font-poppins'>{data.title}</h1>
                        <p className='font-poppins text-sm font-thin text-[#6B6B6B] overflow-hidden'>{data.description}</p>
                    </article>
                )
            }

        </Draggable>

    )
}

export default Card