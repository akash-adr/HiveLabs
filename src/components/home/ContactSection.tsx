"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle2, MapPin, Mail } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    details: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  // Very basic faux validation state for the demo
  const [activeField, setActiveField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      
      if (res.ok) {
        setIsSuccess(true)
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error(error)
      alert("Failed to send message.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = (fieldName: string) => `
    w-full bg-white/50 border backdrop-blur-sm rounded-xl px-4 py-3 text-brand-dark 
    focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 transition-all duration-300
    ${activeField === fieldName ? 'border-brand-yellow' : 'border-black/10'}
  `

  return (
    <section id="contact" className="bg-brand-gray-light py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-yellow/5 blur-[100px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-brand-yellow font-bold mb-4 block">Get In Touch</span>
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-brand-dark mb-6">Let's Start the Conversation.</h1>
          <p className="text-xl text-brand-gray-muted max-w-2xl mx-auto">
            Ready to elevate your brand? Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 bg-white/70 backdrop-blur-xl border border-black/5 p-8 md:p-10 rounded-3xl shadow-xl"
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-brand-dark">Full Name *</label>
                      <input 
                        required
                        type="text" 
                        className={inputClasses('name')}
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        onFocus={() => setActiveField('name')}
                        onBlur={() => setActiveField(null)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-brand-dark">Email Address *</label>
                      <input 
                        required
                        type="email" 
                        className={inputClasses('email')}
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        onFocus={() => setActiveField('email')}
                        onBlur={() => setActiveField(null)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-brand-dark">Phone Number</label>
                      <input 
                        type="tel" 
                        className={inputClasses('phone')}
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        onFocus={() => setActiveField('phone')}
                        onBlur={() => setActiveField(null)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-brand-dark">Company (Optional)</label>
                      <input 
                        type="text" 
                        className={inputClasses('company')}
                        placeholder="Your Company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        onFocus={() => setActiveField('company')}
                        onBlur={() => setActiveField(null)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-dark">Service Interested In *</label>
                    <select 
                      required
                      className={`${inputClasses('service')} appearance-none`}
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      onFocus={() => setActiveField('service')}
                      onBlur={() => setActiveField(null)}
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="Web Design & Development">Web Design & Development</option>
                      <option value="Branding & Identity">Branding & Identity</option>
                      <option value="Social Growth">Social Growth</option>
                      <option value="Hive Complete">Hive Complete (All-in-one)</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-dark">Project Details *</label>
                    <textarea 
                      required
                      rows={4}
                      className={inputClasses('details')}
                      placeholder="Tell us a little bit about what you're looking to build..."
                      value={formData.details}
                      onChange={(e) => setFormData({...formData, details: e.target.value})}
                      onFocus={() => setActiveField('details')}
                      onBlur={() => setActiveField(null)}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-dark text-brand-yellow font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-6 h-6 border-2 border-brand-yellow border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        Send Inquiry
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, delay: 0.2 }}
                  >
                    <CheckCircle2 className="w-24 h-24 text-green-500" />
                  </motion.div>
                  <div>
                    <h3 className="text-3xl font-heading font-bold text-brand-dark mb-2">Message Sent!</h3>
                    <p className="text-brand-gray-muted text-lg">Thank you for reaching out. We'll be in touch with you shortly.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({name: "", email: "", phone: "", company: "", service: "", details: ""});
                    }}
                    className="mt-4 px-6 py-2 rounded-full border border-black/10 text-brand-dark font-medium hover:bg-black/5 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Info & Social */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-brand-dark text-white p-8 rounded-3xl relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/20 blur-[40px] rounded-full" />
              
              <h3 className="text-2xl font-heading font-bold mb-6 relative z-10">Direct Contact</h3>
              
              <div className="space-y-6 relative z-10">
                <a href="mailto:hivelabs.official@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-yellow/20 transition-colors">
                    <Mail className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Email Us</p>
                    <p className="font-medium group-hover:text-brand-yellow transition-colors">hivelabs.official@gmail.com</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Location</p>
                    <p className="font-medium">Global (Remote First)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-black/5 p-8 rounded-3xl shadow-sm">
              <h3 className="text-xl font-heading font-bold text-brand-dark mb-6">Connect With Us</h3>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/hivelabs.co.in?igsh=ZnZzZ2o5cmd6aTJn" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-brand-gray-light flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-colors group">
                  <svg className="w-5 h-5 text-brand-gray-muted group-hover:text-brand-dark transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/hivelabs-co/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-brand-gray-light flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-colors group">
                  <svg className="w-5 h-5 text-brand-gray-muted group-hover:text-brand-dark transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
