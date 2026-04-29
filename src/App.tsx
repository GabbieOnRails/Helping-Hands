import { motion, AnimatePresence } from "motion/react";
import { 
  Truck, 
  Package, 
  Clock, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  CheckCircle2,
  Calendar,
  ChevronRight,
  ChevronDown,
  Quote,
  ShieldCheck,
  Star,
  Award
} from "lucide-react";
import { useState, FormEvent, ChangeEvent } from "react";
import ChatBot from "./components/ChatBot";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

const zoomIn = {
  initial: { opacity: 0, y: 30, scale: 0.9 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  },
  viewport: { once: true, margin: "-100px" }
};

const buttonHover = {
  scale: 1.05,
  boxShadow: "0px 0px 30px rgba(245, 166, 35, 0.4)",
  transition: { duration: 0.2 }
};

interface FormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  crew: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  date?: string;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    date: "",
    crew: "2-Man Crew",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Valid 10-digit phone number is required";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email address is required";
    }
    
    if (!formData.date) newErrors.date = "Move date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          date: "",
          crew: "2-Man Crew",
          message: ""
        });
        setTimeout(() => setSubmitSuccess(false), 5000);
      }, 1500);
    }
  };

  const faqs = [
    {
      q: "Do you charge extra for stairs or heavy items?",
      a: "No, our flat hourly rates apply to all labor tasks. We don't hide fees behind furniture size, weight, or stair counts. What you see is what you pay."
    },
    {
      q: "Are Helping Hands on Demand licensed and insured?",
      a: "Yes! We are a fully registered and insured professional moving company. We take the protection of your belongings and our crew seriously."
    },
    {
      q: "Do you provide the moving truck?",
      a: "We can! We offer a full-service experience with a $125 truck fee. However, if you already have your own truck or storage pod, we'll waive that fee entirely and provide just the expert muscle."
    },
    {
      q: "What areas do you serve specifically?",
      a: "We are based in Kansas City and serve the entire KC Metro area, including Overland Park, Olathe, Independence, and beyond. We also handle out-of-town moves across the Midwest region."
    },
    {
      q: "How fast can I book a move?",
      a: "We specialize in 'On Demand' service. While we recommend scheduling in advance, we can often accommodate same-day moves depending on current crew availability. Call us immediately for urgent needs!"
    }
  ];

  const testimonials = [
    {
      name: "Marcus T.",
      text: "The most professional crew I've ever hired. They were fast, careful with my piano, and very transparent about the costs. Best in Kansas City.",
      location: "Overland Park, KS"
    },
    {
      name: "Linda S.",
      text: "Moving is usually stressful, but Handing Hands made it easy. They arrived on time and had my entire 3-bedroom house packed in hours. Exceptional packing service!",
      location: "Kansas City, MO"
    },
    {
      name: "David K.",
      text: "KC's best moving secret. The 3-man crew worked like a well-oiled machine. Worth every penny of the hourly rate. No hidden fees or surprises.",
      location: "Olathe, KS"
    }
  ];

  return (
    <div className="min-h-screen smooth-scroll bg-navy text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-navy/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-display text-gold font-bold">HD</span>
              <span className="hidden sm:block text-xl font-display tracking-wider">Helping Hands On Demand</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="hover:text-gold transition-colors font-medium">Services</a>
              <a href="#pricing" className="hover:text-gold transition-colors font-medium">Pricing</a>
              <a href="#contact" className="hover:text-gold transition-colors font-medium text-gold border border-gold px-4 py-2 rounded-full hover:bg-gold hover:text-navy">Book Now</a>
            </div>

            {/* Mobile Nav Toggle */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div 
          initial={false}
          animate={isMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden bg-navy border-b border-white/10"
        >
          <div className="px-4 pt-2 pb-6 space-y-4">
            <a href="#services" className="block text-lg py-2" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#pricing" className="block text-lg py-2" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <a href="#contact" className="block text-lg py-2 text-gold" onClick={() => setIsMenuOpen(false)}>Book Now</a>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co/d8Gc39g/steptodown-com852277.jpg" 
            alt="Professional movers in action"
            className="w-full h-full object-cover opacity-70 grayscale-[10%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/60 to-navy"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold mb-4 leading-tight">
              Helping Hands <span className="text-gold">On Demand</span>
            </h1>
            <p className="text-xl md:text-3xl font-light tracking-[0.2em] mb-12 text-gray-300">
              FAST. RELIABLE. ON DEMAND.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="#contact" 
                whileHover={buttonHover}
                whileTap={{ scale: 0.95 }}
                className="bg-gold text-navy font-bold px-8 py-4 rounded-lg text-lg hover:bg-gold-hover transition-colors flex items-center justify-center gap-2"
              >
                Get a Quote <ChevronRight size={20} />
              </motion.a>
              <motion.a 
                href="tel:9132440242" 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all flex items-center justify-center gap-2"
              >
                <Phone size={20} /> 913-244-0242
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Moving Services</h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { 
                title: "Local & Out-of-Town", 
                desc: "Moving next door or across state lines? We handle it all with care.", 
                icon: <Truck size={40} className="text-gold" /> 
              },
              { 
                title: "Loading & Unloading", 
                desc: "Have your own truck? We'll provide the muscle and expertise.", 
                icon: <Users size={40} className="text-gold" /> 
              },
              { 
                title: "Full Packing Service", 
                desc: "Professional packing to ensure your valuables stay safe during transit.", 
                icon: <Package size={40} className="text-gold" /> 
              },
              { 
                title: "Scheduled or Same-Day", 
                desc: "Flexible booking options to fit your timeline—even in emergencies.", 
                icon: <Clock size={40} className="text-gold" /> 
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-navy border border-white/10 p-8 rounded-2xl hover:border-gold/50 transition-all hover:translate-y-[-8px] group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Transparent Pricing</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Straightforward hourly rates with no hidden surprises. All tools and equipment included.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {[
              { crew: "2-Man Crew", price: "125", popular: false },
              { crew: "3-Man Crew", price: "165", popular: true },
              { crew: "4-Man Crew", price: "185", popular: false },
            ].map((plan, index) => (
              <motion.div
                key={index}
                {...fadeIn}
                className={`relative p-8 rounded-3xl border ${plan.popular ? 'bg-gold/5 border-gold py-12 scale-105' : 'bg-white/[0.03] border-white/10'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-navy px-4 py-1 rounded-full font-bold text-sm tracking-widest uppercase">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-8 text-center">{plan.crew}</h3>
                <div className="text-center mb-8">
                  <span className="text-5xl font-bold text-gold">${plan.price}</span>
                  <span className="text-gray-400">/hr</span>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 font-light">
                    <CheckCircle2 size={20} className="text-gold shrink-0" />
                    <span>Dollies & Straps Included</span>
                  </li>
                  <li className="flex items-center gap-3 font-light">
                    <CheckCircle2 size={20} className="text-gold shrink-0" />
                    <span>Furniture Wrapping</span>
                  </li>
                  <li className="flex items-center gap-3 font-light">
                    <CheckCircle2 size={20} className="text-gold shrink-0" />
                    <span>Expert Loading Strategy</span>
                  </li>
                </ul>
                <motion.a 
                  href="#contact" 
                  whileHover={buttonHover}
                  whileTap={{ scale: 0.98 }}
                  className={`block w-full py-4 text-center rounded-xl font-bold transition-all ${plan.popular ? 'bg-gold text-navy hover:bg-gold-hover' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  Book This Crew
                </motion.a>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="mt-16 bg-white/[0.03] border border-dashed border-white/20 p-8 rounded-2xl text-center">
            <p className="text-lg text-gray-300 font-light italic">
              * $125 truck fee per move (serves as deposit). 
              <span className="text-gold italic font-medium ml-1">Waived if customer has own truck or storage pod.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                {...zoomIn}
                className="bg-navy border border-white/10 p-8 rounded-3xl relative"
              >
                <Quote className="text-gold/20 absolute top-8 right-8" size={60} />
                <p className="text-gray-300 text-lg leading-relaxed mb-8 relative z-10 italic">
                  "{t.text}"
                </p>
                <div>
                  <h4 className="font-bold text-xl text-gold">{t.name}</h4>
                  <p className="text-gray-500 text-sm">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Have Questions?</h2>
            <p className="text-xl text-gray-400">Everything you need to know about our moving process.</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                className="border border-white/10 rounded-2xl overflow-hidden"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left p-6 flex justify-between items-center bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                >
                  <span className="text-lg font-bold pr-4">{faq.q}</span>
                  <ChevronDown 
                    className={`text-gold transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} 
                    size={24} 
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 border-t border-white/5 text-gray-400 font-light leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
          >
            {[
              { icon: <CheckCircle2 size={32} />, text: "Licensed & Bonded" },
              { icon: <ShieldCheck size={32} />, text: "Fully Insured" },
              { icon: <Award size={32} />, text: "KC Metro Choice 2024" }
            ].map((badge, i) => (
              <motion.div 
                key={i} 
                variants={fadeIn}
                className="flex items-center gap-3 text-gold"
              >
                {badge.icon}
                <span className="font-display text-xl tracking-wider text-white">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Let's Get You <span className="text-gold">Moved</span></h2>
              <p className="text-xl text-gray-400 mb-12 font-light">Serving the Kansas City Metro & Beyond. Contact us today for a free estimate tailored to your needs.</p>
              
              <div className="space-y-8">
                <a href="tel:9132440242" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-all">
                    <Phone className="text-gold" size={28} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-1">Call Us</h4>
                    <p className="text-2xl font-bold group-hover:text-gold transition-colors">913-244-0242</p>
                  </div>
                </a>

                <a href="mailto:helpinghandsondemand@icloud.com" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-all">
                    <Mail className="text-gold" size={28} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-1">Email Us</h4>
                    <p className="text-2xl font-bold group-hover:text-gold transition-colors">helpinghandsondemand@icloud.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                    <MapPin className="text-gold" size={28} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-1">Our Region</h4>
                    <p className="text-2xl font-bold">Kansas City Metro & Beyond</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn}
              className="bg-navy border border-white/10 p-8 sm:p-12 rounded-3xl"
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-4 focus:border-gold outline-none transition-all ${errors.name ? 'border-red-500/50' : 'border-white/10'}`} 
                      placeholder="John Doe" 
                    />
                    {errors.name && <p className="text-red-400 text-xs ml-1">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Phone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-4 focus:border-gold outline-none transition-all ${errors.phone ? 'border-red-500/50' : 'border-white/10'}`} 
                      placeholder="913-000-0000" 
                    />
                    {errors.phone && <p className="text-red-400 text-xs ml-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-4 focus:border-gold outline-none transition-all ${errors.email ? 'border-red-500/50' : 'border-white/10'}`} 
                    placeholder="john@example.com" 
                  />
                  {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Move Date</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-4 focus:border-gold outline-none transition-all appearance-none ${errors.date ? 'border-red-500/50' : 'border-white/10'}`} 
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                    </div>
                    {errors.date && <p className="text-red-400 text-xs ml-1">{errors.date}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Crew Size</label>
                    <div className="relative">
                      <select 
                        name="crew"
                        value={formData.crew}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-gold outline-none transition-all appearance-none"
                      >
                        <option className="bg-navy" value="2-Man Crew">2-Man Crew</option>
                        <option className="bg-navy" value="3-Man Crew">3-Man Crew</option>
                        <option className="bg-navy" value="4-Man Crew">4-Man Crew</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-gold outline-none transition-all" 
                    placeholder="Tell us about your items, stairs, or special requests..."
                  ></textarea>
                </div>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-center font-medium"
                    >
                      Booking inquiry sent! We'll call you shortly.
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button 
                  type="submit" 
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? buttonHover : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className="w-full bg-gold text-navy font-bold py-5 rounded-xl text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full"
                      />
                      Processing...
                    </>
                  ) : "Book Your Move Now"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="text-2xl font-display text-gold font-bold">HD</span>
                <span className="text-lg font-display tracking-widest">Helping Hands On Demand</span>
              </div>
              <p className="text-gray-500 text-sm italic font-light italic">Fast. Reliable. On Demand.</p>
            </div>
            
            <div className="flex gap-8 text-gray-400 text-sm">
              <a href="tel:9132440242" className="hover:text-gold transition-colors">913-244-0242</a>
              <a href="mailto:helpinghandsondemand@icloud.com" className="hover:text-gold transition-colors">helpinghandsondemand@icloud.com</a>
            </div>

            <p className="text-gray-500 text-sm font-light">
              © {new Date().getFullYear()} Helping Hands On Demand. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
}

