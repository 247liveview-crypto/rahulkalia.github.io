import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const StarRatingInput = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              className="sr-only"
            />
            <Star
              className={cn(
                "w-8 h-8 cursor-pointer transition-colors duration-200",
                ratingValue <= (hover || rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300 dark:text-gray-500"
              )}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRatingInput;
