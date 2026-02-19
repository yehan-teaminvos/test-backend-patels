import ActiveFilter from "@/components/products/active-filter";
import ProductCard from "@/components/product-card";
import ProductListSort from "../../components/products/product-list-sort";
import ProductPagination from "@/components/products/product-pagination";
import { products } from "@/data/products";
import { formatLKR } from "@/lib/priceFromatLKR";
import { SearchX } from "lucide-react";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

interface ProductsPageProps {
  searchParams: SearchParams;
}

const ITEMS_PER_PAGE = 10;

const normalize = (text: string) =>
  text.toLowerCase().trim().replace(/\s+/g, "-");

const SORT_STRATEGIES: Record<string, (a: any, b: any) => number> = {
  lth: (a, b) => a.price - b.price,
  htl: (a, b) => b.price - a.price,
  new: (a, b) => b.productId.localeCompare(a.productId),
  default: () => 0,
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  // Data processing logic
  const currentPage = Math.max(1, Number(params.page) || 1);
  const sortKey = (
    typeof params.sort === "string" ? params.sort : "default"
  ) as keyof typeof SORT_STRATEGIES;
  const minPrice = Number(params.min) || 0;
  const maxPrice = Number(params.max) || Infinity;
  const minRating = Number(params.rating) || 0;

  const selectedFlowers =
    typeof params.flower === "string" ? params.flower.split(",") : [];
  const selectedColors =
    typeof params.color === "string" ? params.color.split(",") : [];
  const selectedOccasions =
    typeof params.occasion === "string" ? params.occasion.split(",") : [];

  const filtered = products.filter((p) => {
    if (p.price < minPrice || p.price > maxPrice) return false;
    if ((p.rating ?? 0) < minRating) return false;
    if (
      selectedFlowers.length &&
      !selectedFlowers.includes(normalize(p.flowerType))
    )
      return false;
    if (
      selectedColors.length &&
      !selectedColors.includes(p.color.toLowerCase())
    )
      return false;
    if (
      selectedOccasions.length &&
      !p.occasion.some((o) => selectedOccasions.includes(o))
    )
      return false;

    if (params.availability && p.availability !== params.availability)
      return false;

    return true;
  });

  const sorted = [...filtered].sort(
    SORT_STRATEGIES[sortKey] || SORT_STRATEGIES.default,
  );

  const totalResults = sorted.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
                We couldn’t find any matches for your current filters. Try
                broadening your search or resetting the price range.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3.5 xl:gap-x-6 gap-y-10">
              {paginated.map((product) => (
                <ProductCard
                  key={product.productId}
                  isHaveFavIcon={false}
                  src={product.productImage}
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

