import RestaurantCard from './components/RestaurantCard';
import Header from './components/Header';
import { Cuisine, Location, PRICE, PrismaClient, Review } from '@prisma/client';

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
  reviews: Review[];
}

const prisma = new PrismaClient();

const fetchRestaurants: () => Promise<RestaurantCardType[]> = async () => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      reviews: true,
    },
  });
  return restaurants;
};
const Home = async () => {
  const restaurants = await fetchRestaurants();
  console.log(restaurants);

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant, key) => (
          <RestaurantCard key={key} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
};

export default Home;
