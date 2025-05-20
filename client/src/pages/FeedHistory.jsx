import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/common/DashboardLayout';
import ReactPaginate from 'react-paginate';
import { FaArrowCircleLeft } from 'react-icons/fa';

const FeedHistory = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const feedData = location.state?.feedStock;

    const [selectedFeedStock, setSelectedFeedStock] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const FEED_STOCKS_PER_PAGE = 10;

    useEffect(() => {
        if (feedData) {
            setSelectedFeedStock(feedData);
            setIsLoading(false);
        }
    }, [feedData]);

    const dateFilteredHistory = selectedFeedStock?.purchaseHistory?.filter((history) =>
        searchTerm ? new Date(history.purchaseDate).toISOString().split('T')[0] === searchTerm : true
    ) || [];

    const offset = currentPage * FEED_STOCKS_PER_PAGE;
    const currentItems = dateFilteredHistory.slice(offset, offset + FEED_STOCKS_PER_PAGE);
    const pageCount = Math.ceil(dateFilteredHistory.length / FEED_STOCKS_PER_PAGE);

    const handlePageClick = ({ selected }) => setCurrentPage(selected);

    if (isLoading) {
        return <DashboardLayout><p>Loading Feed History...</p></DashboardLayout>;
    }

    return (
        <DashboardLayout>
            <div className="w-full p-6">
                <div className='flex items-center gap-5'>
                    <FaArrowCircleLeft size={24} className="cursor-pointer" title='Go Back' onClick={() => navigate(-1)} />

                    <h2 className="text-2xl font-bold">{selectedFeedStock?.feedType} Purchase History</h2>
                </div>

                <div className="mt-4 flex gap-4">
                    <input
                        type="date"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(0);
                        }}
                        className="px-3 py-2 border rounded"
                    />
                </div>

                <div className="overflow-x-auto mt-5">
                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 font-semibold">
                                <td colSpan={3} className="border p-2 text-right">
                                    All Total:
                                </td>
                                <td className="border p-2 text-right">
                                    {`${dateFilteredHistory.reduce((acc, feedStock) => acc + (feedStock.pricePerUnit * feedStock.purchaseWeight), 0).toFixed(2)} /-`}
                                </td>
                            </tr>

                            {/* Actual Column Headers */}
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-left">Date</th>
                                <th className="border p-2 text-left">Weight (KG)</th>
                                <th className="border p-2 text-left">Price Per KG</th>
                                <th className="border p-2 text-right">Total Price</th> {/* Often, monetary values are right-aligned */}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? currentItems.map((history, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border p-2">{new Date(history.purchaseDate).toLocaleDateString('en-GB')}</td>
                                    <td className="border p-2">{history.purchaseWeight.toFixed(2)} KG</td>
                                    <td className="border p-2">{history.pricePerUnit.toFixed(2)} /-</td>
                                    <td className="border p-2">{(history.purchaseWeight * history.pricePerUnit).toFixed(2)} /-</td>
                                </tr>
                            )) : (
                                <tr><td colSpan="4" className="text-center">No records found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-center">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"flex justify-center items-center gap-2"}
                        previousClassName={"px-3 py-2 bg-gray-200 rounded"}
                        nextClassName={"px-3 py-2 bg-gray-200 rounded"}
                        pageClassName={
                            "px-3 py-2 cursor-pointer bg-gray-100 hover:bg-gray-300 rounded"
                        }
                        activeClassName={"bg-green-500 text-white"}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FeedHistory;
