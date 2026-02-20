// ═══════════════════════════════════════════════════════════
// PRODUCTS PAGE — Now reads from DATABASE instead of static file!
// ═══════════════════════════════════════════════════════════
//
// BEFORE:
//   import { products } from "@/data/products";    ← static file
//   const filtered = products.filter(...)           ← filter in JS
//
// AFTER:
//   import { getDb } from "@/lib/get-db";           ← database
//   import { getProducts } from "@/db/product-queries";
//   const { products } = await getProducts(db, filters);  ← filter in DB!
//
// WHY IS THIS BETTER?
//   1. Data lives in the database — you can add/edit/remove products
//      without touching code
//   2. Filtering/sorting/pagination happens in SQL (much faster)
//   3. The database is the single source of truth

import ActiveFilter from "@/components/products/active-filter";
import ProductCard from "@/components/product-card";
import ProductListSort from "../../components/products/product-list-sort";
import ProductPagination from "@/components/products/product-pagination";
import { formatLKR } from "@/lib/priceFromatLKR";
import { SearchX } from "lucide-react";

// ─── NEW: Import database helpers instead of static data ───
import { getDb } from "@/lib/get-db";
import { getProducts } from "@/db/product-queries";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

interface ProductsPageProps {
  searchParams: SearchParams;
}

const ITEMS_PER_PAGE = 10;

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  // Read filters from URL (same as before)
  const currentPage = Math.max(1, Number(params.page) || 1);
  const sortKey = typeof params.sort === "string" ? params.sort : "default";

  // Map the frontend sort keys to the backend sort keys
  const sortMap: Record<string, "price-asc" | "price-desc" | "newest" | "rating"> = {
    lth: "price-asc",
    htl: "price-desc",
    new: "newest",
    default: "newest",
  };

  const selectedFlowers =
    typeof params.flower === "string" ? params.flower.split(",") : [];
  const selectedOccasions =
    typeof params.occasion === "string" ? params.occasion.split(",") : [];
  const selectedColors =
    typeof params.color === "string" ? params.color.split(",") : [];

  // ─── NEW: Fetch from database! ───
  // Instead of: const filtered = products.filter(...)
  // We now let the database do the filtering!
  const db = await getDb();
  const result = await getProducts(db, {
    flower: selectedFlowers[0] || undefined,      // filter by flower type
    occasion: selectedOccasions[0] || undefined,   // filter by occasion
    color: selectedColors[0] || undefined,         // filter by color
    inStock: params.availability === "in-stock" ? true : undefined,
    sort: sortMap[sortKey] || "newest",
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  // result = { products: [...], total: 17, page: 1, totalPages: 2 }
  const totalResults = result.total;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = result.products;

  return (
    <main>
      <div className="container mx-auto">
        <div>
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <p className="font-poppins text-light-black/50">
                Showing {totalResults > 0 ? startIndex + 1 : 0} –{" "}
                {Math.min(startIndex + ITEMS_PER_PAGE, totalResults)} of{" "}
                {totalResults} results
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500">
                Sort by:
              </span>
              <ProductListSort />
            </div>
          </header>

          <div className="mb-8">
            <ActiveFilter hideKeys={["sort", "page", "min", "max"]} />
          </div>
        </div>
        <div>
          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
              <div className="bg-rose-50 p-8 rounded-full mb-6">
                <SearchX className="w-16 h-16 text-rose-300" strokeWidth={1} />
              </div>
              <h2 className="text-3xl font-serif text-gray-800 mb-3">
                No Blooms Found
              </h2>
              <p className="text-gray-500 max-w-sm font-poppins leading-relaxed">
                We couldn't find any matches for your current filters. Try
                broadening your search or resetting the price range.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3.5 xl:gap-x-6 gap-y-10">
              {paginated.map((product) => (
                <ProductCard
                  key={product.id}
                  isHaveFavIcon={false}
                  src={product.productImage || "/home/flower1.avif"}
                  name={product.name}
                  price={formatLKR(product.price)}
                  currency="Rs."
                  installment={`${formatLKR(Math.ceil(product.price / 3))} x 3`}
                />
              ))}
            </div>
          )}
        </div>
        {totalResults > ITEMS_PER_PAGE && (
          <div>
            <footer className="flex justify-center mt-14">
              <ProductPagination
                totalItems={totalResults}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </footer>
          </div>
        )}
      </div>
    </main>
  );
}
