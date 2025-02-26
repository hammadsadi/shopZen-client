"use client";

import { SZTable } from "@/components/ui/core/SZTable";
import TablePagination from "@/components/ui/core/SZTable/TablePagination";
import { TCoupon, TMeta, TProduct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

const CouponTable = ({
  coupons,
  meta,
}: {
  coupons: TProduct[];
  meta: TMeta;
}) => {
  // const [selectedProductsId, setSelectedProductsId] = useState<string[]>([]);

  // const router = useRouter();

  // const handleView = (product: TProduct) => {
  //   console.log("Viewing product:", product);
  // };

  // const handleDelete = (productId: string) => {
  //   console.log("Deleting product with ID:", productId);
  // };

  const columns: ColumnDef<TCoupon>[] = [
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => <span>{row.original?.code}</span>,
    },
    {
      accessorKey: "discountType",
      header: "Discount Type",
      cell: ({ row }) => <span>{row.original.discountType}</span>,
    },
    {
      accessorKey: "discountValue",
      header: "Discount Value",
      cell: ({ row }) => <span>{row.original.discountValue}</span>,
    },
    {
      accessorKey: "minOrderAmount",
      header: "Min Order Amount",
      cell: ({ row }) => <span>$ {row.original.minOrderAmount}</span>,
    },
    {
      accessorKey: "maxDiscountAmount",
      header: "Max Discount Amount",
      cell: ({ row }) => <span>$ {row.original.maxDiscountAmount}</span>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          {/* <button
            className="text-gray-500 hover:text-blue-500"
            title="View"
            onClick={() => handleView(row.)}
          >
            <Eye className="w-5 h-5" />
          </button> */}

          {/* <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() =>
              router.push(`/user/shop/update-product/${row.original._id}`)
            }
          >
            <Edit className="w-5 h-5" />
          </button> */}

          <button
            className="text-gray-500 hover:text-red-500"
            title="Delete"
            // onClick={() => handleDelete(row.original._id)}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="my-5">
      <SZTable columns={columns} data={coupons || []} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default CouponTable;
