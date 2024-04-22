import { MdOutlineStarHalf, MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";


interface RatingsProps {
  rating: number;
  amountOfReviews: number;
}

const Ratings: React.FC<RatingsProps> = ({ rating, amountOfReviews }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.25 && rating % 1 < 1 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <span className='flex items-center'>
      {Array.from({ length: fullStars }, (_, i) => (
        <MdOutlineStarPurple500 key={i} />
      ))}
      {halfStar ? <MdOutlineStarHalf key={`half-star-${rating}`} /> : null}
      {Array.from({ length: emptyStars }, (_, i) => (
        <MdOutlineStarOutline key={`empty-star-${i + fullStars + halfStar}`} />
      ))}
      <span className='ml-2 text-gray-500 italic'>{rating.toFixed(2)}</span>
    </span>
  );
};

export default Ratings;
