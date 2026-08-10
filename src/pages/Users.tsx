import { useUsersQuery } from "../hooks/useUsersQuery";
import Card from "../components/card/Card";
import PageLayout from "../components/page/PageLayout";
import PageBody from "../components/page/PageBody";
import UserTable from "../components/users/UserTable";
import { useTranslation } from "react-i18next";

function Users(){
    const {data: user = []} = useUsersQuery();
    const { t } = useTranslation("users");
    const columnNames = [t("id"), t("firstname"), t("lastname"), t("username"), t("email")];
    
    return (
      <PageLayout>
        <PageBody>
          <Card>
            <div className="mx-auto w-full max-w-8xl">
              <UserTable
                    users = {user}
                    columnNames={columnNames}
              />
            </div>
          </Card>
        </PageBody>
      </PageLayout>
    );
}
export default Users