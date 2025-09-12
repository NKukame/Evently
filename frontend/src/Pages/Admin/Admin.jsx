import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import AddEvent from "../../components/AdminForms/AddEvent";

function Admin() {
  const [activeTab, setActiveTab] = useState("add");
  const [refreshKey, setRefreshKey] = useState(0);

  // Called when AddEvent creates a new event or ManageEvents updates/deletes
  function triggerRefresh() {
    setRefreshKey((k) => k + 1);
  }

  return (
    <>
      <main className="bg-[#101a23] min-h-screen">
        <Header />

        {/* Main content area under header */}
        <div className="flex flex-row max-w-7xl mx-auto p-6 gap-6 h-[calc(100vh-80px)]">
          {/* Sidebar now takes only needed space */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Right content */}
          <div className="flex-1 bg-[#0f2734] p-6 rounded-xl shadow-md overflow-y-auto max-h-full">
            <div className="max-w-2xl mx-auto">
              {activeTab === "add" && (
                <>
                  <h2 className="text-white text-[24px] font-bold pb-4 text-center">
                    Add Event
                  </h2>
                  <AddEvent onCreated={triggerRefresh} />
                </>
              )}

              {activeTab === "manage" && (
                <>
                  <h2 className="text-white text-[24px] font-bold pb-4 text-center">
                    Manage Events
                  </h2>
                  {/* <ManageEvents
                    refreshKey={refreshKey}
                    onChange={triggerRefresh}
                  /> */}
                </>
              )}

              {activeTab === "bookings" && (
                <div className="text-white text-center">
                  <h2 className="text-white text-[24px] font-bold pb-4">
                    Bookings
                  </h2>
                  <p className="text-gray-300">
                    Bookings management coming soon — you’ll be able to view
                    attendees & export CSV.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Admin;
