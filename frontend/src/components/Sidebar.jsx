import { CalendarPlus, List, Users } from "lucide-react";

/**
 * Sidebar component.
 *
 * It renders a sidebar with three tabs: "Add Event", "Manage Events", and "Bookings".
 * The active tab is highlighted with a gradient background and white text.
 * When a tab is hovered, its background color and text color are changed.
 *
 * @param {Object} props - Component props.
 * @param {string} props.activeTab - The currently active tab.
 * @param {Function} props.setActiveTab - Function to set the active tab.
 * @returns {JSX.Element} Sidebar component.
 */
export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "add", label: "Add Event", icon: <CalendarPlus size={18} /> },
    { id: "manage", label: "Manage Events", icon: <List size={18} /> },
    { id: "bookings", label: "Bookings", icon: <Users size={18} /> },
  ];

  return (
    <aside className="w-60 bg-[#0f2a38] text-white rounded-xl shadow-md p-4">
      <nav className="space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#2d9cff] to-[#3d99f5] text-white shadow"
                : "hover:bg-[#183241] hover:text-[#3d99f5]"
            }`}
          >
            {tab.icon}
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
