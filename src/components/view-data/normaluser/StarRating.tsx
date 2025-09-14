import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  workingHours: number;
  size?: number;
  showText?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  workingHours,
  size = 16,
  showText = false,
}) => {
  const getStarRating = (hours: number): number => {
    if (hours >= 16) return 5;
    if (hours >= 14) return 4.5;
    if (hours >= 10) return 4;
    if (hours >= 6) return 3.5;
    if (hours >= 4) return 3;
    return 2.5;
  };

  const getStarColor = (rating: number): string => {
    if (rating >= 4.5) return "text-yellow-400";
    if (rating >= 4) return "text-yellow-500";
    if (rating >= 3.5) return "text-orange-400";
    if (rating >= 3) return "text-orange-500";
    return "text-gray-400";
  };

  const rating = getStarRating(workingHours);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);
  const colorClass = getStarColor(rating);

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center">
        {/* Full Stars */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <Star
            key={`full-${index}`}
            size={size}
            className={`${colorClass} fill-current`}
          />
        ))}

        {/* Half Star */}
        {hasHalfStar && (
          <div className="relative">
            <Star size={size} className="text-gray-300 fill-current" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star size={size} className={`${colorClass} fill-current`} />
            </div>
          </div>
        )}

        {/* Empty Stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <Star
            key={`empty-${index}`}
            size={size}
            className="text-gray-300 fill-current"
          />
        ))}
      </div>

      {showText && (
        <span className="text-sm font-medium text-gray-600 ml-2">
          {rating}/5 ({workingHours}h)
        </span>
      )}
    </div>
  );
};

export default StarRating;
