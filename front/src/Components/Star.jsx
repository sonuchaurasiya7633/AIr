import React, { useState } from "react";
import { IoIosStar } from "react-icons/io";

const Star = ({ starValue = 5, onRate }) => {
  let [rating, setRating] = useState(0);
  let [hover, setHover] = useState(0);
  let [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingClick = (value) => {
    if (isSubmitting) return; // Prevent multiple clicks
    setIsSubmitting(true);
    setRating(value);
    if (onRate) {
      onRate(value);
    }
    setIsSubmitting(false);
    setRating(0); // Reset rating after submission
  };

  return (
    <div className="flex gap-1">
      {[...Array(starValue)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hover || rating);
        return (
          <span
            key={starValue}
            onClick={() => handleRatingClick(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className={isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}
          >
            <IoIosStar
              className={`text-2xl ${isFilled ? "text-yellow-400" : "text-gray-400"}`}
            />
          </span>
        );
      })}
    </div>
  );
};

export default Star;