import { useUsersQuery } from "../hooks/useUsersQuery";
import Card from "../components/card/Card";
import PageLayout from "../components/page/PageLayout";
import PageBody from "../components/page/PageBody";
import UserTable from "../components/users/UserTable";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDeleteMutation } from "../hooks/useDeleteMutation";

function Users(){
    const [page, setPage] = useState(1 )
    const limit = 10;

    const {data: userResponse} = useUsersQuery(limit,page);

    const users = userResponse?.users ?? [];
    const total = userResponse?.total ?? 0;

    const totalPage = Math.ceil(total/10);  

    const navigate = useNavigate();

    const deleteUserMutation = useDeleteMutation();
    
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
                isDeleting
              />
              <div className="flex flex-row justify-end">
                <div className="flex items-center gap-2 mb-2 mx-6  border border-border bg-muted rounded-xl ">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage((previousPage) => previousPage - 1)}
                  >
                    <ChevronLeft className="cursor-pointer rounded-xl h-10 w-12 border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" />
                  </button>
                  <span className="text-foreground font-bold font-sans text-xl flex text-center">
                    {page}/{totalPage}
                  </span>
                  <button
                    type="button"
                    disabled={page >= totalPage}
                    onClick={() => setPage((previousPage) => previousPage + 1)}
                  >
                    <ChevronRight className="cursor-pointer rounded-xl h-10 w-12 border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </PageBody>
      </PageLayout>
    );}
export default Users