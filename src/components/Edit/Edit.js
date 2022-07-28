import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addTaskAsync } from '../../utils/features/taskSlice';

function Edit({ listType, setActiveEditOption }) {
    // dispatch add task 
    const dispatch = useDispatch();
    // access username from redux store
    const { userName } = useSelector((state) => state.user);
    // state to maintain title input
    const [title, setTitle] = useState('');
    // state to maintain description input
    const [description, setDescription] = useState('');

    // handle description input
    const handleTabPress = (e) => {
        if (e.key == 'Tab') {
            if (title != '' && description != '') {
                const data = {
                    id: (new Date()).getTime().toString(36),
                    description: description,
                    title: title,
                    createdBy: userName,
                    collectionType: listType
                }
                dispatch(addTaskAsync(listType, data));
            }
        }
    }

    return (
        <div className='w-full bg-[#ffffff] rounded-md h-60 flex flex-col'>
            <input
                type='text'
                value={title}
                spellCheck={false}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full h-[30%] outline-none p-2 placeholder:text-sm placeholder:font-poppins placeholder:font-medium'
                placeholder='Give your task a title' />
            <textarea
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={(e) => handleTabPress(e)}
                value={description}
                spellCheck={false}
                placeholder='Description....press tab to add task'
                className='h-[70%] p-2 placeholder:text-sm placeholder:font-poppins placeholder:font-light resize-none outline-none' />
        </div>
    )
}

export default Edit