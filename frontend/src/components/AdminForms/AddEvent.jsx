import { useState } from "react";

function AddEvent({ onCreated }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  return (
    <>
      <form action="">
        <div class="flex max-w-[780px] flex-wrap items-end gap-4 px-4 py-3">
          <label class="flex flex-col min-w-40 flex-1">
            <p class="text-white text-base font-medium leading-normal pb-2 justify-center mx-auto">
              Event Title
            </p>
            <input
              placeholder="Enter Event Title"
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal justify-center mx-auto"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>

        <div class="flex max-w-[780px] flex-wrap items-end gap-4 px-4 py-3">
          <label class="flex flex-col min-w-40 flex-1">
            <p class="text-white text-base font-medium leading-normal pb-2 justify-center mx-auto">
              Event Picture
            </p>
            <input
              placeholder="Enter Event Picture URL"
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal justify-center mx-auto"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
        </div>

        <div class="flex max-w-[780px] flex-wrap items-end gap-4 px-4 py-3">
          <label class="flex flex-col min-w-40 flex-1">
            <p class="text-white text-base font-medium leading-normal pb-2 justify-center mx-auto">
              Description
            </p>
            <textarea
              placeholder="Enter Event Description"
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none min-h-36 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal justify-center mx-auto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
        </div>

        <div class="flex max-w-[780px] flex-wrap items-end gap-4 px-4 py-3">
          <label class="flex flex-col min-w-40 flex-1">
            <p class="text-white text-base font-medium leading-normal pb-2 justify-center mx-auto">
              Event Date
            </p>
            <input
              type="date"
              placeholder="Enter event title"
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal justify-center mx-auto"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>

        <div class="flex max-w-[780px] flex-wrap items-end gap-4 px-4 py-3">
          <label class="flex flex-col min-w-40 flex-1">
            <p class="text-white text-base font-medium leading-normal pb-2 justify-center mx-auto">
              Event Time
            </p>
            <input
              type="time"
              placeholder="Enter event title"
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal justify-center mx-auto"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
        </div>

        <div class="flex max-w-[780px] flex-wrap items-end gap-4 px-4 py-3">
          <label class="flex flex-col min-w-40 flex-1">
            <p class="text-white text-base font-medium leading-normal pb-2 justify-center mx-auto">
              Event Location
            </p>
            <input
              placeholder="Enter Event Location"
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
        </div>

        <div class="flex max-w-[780px] flex-wrap items-end gap-4 px-4 py-3">
          <label class="flex flex-col min-w-40 flex-1">
            <p class="text-white text-base font-medium leading-normal pb-2 justify-center mx-auto">
              Maximum Capicity
            </p>
            <input
              placeholder="Enter Event Capacity"
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </label>
        </div>

        <div className="flex px-4 py-3">
          <button className="flex min-w-[84px] max-w-[780px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#3d99f5] text-white text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Add Event</span>
          </button>
        </div>
      </form>
    </>
  );
}

export default AddEvent;
