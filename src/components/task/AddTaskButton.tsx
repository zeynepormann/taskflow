import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddTaskButtonProps {
  label: string;
  onClick: () => void;
}

function AddTaskButton({ label, onClick }: AddTaskButtonProps) {
  return (
    <Button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="h-11"
    >
      <Plus size={20} aria-hidden="true" />
      <span>{label}</span>
    </Button>
  );
}

export default AddTaskButton;
