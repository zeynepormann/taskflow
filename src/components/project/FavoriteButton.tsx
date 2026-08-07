import { Star } from "lucide-react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

function FavoriteButton({ isFavorite, onClick }: FavoriteButtonProps) {
  return (
    <button
      type="button"
      aria-label="Favorites"
      aria-pressed={isFavorite}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Star
        aria-hidden="true"
        className={
          isFavorite ? "fill-yellow-300 dark:fill-yellow-500" : "fill-amber-50"
        }
      />
    </button>
  );
}

export default FavoriteButton;
