const Sidebar = ({ setActiveTab, activeTab }) => {
    return (
      <div className="w-64 bg-white shadow-md p-4">
            <ul>
                {[
                    { name: "Pending", key: "PENDING" },
                    { name: "Scheduled", key: "SCHEDULED" },
                    { name: "Completed", key: "COMPLETED" },
                    { name: "Canceled", key: "CANCELED" },
                ].map((item) => (
                    <li
                        key={item.key}
                        className={`p-2 cursor-pointer ${
                        activeTab === item.key ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setActiveTab(item.key)}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
      </div>
    );
};

export default Sidebar;