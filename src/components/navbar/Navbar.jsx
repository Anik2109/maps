import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faMicrophone } from '@fortawesome/free-solid-svg-icons';


function Navbar() {
    return (
        <div className="flex flex-col items-center"> 
          <div className="flex flex-col md:flex-row items-center w-full justify-between mb-2 mt-2 px-4">
            
          <div className="relative w-full max-w-lg mb-4 md:mb-0">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="text"
                className="w-full p-1.5 pl-10 pr-10 border-2 border-gray-300 rounded-full outline-none"
                placeholder="Search..."
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faMicrophone} />
              </button>
            </div>

            <div className="flex flex-wrap space-x-0 md:space-x-8 ml-0 md:ml-4">
              <button className="bg-gray-50 text-gray-800 rounded-full px-4 py-2 mb-2 md:mb-0 shadow-xl border border-gray-300 transition-all duration-200 ease-in-out hover:shadow-2xl hover:bg-gray-150 ">Restaurants</button>
              <button className="bg-gray-50 text-gray-800 rounded-full px-4 py-2 mb-2 md:mb-0 shadow-xl border border-gray-300 transition-all duration-200 ease-in-out hover:shadow-2xl hover:bg-gray-150">Things to do</button>
              <button className="bg-gray-50 text-gray-800 rounded-full px-4 py-2 mb-2 md:mb-0 shadow-xl border border-gray-300 transition-all duration-200 ease-in-out hover:shadow-2xl hover:bg-gray-150">Transit</button>
              <button className="bg-gray-50 text-gray-800 rounded-full px-4 py-2 mb-2 md:mb-0 shadow-xl border border-gray-300 transition-all duration-200 ease-in-out hover:shadow-2xl hover:bg-gray-150">Pharmacies</button>
              <button className="bg-gray-50 text-gray-800 rounded-full px-4 py-2 mb-2 md:mb-0 shadow-xl border border-gray-300 transition-all duration-200 ease-in-out hover:shadow-2xl hover:bg-gray-150">ATMs</button>
              <button className="bg-gray-50 text-gray-800 rounded-full px-4 py-2 mb-2 md:mb-0 shadow-xl border border-gray-300 transition-all duration-200 ease-in-out hover:shadow-2xl hover:bg-gray-150">Hotels</button>
              <button className="bg-gray-50 text-gray-800 rounded-full px-4 py-2 mb-2 md:mb-0 shadow-xl border border-gray-300 transition-all duration-200 ease-in-out hover:shadow-2xl hover:bg-gray-150">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      );
}

export default Navbar;