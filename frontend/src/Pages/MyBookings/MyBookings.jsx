import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Header from "../../components/Header";

function MyBookings(){
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/my-bookings", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            }
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const handleViewDetails = (eventId) => {
        navigate(`/event/${eventId}`);
    };

    return(
        <>
        <main className='bg-[#101a23] min-h-screen'>
            <Header/>

            <section className='text-white px-20 flex flex-1 flex-col py-10 gap-6'>
                <h1 className='tracking-light text-[32px] font-bold leading-tight min-w-72'>My Bookings</h1>
                
                {/* Bookings List */}
                <div className="flex flex-col gap-6">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="flex flex-row gap-2">
                                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
                            </div>
                        </div>
                    ) : bookings.length > 0 ? (
                        bookings.map((event) => (
                            <div key={event.id} className="flex items-stretch justify-between gap-4 rounded-xl">
                                <div className="flex flex-[2_2_0px] flex-col gap-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-green-400 text-sm font-normal leading-normal">✓ Booked</p>
                                        <p className="text-white text-base font-bold leading-tight">{event.title}</p>
                                        <p className="text-[#90adcb] text-sm font-normal leading-normal">
                                            {formatDate(event.date)} · {event.time} · {event.location}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => handleViewDetails(event.id)}
                                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 flex-row-reverse bg-[#223649] text-white text-sm font-medium leading-normal w-fit"
                                    >
                                        <span className="truncate">View Details</span>
                                    </button>
                                </div>
                                <div
                                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                                    style={{
                                        backgroundImage: `url("${event.image || 'https://via.placeholder.com/400x225?text=No+Image'}")`
                                    }}
                                ></div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-[#90adcb] text-lg">No bookings found</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
        </>
    );
}

export default MyBookings;