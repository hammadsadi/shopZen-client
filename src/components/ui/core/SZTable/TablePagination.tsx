import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "../../button"
import { useState } from "react";

const TablePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNo = 10;

  // Handle Previous
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle Next
  const handleNext = () => {
    if (currentPage < pageNo) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="flex justify-center items-center space-x-2 my-3">
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="w-8 h-8 rounded-full"
        variant="outline"
      >
        <ArrowLeft />
      </Button>
      {[...Array(pageNo)].map((_, index) => (
        <Button
          onClick={() => setCurrentPage(index + 1)}
          key={index}
          className="w-8 h-8 rounded-full"
          variant={`${currentPage === index + 1 ? "default" : "outline"}`}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        disabled={currentPage === pageNo}
        onClick={handleNext}
        className="w-8 h-8 rounded-full"
        variant="outline"
      >
        <ArrowRight />
      </Button>
    </div>
  );
}

export default TablePagination
