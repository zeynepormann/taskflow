import { Plus } from "lucide-react";

interface AddTaskButtonProps {
  label: string;
  onClick: () => void;
}

function AddTaskButton({ label, onClick }: AddTaskButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="
        flex h-11 cursor-pointer items-center
        gap-2 rounded-xl bg-primary px-4
        font-sans text-primary-foreground
        transition-colors duration-300
        hover:bg-primary-hover
      "
    >
      <Plus size={20} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

export default AddTaskButton;
