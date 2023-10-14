import { Review } from '@prisma/client';

export default function calculateReviewRatingAverage(reviews: Review[]): number | string {
  if (!reviews.length) return 0;

  const total = reviews.reduce((acc, review) => acc + review.rating, 0);
  const ratingAverage = total / reviews.length;

  return ratingAverage.toFixed(1);
}
