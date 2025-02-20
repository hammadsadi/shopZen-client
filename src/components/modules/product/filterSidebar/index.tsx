"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

const FilterSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [price, setPrice] = useState(50);

  const productTypes = [
    "Laptop & Accessories",
    "Computers Pc",
    "Speakers & Headset",
    "Keyboards & Mouse",
    "Camera",
    "Video Recording",
    "Tablet",
    "Table Lights",
  ];

  const brands = ["HP", "Apple", "Dell", "Asus", "Canon"];
  const ratings = [5, 4, 3, 2, 1];
  const availability = ["In Stock", "Pre Order", "Upcoming"];

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("filter-sidebar");
      if (sidebar && !sidebar.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="relative">
      {/* Filter Button for Mobile */}
      <Button
        variant="outline"
        className="lg:hidden flex items-center gap-2"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Filter size={20} />
        Filters
      </Button>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" />
      )}

      {/* Sidebar */}
      <Card
        id="filter-sidebar"
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto bg-white z-50 lg:z-auto shadow-md p-4 w-72 transition-transform duration-300 
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <CardContent className="relative">
          {/* Close Button for Mobile */}
          <button
            className="absolute top-2 right-2 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>

          <h2 className="text-lg font-semibold mb-4">Filter By Price</h2>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Min"
              className="border rounded px-2 py-1 w-full"
            />
            <input
              type="text"
              placeholder="Max"
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <Slider
            defaultValue={[price]}
            max={100}
            onValueChange={(val) => setPrice(val[0])}
          />
          <p className="mt-2">${price}</p>

          <h2 className="text-lg font-semibold mt-6">Product Types</h2>
          <ul className="space-y-2 mt-2">
            {productTypes.map((type, index) => (
              <li key={index} className="flex items-center gap-2">
                <Checkbox />
                <span>{type}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold mt-6">Brands</h2>
          <ul className="space-y-2 mt-2">
            {brands.map((brand, index) => (
              <li key={index} className="flex items-center gap-2">
                <Checkbox />
                <span>{brand}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold mt-6">Rating</h2>
          <ul className="space-y-2 mt-2">
            {ratings.map((rating, index) => (
              <li key={index} className="flex items-center gap-2">
                <Checkbox />
                <span className="text-yellow-500">
                  {"★".repeat(rating)}
                  {"☆".repeat(5 - rating)}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold mt-6">Availability</h2>
          <ul className="space-y-2 mt-2">
            {availability.map((status, index) => (
              <li key={index} className="flex items-center gap-2">
                <Checkbox />
                <span>{status}</span>
              </li>
            ))}
          </ul>

          {/* Apply Filter Button */}
          <Button
            className="mt-4 w-full"
            onClick={() => setIsSidebarOpen(false)}
          >
            Apply Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterSidebar;
