import { useUsersQuery } from "../hooks/useUsersQuery";
import { Card } from "@/components/ui/card";
import PageLayout from "../components/page/PageLayout";
import PageBody from "../components/page/PageBody";
import UserTable from "../components/users/UserTable";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDeleteUserRequest } from "../hooks/useDeleteUserMutation";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";

function Users(){
    const [page, setPage] = useState(1 )
    const limit = 10;

    const {data: userResponse} = useUsersQuery(limit,page);

    const users = userResponse?.users ?? [];
    const total = userResponse?.total ?? 0;

    const totalPage = Math.ceil(total/limit);

    const navigate = useNavigate();

    const deleteUserMutation = useDeleteUserRequest();
    
    const { t } = useTranslation("users");
    const columnNames = [t("id"), t("firstname"), t("lastname"), t("username"), t("email"), t("action")];
    
    return (
      <PageLayout>
        <PageBody>
          <Card>
            <div className="mx-auto w-full max-w-8xl">
              <UserTable 
                users={users} 
                columnNames={columnNames} 
                onEdit={(userId) => navigate(`/users/${userId}/edit`)} 
                onDelete={(userId) => deleteUserMutation.mutate(userId)}
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
                  </Button></PaginationItem>
                  <PaginationItem className="min-w-12 text-center text-sm font-semibold">
                    {page}/{totalPage}
                  </PaginationItem>
                  <PaginationItem><Button
                    type="button"
                    aria-label={t("common:nextPage")}
                    disabled={page >= totalPage}
                    onClick={() => setPage((previousPage) => previousPage + 1)}
                    variant="outline"
                    size="icon"
                  >
                    <ChevronRight />
                  </Button></PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </Card>
        </PageBody>
      </PageLayout>
    );}
export default Users
