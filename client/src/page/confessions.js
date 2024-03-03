import React, { useState } from 'react';
import Navbar from '../components/Navbar';

import PostFrom from './post';

export default function Confessions() {
    const confessionsPage = [
        {
            "id": "1",
            "name": "Aman",
            "branch": "IT",
            "year": "third",
            "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
        },
        {
            "id": '2',
            "name": "Aman",
            "branch": "IT",
            "year": "third",
            "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
        },
        {
            "id": '3',
            "name": "Aman",
            "branch": "IT",
            "year": "third",
            "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
        },
        {
            "id": '4',
            "name": "Aman",
            "branch": "IT",
            "year": "third",
            "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
        },
        {
            "id": '5',
            "name": "Aman",
            "branch": "IT",
            "year": "third",
            "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
        },
        {
            "id": '6',
            "name": "Aman",
            "branch": "IT",
            "year": "third",
            "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
        },
        {
            "id": '7',
            "name": "Aman",
            "branch": "IT",
            "year": "third",
            "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
        },
        {
            "id": '8',
            "name": "Aman",
            "branch": "IT",
            "year": "third",
            "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
        },
        {
            "id": '9',
            "name": "Aman",
            "branch": "IT",
            "year": "third",
            "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
        },
    ];

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const [showPage, setShowPage] = useState(false)
    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className='inputField'>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder='Search confession by name'
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 max-w-60 "
                    />

                    <button type='button' onClick={() => setShowPage(true)} className='bg-white border border-gray-300 p-3 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300' >Post your confession</button>
                    {showPage && <PostFrom onClose={() => setShowPage(false)} />}
                </div>

                {
                    confessionsPage.map(confession => (
                        <div className='card' key={confession.id}>
                            <h3>{`Name: ${confession.name}`}</h3>
                            <h4>{`Branch: ${confession.branch}`}</h4>
                            <h4>{`Year: ${confession.year}`}</h4>
                            <p>{`Message: ${confession.message}`}</p>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
