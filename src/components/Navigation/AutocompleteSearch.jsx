import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import courseApi from '../../api/courseApi';

const AutocompleteSearch = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [suggestionsVisible, setSuggestionsVisible] = useState(true);
    const [selectedResultIndex, setSelectedResultIndex] = useState(-1);

    const containerRef = useRef(null);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setSuggestionsVisible(value.trim() !== '');
        if (value.trim() === '') {
            setSuggestionsVisible(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchTerm.trim() !== '') {
            setSuggestionsVisible(false);
            if (selectedResultIndex >= 0 && selectedResultIndex < searchResults.length) {
                const selectedResult = searchResults[selectedResultIndex];
                handleResultClick(selectedResult);
            } else {
                navigate(`/search-results/${encodeURIComponent(searchTerm)}`);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (selectedResultIndex < searchResults.length - 1) {
                setSelectedResultIndex((prevIndex) => prevIndex + 1);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (selectedResultIndex > -1) {
                setSelectedResultIndex((prevIndex) => prevIndex - 1);
            }
        }
    };

    const handleResultClick = (result) => {
        setSuggestionsVisible(false);
        setSearchTerm('');
        setSelectedResultIndex(-1);

        if (result.type === 'course') {
            navigate(`/courses/course-detail/${result.id}`);
        } else if (result.type === 'instructor') {
            navigate(`/instructor/instructor-profile/${result.id}`);
        }
    };

    const performSearch = useCallback(() => {
        setLoading(true);

        Promise.all([
            courseApi.getCourseByName(searchTerm),
            courseApi.getCourseByInstructor(searchTerm)
        ])
            .then(([courseResponse, instructorResponse]) => {
                const courseSuggestions = courseResponse.data._data.list || [];
                const instructorSuggestions = instructorResponse.data._data.list || [];

                const uniqueSuggestions = new Set();

                courseSuggestions.forEach((course) => {
                    uniqueSuggestions.add(
                        JSON.stringify({
                            type: 'course',
                            id: course.id,
                            name: course.name,
                            icon: faSearch
                        })
                    );
                });

                instructorSuggestions.forEach((instructor) => {
                    uniqueSuggestions.add(
                        JSON.stringify({
                            type: 'instructor',
                            id: instructor.instructor.id,
                            name: `${instructor.instructor.firstName} ${instructor.instructor.lastName}`,
                            image: instructor.instructor.image
                        })
                    );
                });

                const combinedSuggestions = Array.from(uniqueSuggestions).map((suggestion) =>
                    JSON.parse(suggestion)
                );

                setSearchResults(combinedSuggestions);
                setLoading(false);
                setSuggestionsVisible(true);
            })
            .catch((error) => {
                console.error('Error fetching suggestions:', error);
                setLoading(false);
            });
    }, [searchTerm]);




    useEffect(() => {
        if (searchTerm.trim() !== '') {
            performSearch();
        }
    }, [searchTerm, performSearch]);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setSuggestionsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative text-black px-4 z-[999]">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-full  p-2 border border-black rounded-2xl focus:outline-none focus:border-blue-700 pr-10"
            />
            <FontAwesomeIcon
                icon={faSearch}
                className={`absolute right-6 top-3 text-gray-500 z-10 ${searchTerm.trim() === '' ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                onClick={() => {
                    if (searchTerm.trim() !== '') {
                        setSuggestionsVisible(false);
                        if (selectedResultIndex >= 0 && selectedResultIndex < searchResults.length) {
                            const selectedResult = searchResults[selectedResultIndex];
                            handleResultClick(selectedResult);
                        } else {
                            navigate(`/search-results/${encodeURIComponent(searchTerm)}`);
                        }
                    }
                }}
            />
            {loading && (
                <div className="absolute top-10 left-0 w-full bg-white border border-gray-300 rounded-lg z-10">
                    <div className="p-2">Loading...</div>
                </div>
            )}
            {suggestionsVisible && (
                <div className="absolute top-10 left-0 w-full bg-white border border-gray-900 rounded-lg  z-20">
                    {searchResults.map((result, index) => (
                        <div
                            key={index}
                            className={`p-2 z-[1000] cursor-pointer flex items-center justify-between hover:bg-gray-200 ${selectedResultIndex === index ? 'bg-gray-200' : ''
                                }`}
                            onClick={() => handleResultClick(result)}

                        >
                            {result.type === 'course' ? (
                                <>
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={result.icon} />
                                        <div className="ml-4">{result.name}</div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center z-[9999]">
                                        {result.image && (
                                            <img
                                                src={result.image}
                                                alt="Instructor"
                                                className="w-8 h-8 mr-2"
                                            />
                                        )}
                                        {result.name}
                                    </div>
                                    <span className="text-sm text-blue-500 ml-1">Instructor</span>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AutocompleteSearch;