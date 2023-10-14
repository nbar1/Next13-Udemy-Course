import { Cuisine, Location, PRICE, Review } from '@prisma/client';
import Link from 'next/link';
import calculateReviewRatingAverage from '../../../utils/calculateReviewRatingAverage';
import Price from '../../components/Price';
import Stars from '../../components/Stars';

interface Restaurant {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  reviews: Review[];
  slug: string;
}

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const renderRatingText = (reviews: Review[]) => {
    const rating = calculateReviewRatingAverage(reviews);
    if (rating >= 4) return 'Awesome';
    if (rating >= 3) return 'Good';
    if (rating >= 2) return 'Average';
    if (rating === 0) return 'No reviews yet';
  };

  return (
    <div className="border-b flex pb-5">
      <img src={restaurant.main_image} alt="" className="w-44 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <Stars reviews={restaurant.reviews} />
          <p className="ml-2 text-sm">{renderRatingText(restaurant.reviews)}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
