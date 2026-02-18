import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ChangelogSection from '@/components/sections/ChangelogSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
    return (
        <>
            <Navigation />
            <main className="hero-gradient">
                <HeroSection />
                <FeaturesSection />
                <ChangelogSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
