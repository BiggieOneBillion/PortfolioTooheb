"use client";
import { useState } from "react";
import { Courier_Prime, Vollkorn, Work_Sans } from "next/font/google";
import { useContactContentStore } from "@/store/contact-data-store";

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

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
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
        <div className="relative">
          <img
            // src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=1200&fit=crop"
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
          <h1
            className={`text-4xl text-center font-serif text-[#4a6b7c] mb-4 ${vollkorn.className} antialiased text-[#30586C]`}
          >
            {/* Get in touch / Ask a question */}
            {contactContent?.desktop.heading}
          </h1>
          <aside
            className={`${workSans.className} antialiased text-[#363636] font-medium`}
          >
            <div className="space-y-6 text-[#3d3d3d] text-center mb-12">
              {contactContent?.desktop.paragraphs.map((el) => (
                <p className="leading-relaxed text-[15px]">{el}</p>
              ))}
              {/* <p className="leading-relaxed text-[15px]">
                Whether you're planning a romantic escape, a family holiday, or
                a once-in-a-lifetime celebration in beautiful Croatia — I'd love
                to hear from you!
              </p>

              <p className="leading-relaxed text-[15px]">
                Tell me a bit about your story, your plans, and the kind of
                photos you're dreaming of. I'll get back to you as soon as
                possible with all the info you need.
              </p>

              <p className="leading-relaxed text-[15px]">
                Just fill out the contact form or drop me a message — let's
                create something beautiful together.
              </p>

              <p className="leading-relaxed text-[15px]">
                Available all along the coast and the islands.
              </p> */}
              <p className="leading-relaxed font-medium text-[15px]">
                I can't wait to capture your moments!😎
              </p>
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
