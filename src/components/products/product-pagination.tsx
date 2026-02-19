"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  totalItems: number;
  itemsPerPage: number;
}

export default function ProductPagination({ totalItems, itemsPerPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Number(searchParams.get("page")) || 1;
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(createPageUrl(page), { scroll: false });
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="p-2 cursor-pointer"
      >
        <ChevronLeft className="size-6" />
      </button>

      <div className="flex h-fit gap-2.5">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3.5 py-2 font-poppins transition-all leading-none cursor-pointer ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-primary"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-2 cursor-pointer disabled:opacity-60"
      >
        <ChevronRight className="size-6" />
      </button>
    </div>
  );
}
