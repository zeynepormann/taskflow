import type { Project } from "../types/projects";

export const mockProjects: Project[] = [
  //dizi olusturur
  {
    id: 1,
    name: "TaskFlow",
    description: "Ekiplerin projelerini ve görevlerini yönetebildiği uygulama",
    progress: 65,
    memberCount: 4,
    taskCount: 18,
    updatedAt: "2026-07-30",
    status: "active",
    isFavorite: true,
  },

  {
    id: 2,
    name: "E-Ticaret Yönetimi",
    description: "Ürün ve sipariş süreçlerini yöneten web uygulaması",
    progress: 30,
    memberCount: 3,
    taskCount: 12,
    updatedAt: "2026-07-28",
    status: "planning",
    isFavorite: false,
  },

  {
    id: 3,
    name: "Mobil Bankacılık",
    description: "Finans işlemlerini yöneten mobil uygulama",
    progress: 100,
    memberCount: 5,
    taskCount: 10,
    updatedAt: "2026-07-29",
    status: "completed",
    isFavorite: true,
  },

  {
    id: 4,
    name: "Sohbet Uygulaması (Chat-App)",
    description: "Gerçek zamanlı (real-time) mesajlaşma uygulaması",
    progress: 75,
    memberCount: 2,
    taskCount: 8,
    updatedAt: "2026-07-31",
    status: "active",
    isFavorite: false,
  },
];
