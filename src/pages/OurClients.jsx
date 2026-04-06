import ClientsHero from '@components/clients/ClientsHero';
import ActiveClients from '@components/clients/ActiveClients';
import ReadyToSecure from '@components/clients/ReadyToSecure';

export default function OurClients() {
  return (
    <>
      <ClientsHero />
      <ActiveClients />
      <ReadyToSecure />
    </>
  );
}
