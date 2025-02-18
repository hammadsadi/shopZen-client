import React from "react";
import CreateBrandModal from "./CreateBrandModal";

const ManageBrand = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold md:text-2xl text-xl">Manage Brands</h2>
        <CreateBrandModal />
      </div>
    </div>
  );
};

export default ManageBrand;
