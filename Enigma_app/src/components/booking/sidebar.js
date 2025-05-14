const Sidebar = ({ setActiveTab, activeTab }) => {
    return (
      <div className="w-64 py-10 px-6 ms-4 me-6 bg-gradient-to-b from-[#1f1b3a]/50 to-[#0f012f]/50 text-gray-200 rounded-xl shadow-lg">
        <ul className="space-y-2">
          {[
            { name: "Pending", key: "PENDING" },
            { name: "Scheduled", key: "SCHEDULED" },
            { name: "Completed", key: "COMPLETED" },
            { name: "Canceled", key: "CANCELED" },
          ].map((item) => (
            <li
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`p-3 rounded-md cursor-pointer transition-all duration-200 
                ${
                  activeTab === item.key
                    ? "bg-purple-600 text-white font-semibold"
                    : "hover:bg-purple-800 hover:text-white"
                }`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Sidebar;
  