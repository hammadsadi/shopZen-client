"use client";
import React, { useState } from "react";
import CreateBrandModal from "./CreateBrandModal";
import { SZTable } from "@/components/ui/core/SZTable";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { TBrand } from "@/types/brand.types";
import DeleteConfirmationModal from "@/components/ui/core/SZModal/DeleteComfirmationModal";
import { deleteSingleBrand } from "@/services/Brand";
interface IBrandsPropsTypes {
  brands: TBrand[];
}
const ManageBrand = ({ brands }: IBrandsPropsTypes) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleDelete = (data: TBrand) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteSingleBrand(selectedId);
        console.log(res);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };
  const columns: ColumnDef<TBrand>[] = [
    {
      accessorKey: "name",
      header: () => <div>Brand Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.logo}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: () => <div>Brand Status</div>,
      cell: ({ row }) => (
        <div>
          {row.original.isActive ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              True
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              False
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <button
          className="text-red-500"
          title="Delete"
          onClick={() => handleDelete(row.original)}
        >
          <Trash className="w-5 h-5" />
        </button>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center py-5">
        <h2 className="font-bold md:text-2xl text-xl">Manage Brands</h2>
        <CreateBrandModal />
      </div>
      {/* Brands Data */}
      <SZTable data={brands} columns={columns} />
      {/* Delete Modal */}
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageBrand;
