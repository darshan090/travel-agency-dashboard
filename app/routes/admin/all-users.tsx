import { Header } from "components"
import { ColumnDirective, ColumnsDirective, GridComponent } from "@syncfusion/ej2-react-grids"
import { users } from "~/constants"
import { cn } from "~/lib/utils"

const allUsers = () => {

  return (
    <main className="all-users wrapper">
      <Header 
        title="Manage Users"
        description = 'Filter, sort and access detailed user profiles'
      />
      <GridComponent dataSource={users} gridLines="None">
          <ColumnsDirective>
            <ColumnDirective 
              field="name"
              headerText="Name"
              width="200"
              textAlign="Left"
              template={(props:UserData)=>(
                <div className="flex items-center gap-1.5 px-4">
                    <img src={props.imageUrl} alt="user" className="rounded-full size-8 aspect-square" />
                    <span>{props.name}</span>
                </div>
              )}
            />
            <ColumnDirective 
            field="email"
            headerText="Email"
            width="150"
            textAlign="Left"
            />
            <ColumnDirective 
            field="dateJoined"
            headerText="Date Joined"
            width="120"
            textAlign="Left"
            />
            <ColumnDirective 
            field="itineraryCreated"
            headerText="Trips created"
            width="130"
            textAlign="Left"
            />
            <ColumnDirective 
            field="status"
            headerText="Status"
            width="100"
            textAlign="Left"
            template={(props:UserData)=>(
              <article className={cn()}>
                <div>
                  <h3>
                    {props.status}
                  </h3>
                </div>
              </article>
            )}
            />
          </ColumnsDirective>
          
      </GridComponent>
    </main>
  )
}

export default allUsers