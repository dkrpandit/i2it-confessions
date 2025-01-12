import React, { useState, useMemo,useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Filter, Search, Plus, ChevronDown, Heart, Share2, MessageCircle } from 'lucide-react';
import PostForm from './PostConfessions';  // Fixed typo in import name

const FilterDropdown = ({ onSelect, options, isOpen }) => {
    if (!isOpen) return null;
    
    return (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden z-10">
            {options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(option)}
                    className="w-full text-left py-3 px-4 hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-2 text-gray-700 border-b last:border-b-0 border-gray-100"
                >
                    <span>{option}</span>
                </button>
            ))}
        </div>
    );
};

const ConfessionCard = ({ confession }) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(confession.likes);

    const handleLike = () => {
        setLikes(prev => liked ? prev - 1 : prev + 1);
        setLiked(prev => !prev);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition duration-300 border border-gray-100">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                            {confession.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">{confession.name}</h3>
                            <p className="text-sm text-gray-500">{`${confession.branch} · ${confession.year} Year`}</p>
                        </div>
                    </div>
                </div>

                <p className="text-gray-700 leading-relaxed text-lg">{confession.message}</p>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={handleLike}
                            className={`flex items-center space-x-2 transition duration-200 ${liked ? 'text-pink-500' : 'text-gray-500'} hover:text-pink-500`}
                        >
                            <Heart size={20} className={liked ? 'fill-current' : ''} />
                            <span>{likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition duration-200">
                            <MessageCircle size={20} />
                            <span>{confession.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition duration-200">
                            <Share2 size={20} />
                        </button>
                    </div>
                    <p className="text-sm text-gray-400">
                        {new Date(confession.messageSendAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function Confessions() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('Latest');
    const [searchQuery, setSearchQuery] = useState('');
    const [showPostForm, setShowPostForm] = useState(false);
    const [confessionMessage, setConfessionMessage] = useState([]);
    const getConfessions = async () => {
        try {
            const response = await fetch("http://localhost:5000/get-confessions", {
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
    useEffect(() => {
        getConfessions();
    }, [])
    const handleFilterSelect = (option) => {
        setSelectedFilter(option);
        setIsFilterOpen(false);
    };

    const filteredConfessions = useMemo(() => {
        let filtered = [...confessionMessage];
        
        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(confession => 
                confession.message.toLowerCase().includes(query) ||
                confession.name.toLowerCase().includes(query) ||
                confession.branch.toLowerCase().includes(query)
            );
        }

        // Apply sorting/filtering based on selected filter
        switch (selectedFilter) {
            case 'Most Liked':
                return filtered.sort((a, b) => b.likes - a.likes);
            case 'Most Discussed':
                return filtered.sort((a, b) => b.comments - a.comments);
            case 'Latest':
                return filtered.sort((a, b) => new Date(b.messageSendAt) - new Date(a.messageSendAt));
            case 'Oldest':
                return filtered.sort((a, b) => new Date(a.messageSendAt) - new Date(b.messageSendAt));
            case '1st Year':
                return filtered.filter(confession => confession.year === 'First');
            case '2nd Year':
                return filtered.filter(confession => confession.year === 'Second');
            case '3rd Year':
                return filtered.filter(confession => confession.year === 'Third');
            case '4th Year':
                return filtered.filter(confession => confession.year === 'Fourth');
            default:
                return filtered;
        }
    }, [selectedFilter, searchQuery, confessionMessage]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search confessions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                            />
                        </div>

                        <div className="flex gap-4 w-full sm:w-auto">
                            <div className="relative">
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="flex items-center gap-2 px-5 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition duration-200 text-gray-700"
                                >
                                    <Filter size={18} />
                                    <span>{selectedFilter}</span>
                                    <ChevronDown size={16} />
                                </button>
                                <FilterDropdown
                                    isOpen={isFilterOpen}
                                    onSelect={handleFilterSelect}
                                    options={['Latest', 'Most Liked', 'Most Discussed', 'Oldest', '1st Year', '2nd Year', '3rd Year', '4th Year']}
                                />
                            </div>

                            <button
                                onClick={() => setShowPostForm(true)}
                                className="flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition duration-200 shadow-sm"
                            >
                                <Plus size={18} />
                                <span className="font-medium">New Confession</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredConfessions.map(confession => (
                        <ConfessionCard key={confession.id} confession={confession} />
                    ))}
                </div>
            </div>

            {showPostForm && <PostForm onClose={() => setShowPostForm(false)} />}
        </div>
    );
}