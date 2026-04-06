import HeroSection from '@components/home/HeroSection';
import StatsBar from '@components/home/StatsBar';
import ReviewsSection from '@components/home/ReviewsSection';
import ProtocolSection from '@components/home/ProtocolSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ReviewsSection />
      <ProtocolSection />
    </>
  );
}
