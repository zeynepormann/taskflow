import { useUsersQuery } from "../hooks/useUsersQuery";
import { Card } from "@/components/ui/card";
import PageLayout from "../components/page/PageLayout";
import PageBody from "../components/page/PageBody";
import UserTable from "../components/users/UserTable";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDeleteUserRequest } from "../hooks/useDeleteUserMutation";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

function Users(){
    const [page, setPage] = useState(1 )
    const limit = 10;

    const { data: userResponse, isPending, isError, refetch } = useUsersQuery(limit, page);

    const users = userResponse?.users ?? [];
    const total = userResponse?.total ?? 0;

    const totalPage = Math.max(1, Math.ceil(total / limit));

    useEffect(() => {
      setPage((currentPage) => Math.min(currentPage, totalPage));
    }, [totalPage]);

    const navigate = useNavigate();

    const deleteUserMutation = useDeleteUserRequest();
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
    
    const { t } = useTranslation("users");
    const columnNames = [t("id"), t("firstname"), t("lastname"), t("username"), t("email"), t("action")];
    
    return (
      <PageLayout>
        <PageBody>
          <Card>
            <div className="mx-auto w-full max-w-8xl">
              {isPending ? (
                <p className="p-8 text-sm text-muted-foreground" aria-live="polite">
                  {t("common:loading")}
                </p>
              ) : isError ? (
                <div className="flex flex-col items-center gap-3 p-8 text-center" role="alert">
                  <p className="text-sm text-muted-foreground">{t("common:loadError")}</p>
                  <Button type="button" variant="outline" onClick={() => void refetch()}>
                    {t("common:retry")}
                  </Button>
                </div>
              ) : (
                <>
                  <UserTable
                    users={users}
                    columnNames={columnNames}
                    onEdit={(userId) => navigate(`/users/${userId}/edit`)}
                    onDelete={setUserIdToDelete}
                    isDeleting={deleteUserMutation.isPending}
                  />
                  <Pagination className="mb-4 justify-end px-6">
                    <PaginationContent className="rounded-md border border-border bg-muted p-1">
                      <PaginationItem>
                        <Button
                          type="button"
                          aria-label={t("common:previousPage")}
                          disabled={page === 1}
                          onClick={() => setPage((previousPage) => previousPage - 1)}
                          variant="outline"
                          size="icon"
                        >
                          <ChevronLeft />
                        </Button>
                      </PaginationItem>
                      <PaginationItem className="min-w-12 text-center text-sm font-semibold" aria-live="polite">
                        {page}/{totalPage}
                      </PaginationItem>
                      <PaginationItem>
                        <Button
                          type="button"
                          aria-label={t("common:nextPage")}
                          disabled={page >= totalPage}
                          onClick={() => setPage((previousPage) => previousPage + 1)}
                          variant="outline"
                          size="icon"
                        >
                          <ChevronRight />
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </>
              )}
            </div>
          </Card>
        </PageBody>
        <ConfirmDialog
          open={userIdToDelete !== null}
          title={t("common:deleteUser")}
          description={t("common:confirmDeleteUser")}
          cancelLabel={t("common:cancel")}
          confirmLabel={t("common:deleteUser")}
          pending={deleteUserMutation.isPending}
          onCancel={() => setUserIdToDelete(null)}
          onConfirm={() => {
            if (userIdToDelete === null) return;
            deleteUserMutation.mutate(userIdToDelete, { onSuccess: () => setUserIdToDelete(null) });
          }}
        />
      </PageLayout>
    );}
export default Users
