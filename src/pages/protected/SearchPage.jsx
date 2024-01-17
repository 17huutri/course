import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import courseApi from '../../api/courseApi';
import CourseCard from '../../components/LandingPage/Features/TopCourse/CourseCard';
import { Pagination } from '@mui/material';
import FilterCourseCatalog from '../../components/CourseCatalog/CoursesInCatalogPage/FilterCourseCatalog';
import { BsFilter } from "react-icons/bs";
import CircularProgress from '@mui/material/CircularProgress';

const SearchPage = () => {
    const location = useLocation();

    const { searchTerm } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noResults, setNoResults] = useState(false);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [filterPrice, setFilterPrice] = useState([0, 1000]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredResults, setFilteredResults] = useState([]);
    const itemsPerPage = 16;
    const closeFilterPanel = () => {
        setShowFilterPanel(false);
    };
    const toggleFilterPanel = () => {
        setShowFilterPanel(!showFilterPanel);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await courseApi.getCourseByName(searchTerm);
                const courseSuggestions = response.data._data.list || [];

                if (courseSuggestions.length > 0) {
                    setSearchResults(courseSuggestions);
                    setNoResults(false);
                    setFilteredResults(courseSuggestions);
                } else {
                    setSearchResults([]);
                    setNoResults(true);
                    setFilteredResults([]);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [searchTerm]);

    useEffect(() => {
        const updatedFilteredResults = searchResults?.filter((result) => {
            const resultPrice = result.price;
            return resultPrice >= filterPrice[0] && resultPrice <= filterPrice[1];
        });
        setFilteredResults(updatedFilteredResults);
    }, [searchResults, filterPrice]);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setShowFilterPanel(false);
        setFilterPrice([0, 1000]);
    }, [location]);

    return (
        <div className='container mx-auto my-8 px-4 py-4'>
            <h1 className='text-3xl font-bold mb-4'>{`Search Results for "${searchTerm}"`}</h1>

            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <CircularProgress />
                </div>
            )}

            {!loading && noResults && (
                <>
                    <p className='text-2xl'>{`Sorry, we couldn't find any results for "${searchTerm}"`}</p>
                    <h2>Try adjusting your search terms. Here are some ideas: </h2>
                    <li>Make sure all phrases are spelled correctly.</li>
                    <li>Try another search term.</li>
                    <li>Try using more general search terms.</li>
                </>
            )}

            {!loading && !noResults && (
                <>
                    <p className='text-2xl py-4'>{`${filteredResults.length} results for "${searchTerm}"`}</p>

                    <div className="flex flex-row gap-4 overflow-x-hidden transition-transform ease-in-out duration-500">
                        {showFilterPanel && (
                            <FilterCourseCatalog
                                showFilterPanel={showFilterPanel}
                                onClose={closeFilterPanel}
                                filterPrice={filterPrice}
                                onFilterPriceChange={setFilterPrice}
                            />
                        )}
                        <div className="flex flex-col gap-4 transform transition-all ease-in-out duration-500">
                            <div className="flex justify-between items-center">
                                <div className="flex">
                                    {!showFilterPanel && (
                                        <button
                                            className="flex items-center text-[20px] rounded-[10px] border px-2 py-1"
                                            onClick={toggleFilterPanel}
                                        >
                                            <BsFilter className="text-[30px]" /> Filter
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div
                                className={`w-full justify-center grid ${showFilterPanel ? "lg:grid-cols-3" : "lg:grid-cols-4"
                                    } md:grid-cols-6 sm:grid-cols-2 gap-4 `}
                            >
                                {filteredResults && filteredResults
                                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                    .map((result, index) => (
                                        <CourseCard key={index} course={result} />
                                    ))}
                            </div>

                            <Pagination
                                variant='outlined'
                                color='primary'
                                className='mx-auto'
                                count={Math.ceil(filteredResults.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchPage;
