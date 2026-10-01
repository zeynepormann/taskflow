import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

function FavoriteButton({ isFavorite, onClick }: FavoriteButtonProps) {
  const { t } = useTranslation("common");
  return (
    <Button
      type="button"
      aria-label={t(isFavorite ? "removeFavorite" : "addFavorite")}
      aria-pressed={isFavorite}
      onClick={onClick}
      variant="ghost"
      size="icon"
    >
      <Star
        aria-hidden="true"
        className={
          isFavorite ? "fill-yellow-300 dark:fill-yellow-500" : "fill-amber-50"
        }
      />
    </Button>
  );
}

export default FavoriteButton;
