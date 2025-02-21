import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const regions = {
  "North India": ["Punjab", "Himachal Pradesh", "Uttarakhand Unit 1", "Uttarakhand Unit 2", "Uttarakhand (M. K. Printpack Pvt. Ltd.)"],
  "West India": ["West Daman", "Daman", "Gujarat", "Maharashtra", "Goa"],
  "South India": ["Andhra Pradesh"],
  "East India": ["Assam"]
};

const locations = [
  {
    name: "West Daman",
    address: "Plot No.11 & 13, Shakti Industrial Estate, Ringanwada, Nani Daman, Daman:396210",
    coords: [20.3974, 72.8328],
    region: "West India"
  },
  {
    name: "Daman",
    address: "Survey No 327/10, Unity Industrial Complex, Opposite Ginza Industries, Kachigam, Daman:396210",
    coords: [20.4143, 72.8514],
    region: "West India"
  },
  {
    name: "Maharashtra",
    address: "Gate No.357/77, 79, 81, Chakan-Talegaon Road, Kharabwadi, Tal-Khed, Chakan, Pune: 410501",
    coords: [18.7573, 73.6468],
    region: "West India"
  },
  {
    name: "Gujarat",
    address: "Block No 495/ Paikee 2 & 3, Village Motaponda, Tal Kaprada, Dist.Valsad, Gujarat:396191",
    coords: [20.3657, 72.9270],
    region: "West India"
  },
  {
    name: "Punjab",
    address: "Village Sandarsi, Shambhu-Ghana Road, Rajpura, Dist Patiala, Punjab: 140417",
    coords: [30.4800, 76.5926],
    region: "North India"
  },
  {
    name: "Uttarakhand Unit 1",
    address: "Plot No. 23-26, Sector- 4IIE, SIDCUL, Rudrapur, Uttarakhand: 263153",
    coords: [28.9784, 79.3996],
    region: "North India"
  },
  {
    name: "Uttarakhand Unit 2",
    address: "Plot Nos. 8, 9 & 10, Sector- 3IIE, SIDCUL, Rudrapur, Uttarakhand: 263153",
    coords: [28.9765, 79.4012],
    region: "North India"
  },
  {
    name: "Himachal Pradesh",
    address: "Plot No 31-B, 32-Ext, HPSIDC Industrial Area, Baddi, Solan, Himachal Pradesh: 173205",
    coords: [30.9578, 76.7914],
    region: "North India"
  },
  {
    name: "Andhra Pradesh",
    address: "1320, Rosewood Drive, Mopurupalli Village, Varadaiahpalem Mandal, Sricity, Andhra Pradesh: 517646",
    coords: [13.5544, 79.9992],
    region: "South India"
  },
  {
    name: "Goa",
    address: "D2-6/7, Mapusa Industrial Estate, Mapusa, Bardez, Goa: 403507",
    coords: [15.5937, 73.8177],
    region: "West India"
  },
  {
    name: "Assam",
    address: "Dag No 23, 29, 30, 33, 34, 35, 36 & 37, Village Kamalpur (Dinkar), Baihata, Dist Kamrup, Assam: 781380",
    coords: [26.4710, 91.6372],
    region: "East India"
  },
  {
    name: "Uttarakhand (M. K. Printpack Pvt. Ltd.)",
    address: "Plot N. -G-2/ 3/ 4 Industrial Area, Bahadrabad, Haridwar, Uttarakhand: 249402",
    coords: [29.0244, 78.9635],
    region: "North India"
  }
];

function Location() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);
  const [mapZoom, setMapZoom] = useState(5);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setMapCenter(location.coords);
    setMapZoom(12);
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region === selectedRegion ? null : region);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-6xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 drop-shadow-lg">
          Our Locations Across India
        </h1>

        {/* Region filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.keys(regions).map((region) => (
            <button
              key={region}
              onClick={() => handleRegionClick(region)}
              className={`
                px-6 py-3 rounded-full text-lg font-semibold
                transition-all duration-300 ease-in-out
                transform hover:scale-105
                ${selectedRegion === region
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'}
              `}
            >
              {region}
            </button>
          ))}
        </div>
        
        <div className="mt-10">
          <MapContainer
            key={`${mapCenter[0]}-${mapCenter[1]}-${mapZoom}`}
            center={mapCenter}
            zoom={mapZoom}
            className="w-full h-[600px] rounded-2xl shadow-2xl border-4 border-white/50 backdrop-blur-sm"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {locations
              .filter(location => !selectedRegion || location.region === selectedRegion)
              .map((location, index) => (
                <Marker 
                  key={index} 
                  position={location.coords}
                >
                  <Popup className="text-lg">
                    <div className="p-4 backdrop-blur-sm">
                      <h2 className="font-bold text-indigo-800 text-xl mb-2 border-b border-indigo-200 pb-2">
                        {location.name}
                      </h2>
                      <p className="text-gray-700 leading-relaxed">{location.address}</p>
                      <div className="mt-3 text-sm text-indigo-600 font-medium">
                        Region: {location.region}
                      </div>
                    </div>
                  </Popup>
                </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {Object.entries(regions).map(([regionName, regionLocations]) => (
            <div key={regionName} className="space-y-4">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4 border-b-2 border-indigo-200 pb-2">
                {regionName}
              </h3>
              {locations
                .filter(location => location.region === regionName)
                .map((location, index) => (
                  <div
                    key={index}
                    onClick={() => handleLocationClick(location)}
                    className={`
                      p-6 rounded-xl backdrop-blur-sm
                      transition-all duration-500 ease-in-out
                      cursor-pointer border-2
                      ${selectedLocation?.name === location.name 
                        ? 'bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 border-indigo-300 shadow-xl' 
                        : 'bg-white/50 border-transparent shadow-lg hover:shadow-2xl'
                      }
                      hover:scale-102
                      hover:bg-white/80
                      hover:border-indigo-200
                      group
                    `}
                  >
                    <h2 className="text-xl font-semibold mb-3 text-indigo-800 group-hover:text-indigo-900">
                      {location.name}
                    </h2>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 text-sm">
                      {location.address}
                    </p>
                    <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {location.region}
                    </div>
                  </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Location;