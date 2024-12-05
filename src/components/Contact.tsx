// 'use client'

// import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { FiSend, FiAirplane } from 'react-icons/fi' // Importing airplane icon

// export default function Contact() {
//   const [isAnimating, setIsAnimating] = useState(false)

//   const handleSubmit = (event) => {
//     event.preventDefault()
//     setIsAnimating(true)
//     setTimeout(() => setIsAnimating(false), 1000)
//     console.log('Form submitted')
//   }

//   return (
//     <div className="min-h-screen bg-white text-[#1a2f5e] flex flex-col items-center justify-center transition-all duration-700 relative">
//       {/* Airplane Icon */}
//       <FiAirplane
//         className="absolute top-20 text-[#ffb41a] animate-bounce"
//         size={40}
//       />

//       <div className="w-full max-w-md px-6 py-10 bg-[#f4f4f8] rounded-lg shadow-lg transition-transform transform hover:scale-105">
//         <h1 className="text-3xl font-bold text-[#ffb41a] mb-8 text-center transition-opacity duration-500 hover:opacity-90">Contact Us</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex items-center space-x-4">
//             <label htmlFor="name" className="w-1/3 text-sm font-medium text-[#1a2f5e]">Name</label>
//             <Input
//               id="name"
//               name="name"
//               required
//               className="w-full bg-white border border-[#ffb41a] text-[#1a2f5e] px-3 py-2 rounded-md focus:border-[#ffb41a] focus:ring-2 focus:ring-[#ffb41a] transition-colors duration-300"
//             />
//           </div>
//           <div className="flex items-center space-x-4">
//             <label htmlFor="email" className="w-1/3 text-sm font-medium text-[#1a2f5e]">Email</label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               required
//               className="w-full bg-white border border-[#ffb41a] text-[#1a2f5e] px-3 py-2 rounded-md focus:border-[#ffb41a] focus:ring-2 focus:ring-[#ffb41a] transition-colors duration-300"
//             />
//           </div>
//           <div className="flex items-center space-x-4">
//             <label htmlFor="subject" className="w-1/3 text-sm font-medium text-[#1a2f5e]">Subject</label>
//             <Input
//               id="subject"
//               name="subject"
//               required
//               className="w-full bg-white border border-[#ffb41a] text-[#1a2f5e] px-3 py-2 rounded-md focus:border-[#ffb41a] focus:ring-2 focus:ring-[#ffb41a] transition-colors duration-300"
//             />
//           </div>
//           <Button
//             type="submit"
//             className="w-full bg-[#ffb41a] text-[#1a2f5e] hover:bg-[#ffc14a] font-semibold py-2 rounded-md flex items-center justify-center space-x-2 transition-transform duration-300 transform hover:scale-105"
//           >
//             <span>Send Message</span>
//             <FiSend
//               className={`transition-transform duration-500 ${isAnimating ? 'animate-send' : ''}`}
//               size={20}
//             />
//           </Button>
//         </form>
//       </div>

//       <style jsx>{`
//         .animate-send {
//           animation: send-animation 1s ease-in-out forwards;
//         }
//         @keyframes send-animation {
//           0% { transform: translateX(0) rotate(0); opacity: 1; }
//           50% { transform: translateX(200px) rotate(20deg); opacity: 1; }
//           100% { transform: translateX(1000px) rotate(45deg); opacity: 0; }
//         }
//         /* Animation for airplane bounce */
//         .animate-bounce {
//           animation: bounce 2s infinite;
//         }
//         @keyframes bounce {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-20px); }
//         }
//       `}</style>
//     </div>
//   )
// }
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiSend } from "react-icons/fi"; // Paper plane icon
import { FaPlane } from "react-icons/fa"; // Airplane icon
import Mail from "nodemailer/lib/mailer";

export default function Contact() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Message from ${name} (${email})`,
    text: subject,
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen bg-white text-[#1a2f5e] flex flex-col items-center justify-center transition-all duration-700 relative">
      {/* Airplane Icon */}
      <FaPlane
        className="absolute top-20 text-[#ffb41a] animate-bounce"
        size={40}
      />

      <div className="w-full max-w-md px-6 py-10 bg-[#f4f4f8] rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-[#ffb41a] mb-8 text-center transition-opacity duration-500 hover:opacity-90">
          Contact Us
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields */}

          <div className="flex items-center space-x-4">
            <label
              htmlFor="name"
              className="w-1/3 text-sm font-medium text-[#1a2f5e]"
            >
              Name
            </label>
            <Input
              id="name"
              name="name"
              required
              className="w-full bg-white border border-[#ffb41a] text-[#1a2f5e] px-3 py-2 rounded-md focus:border-[#ffb41a] focus:ring-2 focus:ring-[#ffb41a] transition-colors duration-300"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="email"
              className="w-1/3 text-sm font-medium text-[#1a2f5e]"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-white border border-[#ffb41a] text-[#1a2f5e] px-3 py-2 rounded-md focus:border-[#ffb41a] focus:ring-2 focus:ring-[#ffb41a] transition-colors duration-300"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="subject"
              className="w-1/3 text-sm font-medium text-[#1a2f5e]"
            >
              Subject
            </label>
            <Input
              id="subject"
              name="subject"
              required
              className="w-full bg-white border border-[#ffb41a] text-[#1a2f5e] px-3 py-2 rounded-md focus:border-[#ffb41a] focus:ring-2 focus:ring-[#ffb41a] transition-colors duration-300"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#ffb41a] text-[#1a2f5e] hover:bg-[#ffc14a] font-semibold py-2 rounded-md flex items-center justify-center space-x-2 transition-transform duration-300 transform hover:scale-105"
          >
            <span>Send Message</span>
            <FiSend
              className={`transition-transform duration-500 ${
                isAnimating ? "animate-send" : ""
              }`}
              size={20}
            />
          </Button>
        </form>
      </div>

      <style jsx>{`
        .animate-send {
          animation: send-animation 1s ease-in-out forwards;
        }
        @keyframes send-animation {
          0% {
            transform: translateX(0) rotate(0);
            opacity: 1;
          }
          50% {
            transform: translateX(200px) rotate(20deg);
            opacity: 1;
          }
          100% {
            transform: translateX(1000px) rotate(45deg);
            opacity: 0;
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
