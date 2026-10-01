import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { Calendar } from "./calendar";

it("moves focus to the next day with the ArrowRight key", async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Calendar mode="single" defaultMonth={new Date(2026, 0, 1)} />,
  );
  const dayButtons = Array.from(
    container.querySelectorAll<HTMLButtonElement>("button[data-day]"),
  );
  const currentDay = dayButtons[10];
  const nextDay = dayButtons[11];

  currentDay.focus();
  await user.keyboard("{ArrowRight}");

  expect(document.activeElement).toBe(nextDay);
});
