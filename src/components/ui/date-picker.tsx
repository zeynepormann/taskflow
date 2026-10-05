import { CalendarIcon } from "lucide-react";
import { format, isValid, parseISO } from "date-fns";
import { enUS, tr } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  id?: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder: string;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

function DatePicker({ id, value, onChange, onBlur, placeholder, disabled, className, ...ariaProps }: DatePickerProps) {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage === "tr" ? tr : enUS;
  const parsedDate = value ? parseISO(`${value}T12:00:00`) : undefined;
  const selectedDate = parsedDate && isValid(parsedDate) ? parsedDate : undefined;

  return (
    <Popover>
      <PopoverTrigger
        id={id}
        onBlur={onBlur}
        disabled={disabled}
        {...ariaProps}
        render={
          <Button
            type="button"
            variant="outline"
            className={cn("h-12 w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground", className)}
          />
        }
      >
        <CalendarIcon className="size-4" />
        {selectedDate ? format(selectedDate, "PPP", { locale }) : placeholder}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (date) onChange(format(date, "yyyy-MM-dd"));
          }}
          locale={locale}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
