import { beforeEach, expect, it } from "vitest";
import { createDemoTask, deleteDemoTask, mergeDemoTasks, updateDemoTask } from "./store";
import type { Todo } from "@/types/todo";

const remoteTask: Todo = { id: 1, todo: "Remote task", completed: false, userId: 1 };

beforeEach(() => localStorage.clear());

it("keeps local task changes after merging remote data again", () => {
  const initial = mergeDemoTasks(1, [remoteTask]);
  const updated = updateDemoTask(1, initial[0], {
    todo: "Updated locally",
    completed: true,
    dueDate: new Date("2026-10-10T12:00:00"),
    projectId: 2,
  });

  expect(mergeDemoTasks(1, [remoteTask])[0]).toMatchObject({
    id: updated.id,
    todo: "Updated locally",
    completed: true,
    projectId: 2,
  });
});

it("keeps deletions and local records scoped to the active demo user", () => {
  const firstUserTasks = mergeDemoTasks(1, [remoteTask]);
  deleteDemoTask(1, firstUserTasks[0]);
  const localTask = createDemoTask(1, {
    todo: "Local only",
    completed: false,
    dueDate: new Date("2026-10-10T12:00:00"),
    projectId: 1,
  });

  expect(mergeDemoTasks(1, [remoteTask])).toMatchObject([{ id: localTask.id }]);
  expect(mergeDemoTasks(2, [remoteTask])).toMatchObject([{ id: "1", todo: "Remote task" }]);
});
