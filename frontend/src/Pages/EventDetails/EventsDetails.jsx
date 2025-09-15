import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Header from "../../components/Header";

function EventsDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    fetchEvent();
    checkLoginStatus();
  }, [id]);

  useEffect(() => {
    if (isLoggedIn) {
      checkBookingStatus();
    }
  }, [isLoggedIn, id]);

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

  const checkBookingStatus = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3000/bookings/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setIsBooked(data.isBooked);
      }
    } catch (error) {
      console.error("Failed to check booking status:", error);
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

  const handleBooking = async () => {
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }

    setIsBooking(true);
    const token = localStorage.getItem('token');

    try {
      if (isBooked) {
        // Unbook the event
        const response = await fetch(`http://localhost:3000/bookings/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setIsBooked(false);
          fetchEvent(); // Refresh event data to show updated capacity
          setAlertMessage("Booking cancelled successfully!");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        } else {
          setAlertMessage(data.message || "Failed to cancel booking");
          setShowAlert(true);
        }
      } else {
        // Book the event
        const response = await fetch("http://localhost:3000/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            eventId: id
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setIsBooked(true);
          fetchEvent(); // Refresh event data to show updated capacity
          setAlertMessage("Booking successful!");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        } else {
          setAlertMessage(data.message || "Booking failed");
          setShowAlert(true);
        }
      }
    } catch (error) {
      setAlertMessage("Network error");
      setShowAlert(true);
    } finally {
      setIsBooking(false);
    }
  };

  const getButtonText = () => {
    if (!isLoggedIn) return "Login to Book";
    if (isBooked) return "Cancel Booking";
    return "Book Now";
  };

  const getButtonColor = () => {
    if (isBooked) return "bg-red-600 hover:bg-red-700";
    return "bg-[#3d99f5]";
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
        
        {/* Alert */}
        {showAlert && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div role="alert" className="alert alert-info bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{alertMessage}</span>
              <button onClick={() => setShowAlert(false)} className="ml-4 text-blue-700 hover:text-blue-900 text-xl">×</button>
            </div>
          </div>
        )}
        
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
            {isBooked && (
              <p className="text-green-400 text-sm font-medium leading-normal pb-3 pt-1 px-4">
                ✓ You have booked this event
              </p>
            )}
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              {event.description}
            </p>
            <div className="flex px-4 py-3 justify-end">
              <button
                onClick={handleBooking}
                disabled={isBooking}
                className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 ${getButtonColor()} text-white text-base font-bold leading-normal tracking-[0.015em] disabled:opacity-50`}
              >
                {isBooking ? (
                  <div className="flex flex-row gap-2">
                    <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
                    <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                ) : (
                  <span className="truncate">{getButtonText()}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default EventsDetail;