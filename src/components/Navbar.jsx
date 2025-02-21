import React, { useState, useEffect } from "react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsSticky(currentScrollY < lastScrollY || currentScrollY <= 100);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 📌 Handles scrolling for all sections across different pages (About, Markets, Innovation)
  const handleNavigation = (path, sectionId) => {
    navigate(path);
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const navLinks = [
    { title: "Home", path: "/" },
    {
      title: "About",
      path: "/about",
      dropdown: [
        { label: "Company Background", id: "company-background" },
        { label: "Our Journey", id: "our-journey" },
        { label: "Management Team", id: "management-team" },
        { label: "Awards and Recognitions", id: "awards" },
        { label: "Our Clients", id: "client" }
      ]
    },
    {
      title: "Markets and Products",
      path: "/markets",
      dropdown: [
        { label: "Our Products", id: "our-products" },
        { label: "Sustainability", id: "sustainability" },
        { label: "Our Markets", id: "our-markets" }
      ]
    },
    {
      title: "Innovation",
      path: "/innovation",
      dropdown: [
        { label: "Printing Technology", id: "printing-tech" },
        { label: "Finishing Technology", id: "finishing-tech" }
      ]
    },
    { title: "Locations", path: "/location" },
    {
      title: "Mockup",
      path: "/mockup",
      
    },
  ];

  const allSearchOptions = [
    { label: "About Us", path: "/about", id: "company-background" },
    { label: "Company Background", path: "/about", id: "company-background" },
    { label: "Management Team", path: "/about", id: "management-team" },
    { label: "Our Journey", path: "/about", id: "our-journey" },
    { label: "Awards & Recognitions", path: "/about", id: "awards" },
    { label: "Our Markets", path: "/markets", id: "our-markets" },
    { label: "Our Products", path: "/markets", id: "our-products" },
    { label: "Innovation", path: "/innovation", id: "printing-tech" },
    { label: "Printing Technology", path: "/innovation", id: "printing-tech" },
    { label: "Finishing Technology", path: "/innovation", id: "finishing-tech" },
    { label: "Locations", path: "/location", id: "location" },
    { label: "Mockup", path: "/mockup", id: "mockup" }
  ];
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResults([]);
    } else {
      setFilteredResults(
        allSearchOptions.filter(option =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery]);

  const handleSearchSelection = (option) => {
    setSearchQuery(option.label);
    setFilteredResults([]);
    handleNavigation(option.path, option.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredResults.length > 0) {
      handleSearchSelection(filteredResults[0]);
    }
  };
  return (
    <div className="w-full">
      <div className="bg-green-300 h-2"></div>
      <nav
        className={`${
          isSticky ? "fixed" : "absolute"
        } top-0 left-0 w-full z-20 bg-white shadow-md transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <img
              src="/images/parksons.png"
              alt="Parksons Packaging Logo"
              className="h-12 object-contain"
            />
          </div>
          {/* Search Bar */}
          <div className="relative flex-grow mx-8">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            
            {/* Dropdown for Search Recommendations */}
            {filteredResults.length > 0 && (
              <ul className="absolute w-full bg-white shadow-md mt-2 rounded-lg border border-gray-200 max-h-60 overflow-auto">
                {filteredResults.map((option, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSearchSelection(option)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex items-center space-x-6 text-2xl text-black">
            <a href="/login" className="flex items-center space-x-2 text-gray-700">
              <FaUserCircle />
              <span className="text-sm font-medium">Login</span>
            </a>
            <a href="/cart" className="text-gray-700">
              <FaShoppingCart />
            </a>
          </div>
        </div>
        <div className="bg-pink-900">
          <ul className="flex items-center justify-center space-x-6 py-3">
            {navLinks.map((link, index) => (
               <li
               key={index}
               className="relative group"
             >
               <a href={link.path} className="text-white hover:text-green-300 font-medium">
                 {link.title}
               </a>
               {link.dropdown && (
                 <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-48 opacity-0 transform scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100">
                   {link.dropdown.map((item, subIndex) => (
                     <li
                       key={subIndex}
                       className="px-4 py-2 hover:bg-green-100 text-gray-800 cursor-pointer border-b last:border-none transition-all duration-200"
                       onClick={() => handleNavigation(link.path, item.id)}
                     >
                       {item.label}
                     </li>
                   ))}
                 </ul>
               )}
             </li>
           ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;