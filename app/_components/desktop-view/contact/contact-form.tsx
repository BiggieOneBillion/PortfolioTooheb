"use client";
import { useState } from "react";
import { Courier_Prime, Vollkorn, Work_Sans } from "next/font/google";
import { useContactContentStore } from "@/store/contact-data-store";
import { FadeInView } from "@/components/ui/fade-in-when-in-view";
import { v4 as uuidv4 } from "uuid";
import { FadeIn } from "@/components/ui/fade-in-animation";

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier-prime",
});

const vollkorn = Vollkorn({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-vollkorn",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateLocation: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Message sent successfully!");
        setFormData({ name: "", email: "", dateLocation: "", message: "" });
      } else {
        alert("❌ Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong.");
    }
  };

  const contactContent = useContactContentStore(
    (state) => state.contactContent
  );

  if (contactContent == null) {
    return <p className="text-center">Loading....</p>;
  }

  return (
    <div className="min-h-screen bg-[#ede4d2]">
      <div className="w-[90%] mx-auto grid grid-cols-2 gap-0">
        {/* Left Image Column */}
        <div className="relative image-con overflow-hidden">
          <img
            src={
              contactContent?.desktop.image ||
              "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=1200&fit=crop"
            }
            alt="Coastal scene with boat and mountains"
            className="w-full h-full object-cover grayscale"
          />
        </div>

        {/* Right Content Column */}
        <div className="py-20 px-16 flex flex-col justify-center">
          <FadeIn direction="down">
            <h1
              className={`text-4xl text-center font-serif text-[#4a6b7c] mb-4 ${vollkorn.className} antialiased text-[#30586C]`}
            >
              {/* Get in touch / Ask a question */}
              {contactContent?.desktop.heading}
            </h1>
          </FadeIn>
          <aside
            className={`${workSans.className} antialiased text-[#363636] font-medium`}
          >
            <div className="space-y-6 text-[#3d3d3d] text-center mb-12">
              {contactContent?.desktop.paragraphs.map((el, i) => (
                <FadeInView
                  key={uuidv4()}
                  direction="up"
                  distance={30}
                  delay={i * 0.15}
                  duration={0.6}
                  threshold={0.5}
                >
                  <p key={el} className="leading-relaxed text-[15px]">
                    {el}
                  </p>
                </FadeInView>
              ))}
              <FadeIn delay={0.6}>
                <p className="leading-relaxed font-medium text-[15px]">
                  I can't wait to capture your moments!😎
                </p>
              </FadeIn>
            </div>
          </aside>

          {/* Contact Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-[#4a6b7c] text-sm mb-2">
                Name <span className="text-[#4a6b7c]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-3 bg-white border border-gray-300 text-[#3d3d3d] placeholder-gray-400 focus:outline-none focus:border-[#4a6b7c]"
              />
            </div>

            <div>
              <label className="block text-[#4a6b7c] text-sm mb-2">
                Email address <span className="text-[#4a6b7c]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-white border border-gray-300 text-[#3d3d3d] placeholder-gray-400 focus:outline-none focus:border-[#4a6b7c]"
              />
            </div>

            <div>
              <label className="block text-[#4a6b7c] text-sm mb-2">
                Date and Location <span className="text-[#4a6b7c]">*</span>
              </label>
              <input
                type="text"
                name="dateLocation"
                value={formData.dateLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 text-[#3d3d3d] focus:outline-none focus:border-[#4a6b7c]"
              />
            </div>

            <div>
              <label className="block text-[#4a6b7c] text-sm mb-2">
                Message <span className="text-[#4a6b7c]">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-white border border-gray-300 text-[#3d3d3d] resize-none focus:outline-none focus:border-[#4a6b7c]"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#c48563] text-white py-3 px-8 text-sm font-medium tracking-wide hover:bg-[#b57552] transition-colors mt-4"
            >
              SEND MESSAGE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
