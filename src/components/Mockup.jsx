import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

const AnimatedBoxes = () => (
  <svg width="400" height="300" viewBox="0 0 400 300">
    <defs>
      <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#E2E8F0" }} />
        <stop offset="100%" style={{ stopColor: "#CBD5E1" }} />
      </linearGradient>
    </defs>
    <g>
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 200 150"
        to="360 200 150"
        dur="12s"
        repeatCount="indefinite"
      />
      <rect x="150" y="120" width="100" height="100" fill="url(#boxGradient)" />
    </g>
  </svg>
);

const Mockup = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const boxes = [
    { name: "Square Box", count: "33" },
    { name: "Gift Box", count: "102" },
    { name: "Mailer Box", count: "58" },
    { name: "Shipping Box", count: "41" },
    { name: "Display Box", count: "170" },
    { name: "Boxes with Window", count: "93" },
    { name: "Boxes with Handle", count: "130" },
    { name: "Boxes with Lid", count: "71" },
    { name: "Hanging Box", count: "74" },
    { name: "Sleeve & Tray Box", count: "92" },
    { name: "Polygonal Box", count: "142" },
  ];

  // Handle Search Input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredResults(
      query.length > 0
        ? boxes.filter((box) =>
            box.name.toLowerCase().includes(query.toLowerCase())
          )
        : []
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50 mt-40">
      <aside className="w-64 bg-gradient-to-br from-pink-200 to-blue-200 text-gray-900 rounded-r-xl shadow-xl min-h-[calc(100vh-72px)] p-6">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="space-y-2">
          <button
            className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ${
              selectedCategory === "All" ? "bg-white shadow-md" : "hover:bg-white hover:shadow-sm"
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            <span>All</span>
          </button>

          <button
            className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-lg transition duration-200 hover:bg-white hover:shadow-sm"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <span>Boxes</span>
            {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          <div
            className={`transition-all duration-300 ${
              isDropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            {boxes.map(({ name, count }) => (
              <div
                key={name}
                className={`flex items-center justify-between px-4 py-2 text-sm rounded-lg cursor-pointer transition duration-200 ${
                  selectedCategory === name ? "bg-white shadow-md" : "hover:bg-white hover:shadow-sm"
                }`}
                onClick={() => setSelectedCategory(name)}
              >
                <span>{name}</span>
                <span className="text-gray-500">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="p-8 mt-6 bg-purple-50 rounded-3xl border-2 border-black">
          <div className="flex items-start justify-between">
            <div className="max-w-xl">
              <h1 className="text-3xl font-bold mb-4">Customize & download box mockups</h1>
              <p className="text-gray-600 mb-6">Choose a box mockup and create your design online in minutes.</p>
              <div className="relative">
                <Search className="absolute left-4 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search free mockups"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white shadow-sm"
                />
                {filteredResults.length > 0 && (
                  <ul className="absolute w-full bg-white border rounded-xl mt-2 shadow-lg z-10">
                    {filteredResults.map((box) => (
                      <li
                        key={box.name}
                        className="p-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setSearchQuery(box.name)}
                      >
                        {box.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-8 flex-shrink-0">
              <AnimatedBoxes />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg mb-4">
            {selectedCategory === "All" ? "Boxes Mockups" : `${selectedCategory} Mockups`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(searchQuery.length > 0 ? filteredResults : boxes)
              .filter(box => selectedCategory === "All" || box.name === selectedCategory)
              .map(({ name }, index) => (
                <div key={index} className="p-4 bg-white rounded-xl border hover:shadow-lg transition">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4"></div>
                  <div className="text-sm font-medium">{name}</div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Mockup;
