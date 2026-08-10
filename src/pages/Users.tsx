import { useUsersQuery } from "../hooks/useUsersQuery";
import Card from "../components/card/Card";
import PageLayout from "../components/page/PageLayout";
import PageBody from "../components/page/PageBody";
import UserTable from "../components/users/UserTable";

function Users(){
    const {data: user = []} = useUsersQuery();
    const columnNames = ["ID", "Ad", "Soyad", "Kullanıcı Adı", "Email"];
    
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