"use client";
import Image from "next/image";
import ProductCard from "@/components/product-card";

const productData = [
  {
    name: "Blush Harmony",
    price: "Rs. 5,750.00",
    installment: "Rs 1,316.66",
    src: "/home/flower1.avif",
    link: "/",
  },
  {
    name: "Petal Whisper",
    price: "Rs. 4,500.00",
    installment: "Rs 1,316.66",
    src: "/home/flower2.avif",
    link: "/",
  },
  {
    name: "Golden Dawn Bouquet",
    price: "Rs. 6,200.00",
    installment: "Rs 1,316.66",
    src: "/home/flower3.avif",
    link: "/",
  },
  {
    name: "Velvet Bloom",
    price: "Rs. 5,800.00",
    installment: "Rs 1,316.66",
    src: "/home/flower4.avif",
    link: "/",
  },
];

const RelatedProducts = () => {
  return (
    <section>
      <div className="container mx-auto lg:px-8 px-4  py-11">
        <h2 className="text-3xl font-laluxes mb-8">Related products</h2>

        <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 ">
          {productData.map((item, id) => (
            <ProductCard
              key={id}
              imageStyle="lg:h-110.5 sm:h-80 h-60"
              isHaveFavIcon={true}
              src={item.src}
              name={item.name}
              price={item.price}
              installment={item.installment}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
