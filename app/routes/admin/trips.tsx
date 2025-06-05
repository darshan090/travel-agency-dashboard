import Header from 'components/Header'

const trips = () => {
  return (
    <main className="all-users wrapper">
      <Header 
        title="Trips"
        description = 'View and edit AI generated travel-plans'
        ctaText="Create a trip"
        ctaUrl="/trip/create"
      />
    </main>
  )
}

export default trips