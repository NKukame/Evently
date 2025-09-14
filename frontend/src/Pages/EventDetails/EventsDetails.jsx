import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Header from "../../components/Header";

function EventsDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchEvent();
    checkLoginStatus();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEvent(data);
      }
    } catch (error) {
      console.error("Failed to fetch event:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleBooking = () => {
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }
    // TODO: Implement booking functionality
    alert('Booking functionality coming soon!');
  };

  if (loading) {
    return (
      <main className='bg-[#101a23] min-h-screen'>
        <Header/>
        <div className="flex justify-center py-20">
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className='bg-[#101a23] min-h-screen'>
        <Header/>
        <div className="text-center py-20">
          <p className="text-white text-xl">Event not found</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className='bg-[#101a23] min-h-screen'>
        <Header/>
        
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:px-4 @[480px]:py-3">
                <div
                  className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-[#101a23] @[480px]:rounded-xl min-h-80"
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url("${event.image || 'https://via.placeholder.com/800x400?text=No+Image'}")`
                  }}
                >
                  <div className="flex p-4">
                    <p className="text-white tracking-light text-[28px] font-bold leading-tight">{event.title}</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[#90adcb] text-sm font-normal leading-normal pb-3 pt-1 px-4">
              {formatDate(event.date)} · {event.time}
            </p>
            <p className="text-[#90adcb] text-sm font-normal leading-normal pb-3 pt-1 px-4">
              {event.location}
            </p>
            <p className="text-[#90adcb] text-sm font-normal leading-normal pb-3 pt-1 px-4">
              {event.capacity} seats available
            </p>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              {event.description}
            </p>
            <div className="flex px-4 py-3 justify-end">
              <button
                onClick={handleBooking}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-[#3d99f5] text-white text-base font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">
                  {isLoggedIn ? "Book Now" : "Login to Book"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default EventsDetail;