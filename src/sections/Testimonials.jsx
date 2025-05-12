import Section from "../components/Section";
import { smallSphere, stars, lines } from "../assets"; // Removed 'check' as it's not used for testimonials
import Heading from "../components/Heading";

const testimonials = [
    {
        name: "Keith",
        country: "🇨🇦",
        rating: "★★★★★ (5/5)",
        quote: "Happy to highly recommend! Got exactly what I was asking for and more. Extremely clear communications and I'm just very happy with this altogether. I will use again for sure!",
    },
    {
        name: "Rui C. Santos",
        country: "🇵🇹",
        rating: "★★★★★ (5/5)",
        quote: "Recomendo fortemente para qualquer projeto que exija habilidades técnicas e forte colaboração.",
    },
    {
        name: "Christophers",
        country: "🇺🇸",
        rating: "★★★★★ (5/5)",
        quote: "We gave them an tough challenge and they went above and beyond to make the project work. We had to pull data from multiple websites to put them into a spreadsheet with 1000 of rows and it worked flawlessly! Will definitely hire for future projects. If you need any web scraping, these are your guys!",
    },
    {
        name: "Omar",
        country: "🇲🇦",
        rating: "★★★★★ (5/5)",
        quote: "Eben AI delivered high-quality work fast, and exceeded my expectations. Excellent communication and professionalism throughout. Highly recommended—thank you!",
    },
    {
        name: "Ayoub Bofouchk",
        country: "🇲🇦",
        rating: "★★★★★ (5/5)",
        quote: "Best quality of service and communication! Very professional and supportive, thanks for your time and efforts",
    },
    {
        name: "Rodrigo Damas",
        country: "🇵🇹",
        rating: "★★★★ (4.7/5)",
        quote: "Excelente serviço! Sempre super rápido a responder e pronto a ajudar. Recomendo e muito!",
    },
    {
        name: "Dinis Assis",
        country: "🇵🇹",
        rating: "★★★★★ (5/5)",
        quote: "Muito bom, rápido e sempre disponível.",
    },
    {
        name: "Jim Haddad",
        country: "🇩🇪",
        rating: "★★★★★ (5/5)",
        quote: "Exceptional work. Took less time than expected to create a video production automation.",
    },
];

const Testimonials = () => { // Component name can be changed later if needed, e.g., Testimonials
    return (
        <Section className="overflow-hidden"> {/* Removed id="pricing" */}
            <div className="container relative z-2">
                <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
                    <img src={smallSphere} className="relative z-1" width={255} height={255} alt="Decorative Sphere" />
                    <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <img src={stars} className="w-full" width={950} height={400} alt="Decorative Stars" />
                    </div>
                </div>

                <Heading tag="Testemunhos" title="O que os nossos clientes dizem sobre a Eben AI Solutions" />

                <div className="relative">
                    {/* Using a grid for testimonials for better responsiveness */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {testimonials.slice(0, 4).map((item, i) => ( // Displaying first 4 for now, can be adjusted
                            <div key={i} className="flex flex-col p-6 bg-n-8 border border-n-6 rounded-[2rem] min-h-[18rem] justify-between"> {/* Adjusted min-h and padding */}
                                <div>
                                    <h4 className="h5 mb-2">{item.name} {item.country}</h4>
                                    <p className="body-2 mb-4 text-color-3">{item.rating}</p>
                                    <p className="body-2 text-white/70">"{item.quote}"</p>
                                </div>
                                {/* Removed Button and features list */}
                            </div>
                        ))}
                    </div>
                     {/* Second row of testimonials if needed, or implement a carousel/slider later */}
                    {testimonials.length > 4 && (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                            {testimonials.slice(4, 8).map((item, i) => (
                                <div key={i + 4} className="flex flex-col p-6 bg-n-8 border border-n-6 rounded-[2rem] min-h-[18rem] justify-between">
                                    <div>
                                        <h4 className="h5 mb-2">{item.name} {item.country}</h4>
                                        <p className="body-2 mb-4 text-color-3">{item.rating}</p>
                                        <p className="body-2 text-white/70">"{item.quote}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}


                    <div className="hidden lg:block absolute top-1/2 right-full w-[92.5rem] h-[11.0625rem] -translate-y-1/2 pointer-events-none">
                        <img className="w-full" src={lines} width={1480} height={177} alt="" />
                    </div>
                    <div className="hidden lg:block absolute top-1/2 left-full w-[92.5rem] h-[11.0625rem] -translate-y-1/2 -scale-x-100 pointer-events-none">
                        <img className="w-full" src={lines} width={1480} height={177} alt="" />
                    </div>
                </div>
                {/* Removed "See the full details" link */}
            </div>
        </Section>
    );
};

export default Testimonials;
