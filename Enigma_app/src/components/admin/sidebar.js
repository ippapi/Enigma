const Sidebar = ({ setActiveTab, activeTab }) => {
    return (
        <div className="w-64 py-10 px-6 ms-4 me-6 bg-white text-black rounded-xl shadow-lg">
            <ul>
                {[
                    { name: "Dashboard", key: "dashboard" },
                    { name: "Orders", key: "orders" },
                    { name: "Products", key: "products" },
                    { name: "Users", key: "users" },
                ].map((item) => (
                    <li
                        key={item.key}
                        className={`p-3 rounded-md cursor-pointer transition-all duration-200 
                        ${
                            activeTab === item.key
                            ? "bg-purple-600 text-white font-semibold"
                            : "hover:bg-purple-800 hover:text-white"
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