import Hero from "@/components/home/Hero"
import OurStory from "@/components/home/OurStory"
import ServicesOverview from "@/components/home/ServicesOverview"
import HowItWorks from "@/components/home/HowItWorks"
import WhyChooseUs from "@/components/home/WhyChooseUs"
import Testimonials from "@/components/home/Testimonials"
import OurWorkPreview from "@/components/home/OurWorkPreview"
import ContactSection from "@/components/home/ContactSection"

export default function Home() {
  return (
    <>
      <Hero />
      <OurStory />
      <ServicesOverview />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <OurWorkPreview />
      <ContactSection />
    </>
  )
}
