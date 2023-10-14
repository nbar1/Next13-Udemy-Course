import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';
import SearchSidebar from './components/SearchSidebar';
import { Location, Cuisine, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: string;
}

const fetchRestaurants = async (searchParams: SearchParams) => {
  const { city, cuisine, price } = searchParams;
  const where = {};

  if (city) Object.assign(where, { location: { name: city.toLowerCase() } });
  if (cuisine) Object.assign(where, { cuisine: { name: cuisine.toLowerCase() } });
  if (price) Object.assign(where, { price: price });

  return await prisma.restaurant.findMany({
    where,
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      reviews: true,
      slug: true,
    },
  });
};

const fetchLocations = async (): Promise<Location[]> => {
  return await prisma.location.findMany();
};

const fetchCuisines = async (): Promise<Cuisine[]> => {
  return await prisma.cuisine.findMany();
};

const Search = async ({ searchParams }: { searchParams: SearchParams }) => {
  const restaurants = await fetchRestaurants(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSidebar locations={locations} cuisines={cuisines} searchParams={searchParams} />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <div className="text-center text-2xl mt-10">No restaurants found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
