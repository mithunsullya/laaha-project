import { useState } from "react";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size: "sm" | "md";
}

const StarRating = ({ rating, onRatingChange, size }: StarRatingProps) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  // Define star sizes (you can adjust these as needed)
  const starSize = size === "sm" ? 20 : 30;

  // Function to handle hover and rating changes
  const handleMouseEnter = (index: number) => setHoveredRating(index);
  const handleMouseLeave = () => setHoveredRating(0);

  const handleClick = (index: number) => {
    onRatingChange(index);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        // Determine if the current star is filled or not
        const isFilled = starIndex <= (hoveredRating || rating);
        const starColor = isFilled ? "text-gold" : "text-gray-500";

        return (
          <div
            key={starIndex}
            className={`cursor-pointer ${starColor}`}
            style={{ fontSize: starSize }}
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
          >
            ★
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
