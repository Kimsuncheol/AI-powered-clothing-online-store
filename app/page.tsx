import { Container } from '@mui/material';
import { FeaturedProducts } from '@/src/components/home/FeaturedProducts';
import { TrendingCollections } from '@/src/components/home/TrendingCollections';
import { StartStylingCTA } from '@/src/components/home/StartStylingCTA';

export default function Home() {
  return (
    <main>
      <StartStylingCTA />
      <Container maxWidth="lg">
        <FeaturedProducts />
        <TrendingCollections />
      </Container>
    </main>
  );
}
