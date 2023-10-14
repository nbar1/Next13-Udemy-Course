import fullStar from '../../public/icons/full-star.png';
import halfStar from '../../public/icons/half-star.png';
import emptyStar from '../../public/icons/empty-star.png';
import Image from 'next/image';
import { Review } from '@prisma/client';
import calculateReviewRatingAverage from '../../utils/calculateReviewRatingAverage';

const Stars = ({ reviews }: { reviews: Review[] }) => {
  if (reviews.length === 0) return null;

  const rating = calculateReviewRatingAverage(reviews);

  return (
    <div className="flex items-center mr-2">
      {Array.from({ length: 5 }).map((_, i) => {
        const star = i + 1;
        let starType = emptyStar;
        if (rating >= star) {
          starType = fullStar;
        } else if (rating >= star - 0.5) {
          starType = halfStar;
        }
        return <Image src={starType} alt="star" key={i} width={20} height={20} className="mr-1" />;
      })}
    </div>
  );
};

export default Stars;
