const menuItems = [
  { name: "Dashboard", key: "dashboard" },
  { name: "Orders", key: "orders" },
  { name: "Products", key: "products" },
  { name: "Users", key: "users" },
];

const Sidebar = ({ setActiveTab, activeTab }) => {
  return (
    <div className="w-64 py-10 px-6 ms-4 me-6 bg-white text-black rounded-xl shadow-lg pt-6">
      <ul>
        {menuItems.map((item) => {
          const isActive = activeTab === item.key;
          
          return (
            <li
              key={item.key}
              className={`p-3 rounded-md cursor-pointer transition-all duration-200 
                ${isActive 
                  ? "bg-custom-purple text-white font-semibold" 
                  : "hover:bg-custom-purple-dark hover:text-white"
                }`
              }
              onClick={() => setActiveTab(item.key)}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;