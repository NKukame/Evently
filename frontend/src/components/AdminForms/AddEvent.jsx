import { useState } from "react";

function AddEvent({ onCreated }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          image,
          description,
          date: new Date(date).toISOString(),
          time,
          location,
          capacity: parseInt(capacity)
        }),
      });

      if (response.ok) {
        setTitle(""); setImage(""); setDescription("");
        setDate(""); setTime(""); setLocation(""); setCapacity("");
        
        if (onCreated) onCreated();
        setAlertMessage("Event created successfully!");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } else {
        setAlertMessage("Failed to create event");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("Network error");
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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

      <form onSubmit={handleSubmit}>
        <div className="flex max-w-[780px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2 justify-center mx-auto">
              Event Title
            </p>
            <input
              placeholder="Enter Event Title"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal justify-center mx-auto"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="flex max-w-[780px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2 justify-center mx-auto">
              Event Picture
            </p>
            <input
              placeholder="Enter Event Picture URL"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal justify-center mx-auto"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
        </div>

        <div className="flex max-w-[780px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2 justify-center mx-auto">
              Description
            </p>
            <textarea
              placeholder="Enter Event Description"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none min-h-36 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal justify-center mx-auto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </label>
        </div>

        <div className="flex max-w-[780px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2 justify-center mx-auto">
              Event Date
            </p>
            <input
              type="date"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal justify-center mx-auto"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="flex max-w-[780px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2 justify-center mx-auto">
              Event Time
            </p>
            <input
              type="time"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal justify-center mx-auto"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="flex max-w-[780px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2 justify-center mx-auto">
              Event Location
            </p>
            <input
              placeholder="Enter Event Location"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="flex max-w-[780px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2 justify-center mx-auto">
              Maximum Capacity
            </p>
            <input
              type="number"
              placeholder="Enter Event Capacity"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </label>
        </div>

        {isLoading ? (
              <div className="flex flex-row gap-2 items-center justify-center px-4 py-3">
                <div className="w-4 h-4 rounded-full bg-[#3d99f5] animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-[#3d99f5] animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-[#3d99f5] animate-bounce [animation-delay:-.5s]"></div>
              </div>
            ) : (
              <div className="flex px-4 py-3">
                <button
                  type="submit"
                  className="flex min-w-[84px] max-w-[780px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#3d99f5] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">
                    Add Event
                  </span>
                </button>
              </div>
            )}
      </form>
    </>
  );
}

export default AddEvent;