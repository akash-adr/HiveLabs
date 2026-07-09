import Hero from "@/components/home/Hero"
import OurStory from "@/components/home/OurStory"
import ServicesOverview from "@/components/home/ServicesOverview"
import HowItWorks from "@/components/home/HowItWorks"
import WhyChooseUs from "@/components/home/WhyChooseUs"
import Testimonials from "@/components/home/Testimonials"
import AnimatedWebsites from "@/components/home/AnimatedWebsites"
import DesignMarquee from "@/components/home/DesignMarquee"
import OurWorkPreview from "@/components/home/OurWorkPreview"
import ContactSection from "@/components/home/ContactSection"

export default function Home() {
  return (
    <>
      <Hero />
      <AnimatedWebsites />
      <DesignMarquee />
      <OurWorkPreview />
      <OurStory />
      <ServicesOverview />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <ContactSection />
    </>
  )
}
