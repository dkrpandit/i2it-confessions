import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Filter } from 'lucide-react';
import PostFrom from './post';


const FilterDropdown = ({ onSelect }) => {
    const options = ['Latest', 'Oldest', '1st Year', '2nd Year', '3rd Year', '4th Year'];

    return (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
            <ul>
                {options.map((option, index) => (
                    <li
                        key={index}
                        onClick={() => onSelect(option)}
                        className="cursor-pointer py-2 px-4 hover:bg-gray-200"
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default function Confessions() {
    // const confessionsPage = [
    //     {
    //         "id": "1",
    //         "name": "Aman",
    //         "branch": "IT",
    //         "year": "third",
    //         "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
    //     },
    //     {
    //         "id": '2',
    //         "name": "Aman",
    //         "branch": "IT",
    //         "year": "third",
    //         "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
    //     },
    //     {
    //         "id": '3',
    //         "name": "Aman",
    //         "branch": "IT",
    //         "year": "third",
    //         "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
    //     },
    //     {
    //         "id": '4',
    //         "name": "Aman",
    //         "branch": "IT",
    //         "year": "third",
    //         "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
    //     },
    //     {
    //         "id": '5',
    //         "name": "Aman",
    //         "branch": "IT",
    //         "year": "third",
    //         "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
    //     },
    //     {
    //         "id": '6',
    //         "name": "Aman",
    //         "branch": "IT",
    //         "year": "third",
    //         "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
    //     },
    //     {
    //         "id": '7',
    //         "name": "Aman",
    //         "branch": "IT",
    //         "year": "third",
    //         "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
    //     },
    //     {
    //         "id": '8',
    //         "name": "Aman",
    //         "branch": "IT",
    //         "year": "third",
    //         "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
    //     },
    //     {
    //         "id": '9',
    //         "name": "Aman",
    //         "branch": "IT",
    //         "year": "third",
    //         "message": "Hey, I've been meaning to share something with you. I've been feeling a bit like a clueless dummy, but the truth is, I've developed some feelings for you. It's like my heart has a mind of its own, and it keeps pointing in your direction. I hope this confession doesn't make things awkward, but I couldn't keep it to myself any longer. Just wanted you to know what's been on my mind."
    //     },
    // ];
    const [confessionMessage, setConfessionMessage] = useState([]);
    const getConfessions = async () => {
        try {
            const response = await fetch("/get-confessions", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setConfessionMessage(data);
            } else {
                console.error(`Failed to fetch data. Status: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    };
    
    React.useEffect(() => {
        getConfessions();
    }, [])
    const confessionsPage = confessionMessage || [];
    // console.log(confessionPage);
    const [open, setOpen] = React.useState(false);
    const [selectedFilter, setSelectedFilter] = useState('');


    const handleOpen = () => {
        setOpen(true);
    };
    const handleFilterSelect = (option) => {
        setSelectedFilter(option);
        setOpen(false);
        // Implement your filter logic here
    };
    const [showPage, setShowPage] = useState(false)
    return (<>
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

                <button type='button' onClick={() => setShowPage(true)} style={
                    {
                        backgroundColor: "transparent",
                        color: "gray",
                        padding: "10px 20px",
                        cursor: "pointer",
                        borderRadius: "19px",
                        boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                        border: "2px solid #282626",
                        outline: "none"
                    }
                } >Post your confession</button>
                {showPage && <PostFrom onClose={() => setShowPage(false)} />}
            </div>

            <div className="flex items-center justify-between">
                <div className="box-content">{selectedFilter}</div>
                <div className="ml-auto cursor-pointer" onClick={handleOpen}>
                    <Filter strokeWidth={1.75} />
                </div>

                {/* Filter dropdown */}
                {open && <FilterDropdown onSelect={handleFilterSelect} />}
            </div>

            {
                confessionsPage.map(confession => (
                    <div className='card' key={confession.id}>
                        <h3>{`Name: ${confession.name}`}</h3>
                        <h4>{`Branch: ${confession.branch}`}</h4>
                        <h4>{`Year: ${confession.year}`}</h4>
                        <p>{`Message: ${confession.message}`}</p>
                        <p>{`Date: ${confession.messageSendAt}`}</p>
                        
                    </div>
                ))
            }
        </div >
    </>
    );
}