const Sidebar = ({ setActiveTab, activeTab }) => {
    return (
      <div className="w-64 bg-white shadow-md p-4">
            <ul>
                {[
                    { name: "Dashboard", key: "dashboard" },
                    { name: "Orders", key: "orders" },
                    { name: "Products", key: "products" },
                    { name: "Users", key: "users" },
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