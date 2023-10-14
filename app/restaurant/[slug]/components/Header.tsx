import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      location: true,
    },
  });

  if (!restaurant) notFound();

  return restaurant;
};

const Header = async ({ name }: { name: string }) => {
  const restaurant = await fetchRestaurantBySlug(name);

  return (
    <div className="h-96 overflow-hidden">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h1 className="text-7xl text-white captitalize text-shadow text-center">
          {restaurant.name} (
          {restaurant.location.name.charAt(0).toUpperCase() + restaurant.location.name.slice(1)})
        </h1>
      </div>
    </div>
  );
};

export default Header;
