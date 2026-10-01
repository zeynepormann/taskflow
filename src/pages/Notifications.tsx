import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import PageHeader from "../components/page/PageHeader";
import PageLayout from "../components/page/PageLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const initialNotifications = [
  {
    id: 1,
    title: "notificationDue",
    detail: "notificationReview",
    time: "twentyMinutesAgo",
    read: false,
  },
  {
    id: 2,
    title: "notificationProgress",
    detail: "notificationProgressDetail",
    time: "twoHoursAgo",
    read: false,
  },
  {
    id: 3,
    title: "notificationActivity",
    detail: "notificationActivityDetail",
    time: "yesterday",
    read: true,
  },
];
function Notifications() {
  const { t } = useTranslation("common");
  const [items, setItems] = useState(initialNotifications);
  const [showUnread, setShowUnread] = useState(false);
  const visible = showUnread ? items.filter((item) => !item.read) : items;
  return (
    <PageLayout>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <PageHeader
          title={t("common:notifications")}
          description={t("common:notificationsDescription")}
        />
        <Button
          onClick={() =>
            setItems(items.map((item) => ({ ...item, read: true })))
          }
          variant="outline"
        >
          <CheckCheck className="size-4" /> {t("common:markAllRead")}
        </Button>
      </div>
      <label className="flex w-fit cursor-pointer items-center gap-2 text-sm">
        <Checkbox
          checked={showUnread}
          onChange={(event) => setShowUnread(event.target.checked)}
        />{" "}
        {t("common:unreadOnly")}
      </label>
      <section className="rounded-xl border border-border bg-card shadow-sm">
        {visible.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted-foreground">
            {t("common:noNotifications")}
          </p>
        ) : (
          visible.map((item) => (
            <Button
              key={item.id}
              onClick={() =>
                setItems(
                  items.map((current) =>
                    current.id === item.id
                      ? { ...current, read: true }
                      : current,
                  ),
                )
              }
              variant="ghost"
              className={`h-auto w-full justify-start rounded-none border-b border-border p-5 text-left last:border-0 ${item.read ? "opacity-70" : "bg-primary/[0.03]"}`}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Bell className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">
                  {t(item.title)}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {t(item.detail)} · {t(item.time)}
                </span>
              </span>
              {!item.read && (
                <span className="ml-auto size-2 shrink-0 rounded-full bg-primary" />
              )}
            </Button>
          ))
        )}
      </section>
    </PageLayout>
  );
}
export default Notifications;
