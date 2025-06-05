import { Header, StatsCard, TripCard } from "components";
import { getUser } from "~/appwrite/auth";
import { dashboardStats, allTrips } from "~/constants";
import type { Route } from "./+types/dashboard";

const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } = dashboardStats;

type User = {
  name: string;
  email: string;
  imageUrl: string;
  joinedAt: string;
  status: string;
};

export const loader = async () => {
  try {
    const user = await getUser();
    console.log('Dashboard loader user:', user); // Debug log
    return user;
  } catch (error) {
    console.error('Dashboard loader error:', error);
    return null;
  }
};

const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData as User | null;
  console.log('Dashboard component user:', user); // Debug log

  return (
    <main className="dashboard wrapper">
      <Header 
        title={`Welcome ${user?.name ?? 'Guest'}👋`}
        description="Track activity, trends and popular destinations in real time"
      />
      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard 
            headerTitle="Total Users"
            total={totalUsers}
            currentMonthCount={usersJoined.currentMonth}
            lastMonthCount={usersJoined.LastMonth}
          />
          <StatsCard 
            headerTitle="Total Trips"
            total={totalTrips}
            currentMonthCount={tripsCreated.currentMonth}
            lastMonthCount={tripsCreated.LastMonth}
          />
          <StatsCard 
            headerTitle="Active Users"
            total={userRole.total}
            currentMonthCount={userRole.currentMonth}
            lastMonthCount={userRole.LastMonth}
          />
        </div>
      </section>
      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>
        <div className="trip-grid">
          {allTrips.slice(0, 4).map(({ id, name, imageUrls, itinerary, tags, estimatedPrice }) => (
            <TripCard 
              key={id}
              id={id.toString()}
              name={name}
              imageUrl={imageUrls[0]}
              location={itinerary?.[0]?.location ?? ''}
              tags={tags}
              price={estimatedPrice}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;