import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Header from './components/Header'

function App() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/events");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.location.toLowerCase().includes(search.toLowerCase())
  );

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

  return (
    <>
    <main className='bg-[#101a23] min-h-screen'>
      <Header/>

      <section className='text-white px-20 flex flex-1 flex-col py-10 gap-6'>
        <h1 className='tracking-light text-[32px] font-bold leading-tight min-w-72'>Upcoming Events</h1>
        
        <div>
          <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div
                    className="text-[#90adcb] flex border-none bg-[#223649] items-center justify-center pl-4 rounded-l-xl border-r-0"
                    data-icon="MagnifyingGlass"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    placeholder="Search For Events"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-full placeholder:text-[#90adcb] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </label>
        </div>

        {/* Events List */}
        <div className="flex flex-col gap-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="flex items-stretch justify-between gap-4 rounded-xl">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#90adcb] text-sm font-normal leading-normal">Upcoming</p>
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
              <p className="text-[#90adcb] text-lg">No events found</p>
            </div>
          )}
        </div>
      </section>
    </main>
    </>
  )
}

export default App