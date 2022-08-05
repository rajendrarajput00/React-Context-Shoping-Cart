import { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";


const Home = () => {
  const {
    state: { products },
    productState: { sort, byFastDelivery, byRating, searchQuery },
  } = CartState();

  let [proData, setProData] = useState([]);

  useEffect(() => {
    transformProducts();
  }, [products])

  const transformProducts = () => {
    let sortedProducts = products;


    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }


    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }
    console.log('products03', sortedProducts);

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }


    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }
    setProData(sortedProducts);
  };


  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {proData.map((prod) => (
          <SingleProduct prod={prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
