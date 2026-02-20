"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Star, Check } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import RelatedProducts from "@/components/related-products";
import ProductTabs from "@/components/product-tabs";

// Type needed for the API response
type Product = {
  id: string;
  name: string;
  price: number;
  productImage: string;
  description: string;
  flowerType: string;
  occasion: string;
  colors: string;
  stock: number;
  rating?: number; // Optional in DB, default 0
  reviewsCount?: number;
};

const SingleProductContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState("pickup");
  const [activeTab, setActiveTab] = useState("description");
  const [addingToCart, setAddingToCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        const res = await fetch(`/api/products?id=${id}`);
        if (res.ok) {
           const data = await res.json() as Product;
           setProduct(data);
        }
      } catch (e) {
        console.error("Failed to fetch product", e);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = async () => {
    if (!product) return;
    setAddingToCart(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity }),
      });
      if (res.ok) {
        // notify header to refresh cart count
        window.dispatchEvent(new CustomEvent("cart-update"));
        alert("Added to cart! \u2705");
      } else {
        if (res.status === 401) {
          // Not logged in — open login popup
          window.dispatchEvent(new CustomEvent("open-login"));
        } else {
          alert("Failed to add to cart");
        }
      }
    } catch {
       alert("Something went wrong");
    } finally {
      setAddingToCart(false);
    }
  };

    const handleWishlist = async () => {
    if (!id) return;
    try {
      // Toggle logic would need to know if it's already in wishlist. 
      // For now we just add.
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });
      if (res.ok) {
         setInWishlist(true);
         alert("Added to wishlist!");
      } else {
         if (res.status === 401) alert("Please log in.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="h-screen flex justify-center items-center">Loading...</div>;
  if (!product) return <div className="h-screen flex justify-center items-center">Product not found.</div>;

  // Placeholder arrays for UI that are not in DB yet
  const thumbnails = [product.productImage]; 
  const paymentMethods = ["/shipping-details/payment/payment1.avif", "/shipping-details/payment/payment2.avif"];

  const installmentAmount = (product.price / 3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      <section>
        <div className="container mx-auto lg:px-8 px-4 lg:pt-50 pt-42 sm:pb-25 pb-20">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <Image
                src={product.productImage}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />
              <div className="grid grid-cols-3 mt-5 gap-5">
                 {/* Only showing main image for now as DB has 1 image */}
                 <Image
                    src={product.productImage}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
              </div>
            </div>

            <div className="relative">
              <h1 className="text-3xl font-laluxes mb-3">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`product-star-${i}`}
                      className={`h-4 w-4 ${i < 5 ? "text-[#FFE864] fill-[#FFE864]" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-base font-poppins text-[#000D0E80] font-medium">
                  5.0
                </span>
                <span className="text-base font-poppins font-light text-[#000D0E80]">
                  (1 Review)
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-medium font-poppins">
                    Rs. {product.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm font-poppins">
                  <span className="font-poppins text-[#000D0E80]">
                    3 X Rs {installmentAmount} with
                  </span>
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center gap-1"> 
                       <Image src={method} alt="Payment" width={40} height={25} className="h-5 w-auto" />
                       {index < paymentMethods.length - 1 && <span>or</span>}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[#000D0E80] mb-6 leading-relaxed font-poppins">
                {product.description}
              </p>

              <div className=" border-gray-300 p-4 mb-6">
                <h3 className="font-medium text-[24px] mb-3 font-poppins">
                  Product Details
                </h3>
                <div className="space-y-2 font-poppins">
                  <div className="flex justify-between">
                    <span className="text-[20px] font-light font-poppins">SKU:</span>
                    <span className="text-[20px] font-light font-poppins">{product.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[20px] font-light font-poppins">Flower:</span>
                    <span className="text-[20px] font-light font-poppins">{product.flowerType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[20px] font-light font-poppins">Availability:</span>
                    <span className="text-[20px] text-[#17E100] font-light font-poppins">
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t border-border py-5" />

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center w-max">
                  <button onClick={handleIncrease} className="px-3 border border-black/8">+</button>
                  <div className="px-3 border-b border-t border-black/8">{quantity}</div>
                  <button onClick={handleDecrease} className="px-3 border border-black/8">−</button>
                </div>

                <div className="flex gap-3 ml-auto">
                  <button onClick={handleWishlist} className={`p-3 px-8 border border-gray-200 hover:bg-gray-100 transition ${inWishlist ? "bg-pink-50 border-pink-200" : ""}`}>
                     <Heart strokeWidth={1} className={`w-5 h-5 ${inWishlist ? "fill-red-500 text-red-500" : ""}`} />
                  </button>
                  <button className="p-3 px-8 border border-gray-200 hover:bg-gray-100 transition">
                    <Share2 strokeWidth={1} className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6 text-lg font-poppins">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">
                  Rs. {(product.price * quantity).toLocaleString()}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <Button onClick={handleAddToCart} disabled={addingToCart} className="w-full bg-primary hover:bg-primary/90 text-white font-poppins text-base">
                  {addingToCart ? "Adding..." : "Add To Cart"}
                </Button>
                <Button className="w-full bg-white text-primary border border-primary ext-base hover:bg-white hover:text-primary transition font-poppins">
                  Buy Now
                </Button>
              </div>
              
               {/* Delivery options (static for now) */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryOption"
                    checked={deliveryOption === "pickup"}
                    onChange={() => setDeliveryOption("pickup")}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition ${
                      deliveryOption === "pickup" ? "border-[#17E100]" : "border-gray-300"
                    }`}
                  >
                    {deliveryOption === "pickup" && <Check className="w-5 h-5 text-[#17E100]" strokeWidth={2} />}
                  </div>
                  <span className="font-poppins text-[20px] font-light text-secondary-black">
                    Pickup available at Petals
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        rating={5}
        reviews={1}
      />

      <RelatedProducts />
    </>
  );
};

// Wrap in Suspense because useSearchParams causes client-side bailout
const SingleProduct = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SingleProductContent />
        </Suspense>
    )
}

export default SingleProduct;
