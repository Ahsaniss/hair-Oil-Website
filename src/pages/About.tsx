
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-brand-green-light py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-green-dark mb-4">Our Story</h1>
            <p className="text-lg text-foreground/80 max-w-xl">
              Learn about our journey to create premium, natural hair oils using ancient Ayurvedic wisdom.
            </p>
          </div>
        </div>

        {/* Founder story */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="/placeholder.svg" 
                  alt="Founder" 
                  className="rounded-lg shadow-md w-full aspect-square md:aspect-auto object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-medium mb-6">Meet Our Founder</h2>
                <p className="text-foreground/80 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel lorem at nisi faucibus venenatis. 
                  Cras hendrerit mi in arcu ultricies, non faucibus massa ultricies. Nulla facilisi. 
                  Vivamus non ex a orci ultricies faucibus.
                </p>
                <p className="text-foreground/80 mb-6">
                  Maecenas gravida tortor eget felis laoreet, at porta ex lacinia. Suspendisse potenti. 
                  Sed mollis, justo vel euismod ullamcorper, sem metus semper nisl, at vestibulum urna mi a enim. 
                  Etiam venenatis odio metus, in porttitor libero auctor eu.
                </p>
                <p className="italic font-medium">
                  "My grandmother's recipes inspired me to create Bloom – haircare that combines ancient wisdom with modern science."
                </p>
                <p className="mt-3 font-medium">- Maya Sharma, Founder</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-brand-cream">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-serif font-medium mb-6">Our Mission & Vision</h2>
              <p className="text-foreground/80">
                At Bloom, we're dedicated to reviving ancient haircare traditions and bringing them to the modern world.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-4">Our Mission</h3>
                <p className="text-foreground/80">
                  To create extraordinary hair oils using time-honored Ayurvedic formulas, ethically sourced ingredients, 
                  and sustainable practices, empowering people to nurture their hair naturally.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-4">Our Vision</h3>
                <p className="text-foreground/80">
                  To become the world's most trusted natural hair care brand, known for our authenticity, 
                  effectiveness, and commitment to both people and planet, reviving ancient wisdom for modern wellbeing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-serif font-medium mb-6">Sustainability & Ethical Sourcing</h2>
                <p className="text-foreground/80 mb-6">
                  Our commitment to sustainability goes beyond just words. We carefully select each ingredient, 
                  ensuring it's ethically sourced and supports local farming communities.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-brand-green-light text-brand-green rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span>100% recyclable packaging made from post-consumer materials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-brand-green-light text-brand-green rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span>Fair trade partnerships with local farmers in India</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-brand-green-light text-brand-green rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span>1% of profits donated to environmental conservation projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-brand-green-light text-brand-green rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span>Carbon-neutral shipping methods</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src="/placeholder.svg" 
                  alt="Sustainability" 
                  className="rounded-lg shadow-md w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
