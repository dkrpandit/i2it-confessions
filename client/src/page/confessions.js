import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Filter } from 'lucide-react';
import PostFrom from './post';
import './confessions.css';

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

    const [confessionMessage, setConfessionMessage] = useState([]);
    const getConfessions = async () => {
        try {
            const response = await fetch("https://i2it-confessions-server.onrender.com/get-confessions", {
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
    const [open, setOpen] = React.useState(false);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };
    const handleFilterSelect = (option) => {
        setSelectedFilter(option);
        setOpen(false);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };
    const filterConfessions = (confessions) => {
        switch (selectedFilter) {
            case 'Latest':
                return confessions.slice().sort((a, b) => new Date(b.messageSendAt) - new Date(a.messageSendAt));
            case 'Oldest':
                return confessions.slice().sort((a, b) => new Date(a.messageSendAt) - new Date(b.messageSendAt));
            case '1st Year':
                return confessions.filter(confession => confession.year === 'First');
            case '2nd Year':
                return confessions.filter(confession => confession.year === '2nd');
            case '3rd Year':
                return confessions.filter(confession => confession.year === 'Third');
            case '4th Year':
                return confessions.filter(confession => confession.year === 'Fourth');
            default:
                return confessions;
        }
    };
    // console.log(selectedFilter);
    const [showPage, setShowPage] = useState(false);
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
                    value={searchQuery}
                    onChange={handleSearch}
                    className="SearchConfessions"
                    style={{ borderRadius: "11px" }}
                />

                <button type='button' onClick={() => setShowPage(true)} style={
                    {
                        backgroundColor: 'transparent',
                        color: 'gray',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        borderRadius: '19px',
                        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
                        border: '2px solid rgb(189, 180, 180)',
                        outline: 'none',
                        fontWeight: '500',
                    }
                }
                    className='postYourConfession' >Post your confession</button>
                {showPage && <PostFrom onClose={() => setShowPage(false)} />}
            </div>



            <div className="confessionsMessages">


                <div className="flex items-center justify-between">
                    <div className="box-content">{selectedFilter}</div>
                    <div className="ml-auto cursor-pointer" onClick={handleOpen}>
                        <Filter strokeWidth={1.75} />
                    </div>

                    {/* Filter dropdown */}
                    {open && <FilterDropdown onSelect={handleFilterSelect} />}
                </div>

                {
                    filterConfessions(confessionsPage)
                        .filter(confession => confession.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(confession => (
                            <div className='card' key={confession.id}>
                                <h3>{` ${confession.name}`}</h3>
                                <h4>{`${confession.branch} ${confession.year} year `}</h4>
                                <p>{`${confession.message}`}</p><br />
                                <p>{`Date: ${new Date(confession.messageSendAt).toLocaleString('en-IN')}`}</p>
                            </div>
                        ))
                }
            </div>

        </div >
    </>
    );
}