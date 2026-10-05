import { z } from "zod";
import type { User } from "@/types/user";
import type { Todo, TodoWithDate } from "@/types/todo";

const DEMO_SCHEMA_VERSION = 1;
const keyFor = (userId: number) =>
  `taskflow:demo:v${DEMO_SCHEMA_VERSION}:user:${userId}`;

const storedTaskSchema = z.object({
  id: z.string().min(1),
  todo: z.string(),
  completed: z.boolean(),
  userId: z.number().int().positive(),
  dueDate: z.string().datetime(),
  projectId: z.number().int().positive(),
});

const stateSchema = z.object({
  version: z.literal(DEMO_SCHEMA_VERSION),
  remoteMeta: z.record(
    z.string(),
    z.object({
      dueDate: z.string().datetime(),
      projectId: z.number().int().positive(),
    }),
  ),
  localTasks: z.array(storedTaskSchema),
  remoteTaskOverrides: z.record(z.string(), storedTaskSchema.partial()),
  deletedRemoteTaskIds: z.array(z.number().int().positive()),
  userOverrides: z.record(
    z.string(),
    z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      username: z.string().optional(),
      email: z.string().optional(),
    }),
  ),
  deletedUserIds: z.array(z.number().int().positive()),
});

type StoredTask = z.infer<typeof storedTaskSchema>;
type DemoState = z.infer<typeof stateSchema>;

function emptyState(): DemoState {
  return {
    version: DEMO_SCHEMA_VERSION,
    remoteMeta: {},
    localTasks: [],
    remoteTaskOverrides: {},
    deletedRemoteTaskIds: [],
    userOverrides: {},
    deletedUserIds: [],
  };
}

function readState(userId: number): DemoState {
  try {
    const key = keyFor(userId);
    const raw = localStorage.getItem(key) ?? sessionStorage.getItem(key);
    if (!raw) return emptyState();
    const parsed = stateSchema.safeParse(JSON.parse(raw));
    if (parsed.success) {
      localStorage.setItem(key, JSON.stringify(parsed.data));
      sessionStorage.removeItem(key);
      return parsed.data;
    }
  } catch {
    // Corrupt demo state is discarded instead of reaching the UI.
  }

  localStorage.removeItem(keyFor(userId));
  sessionStorage.removeItem(keyFor(userId));
  return emptyState();
}

function writeState(userId: number, state: DemoState): void {
  localStorage.setItem(keyFor(userId), JSON.stringify(state));
}

function isoAtNoon(date: Date): string {
  const stable = new Date(date);
  stable.setHours(12, 0, 0, 0);
  return stable.toISOString();
}

function nextSeedDate(index: number): string {
  const base = new Date();
  base.setHours(12, 0, 0, 0);
  base.setDate(base.getDate() + index - 3);
  return isoAtNoon(base);
}

function seedRemoteMeta(state: DemoState, todos: Todo[]): DemoState {
  const projectIds = [1, 2, 3, 4];
  let cursor = Object.keys(state.remoteMeta).length;
  const remoteMeta = { ...state.remoteMeta };

  todos.forEach((todo, index) => {
    if (remoteMeta[String(todo.id)]) return;
    remoteMeta[String(todo.id)] = {
      dueDate: nextSeedDate(index),
      projectId: projectIds[cursor],
    };
    cursor = cursor === projectIds.length - 1 ? 0 : cursor + 1;
  });

  return { ...state, remoteMeta };
}

function toTask(
  stored: StoredTask,
  source: "remote" | "local",
  remoteId?: number,
): TodoWithDate {
  return {
    id: stored.id,
    remoteId,
    source,
    todo: stored.todo,
    completed: stored.completed,
    userId: stored.userId,
    dueDate: new Date(stored.dueDate),
    projectId: stored.projectId,
  };
}

export function mergeDemoTasks(
  actorId: number,
  remoteTodos: Todo[],
): TodoWithDate[] {
  let state = readState(actorId);
  const seeded = seedRemoteMeta(state, remoteTodos);
  if (seeded !== state) {
    state = seeded;
    writeState(actorId, state);
  }

  const deleted = new Set(state.deletedRemoteTaskIds);
  const remoteTasks = remoteTodos
    .filter((todo) => !deleted.has(todo.id))
    .map((todo) => {
      const meta = state.remoteMeta[String(todo.id)];
      const override = state.remoteTaskOverrides[String(todo.id)];
      return toTask(
        {
          id: String(todo.id),
          todo: override?.todo ?? todo.todo,
          completed: override?.completed ?? todo.completed,
          userId: override?.userId ?? todo.userId,
          dueDate: override?.dueDate ?? meta.dueDate,
          projectId: override?.projectId ?? meta.projectId,
        },
        "remote",
        todo.id,
      );
    });

  return [
    ...remoteTasks,
    ...state.localTasks.map((task) => toTask(task, "local")),
  ];
}

export function getLocalDemoTask(
  actorId: number,
  id: string,
): TodoWithDate | undefined {
  const task = readState(actorId).localTasks.find((item) => item.id === id);
  return task ? toTask(task, "local") : undefined;
}

export function createDemoTask(
  actorId: number,
  values: Pick<TodoWithDate, "todo" | "completed" | "dueDate" | "projectId">,
): TodoWithDate {
  const state = readState(actorId);
  const stored: StoredTask = {
    id: `local-${crypto.randomUUID()}`,
    todo: values.todo,
    completed: values.completed,
    userId: actorId,
    dueDate: isoAtNoon(values.dueDate),
    projectId: values.projectId,
  };
  writeState(actorId, { ...state, localTasks: [...state.localTasks, stored] });
  return toTask(stored, "local");
}

export function updateDemoTask(
  actorId: number,
  task: TodoWithDate,
  values: Pick<TodoWithDate, "todo" | "completed" | "dueDate" | "projectId">,
): TodoWithDate {
  const state = readState(actorId);
  const patch = {
    todo: values.todo,
    completed: values.completed,
    dueDate: isoAtNoon(values.dueDate),
    projectId: values.projectId,
  };

  if (task.source === "local") {
    const localTasks = state.localTasks.map((item) =>
      item.id === task.id ? { ...item, ...patch } : item,
    );
    writeState(actorId, { ...state, localTasks });
    return toTask(
      { ...state.localTasks.find((item) => item.id === task.id)!, ...patch },
      "local",
    );
  }

  writeState(actorId, {
    ...state,
    remoteTaskOverrides: {
      ...state.remoteTaskOverrides,
      [String(task.remoteId)]: patch,
    },
  });
  return { ...task, ...patch, dueDate: new Date(patch.dueDate) };
}

export function deleteDemoTask(actorId: number, task: TodoWithDate): void {
  const state = readState(actorId);
  if (task.source === "local") {
    writeState(actorId, {
      ...state,
      localTasks: state.localTasks.filter((item) => item.id !== task.id),
    });
    return;
  }
  writeState(actorId, {
    ...state,
    deletedRemoteTaskIds: [
      ...new Set([...state.deletedRemoteTaskIds, task.remoteId!]),
    ],
  });
}

export function mergeDemoUsers(actorId: number, users: User[]): User[] {
  const state = readState(actorId);
  const deleted = new Set(state.deletedUserIds);
  return users
    .filter((user) => !deleted.has(user.id))
    .map((user) => ({ ...user, ...state.userOverrides[String(user.id)] }));
}

export function updateDemoUser(
  actorId: number,
  user: User,
  values: Pick<User, "firstName" | "lastName" | "username" | "email">,
): User {
  const state = readState(actorId);
  writeState(actorId, {
    ...state,
    userOverrides: { ...state.userOverrides, [String(user.id)]: values },
  });
  return { ...user, ...values };
}

export function deleteDemoUser(actorId: number, userId: number): void {
  const state = readState(actorId);
  writeState(actorId, {
    ...state,
    deletedUserIds: [...new Set([...state.deletedUserIds, userId])],
  });
}
