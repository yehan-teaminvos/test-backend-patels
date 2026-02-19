export type ProductProps = {
  productId: string;
  name: string;
  productImage: string;
  description: string;
  price: number;
  flowerType: "roses" | "tulips" | "lilies" | "daisies" | "sunflowers";
  occasion: (
    | "weddings"
    | "birthday"
    | "anniversary"
    | "thank-you"
    | "graduation"
  )[];
  color: "red" | "pink" | "white" | "yellow" | "mixed";
  rating?: 1 | 2 | 3 | 4 | 5;
  reviews?: 10;
  availability: "in-stock" | "out-of-stock";
};
