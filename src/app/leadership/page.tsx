import { NavHeader } from "@/components/NavHeader";
import ada from "@/app/leadership/photos/ada.jpeg";
import alex from "@/app/leadership/photos/alex.jpeg";
import ananya from "@/app/leadership/photos/ananya.jpeg";
import andrewc from "@/app/leadership/photos/andrewc.jpg";
import andrewt from "@/app/leadership/photos/andrewt.jpg";
import anson from "@/app/leadership/photos/anson.png";
import arya from "@/app/leadership/photos/arya.jpg";
import brian from "@/app/leadership/photos/brian.png";
import dev from "@/app/leadership/photos/dev.png";
import dhruv from "@/app/leadership/photos/dhruv.png";
import dice from "@/app/leadership/photos/dice.png";
import jahaan from "@/app/leadership/photos/jahaan.jpg";
import kelly from "@/app/leadership/photos/kelly.jpg";
import kevin from "@/app/leadership/photos/kevin.png";
import khoi from "@/app/leadership/photos/khoi.png";
import krishiv from "@/app/leadership/photos/krishiv.jpg";
import krithi from "@/app/leadership/photos/krithi.jpg";
import mahad from "@/app/leadership/photos/mahad.png";
import michelle from "@/app/leadership/photos/michelle.jpg";
import rachelle from "@/app/leadership/photos/rachelle.jpg";
import ridhima from "@/app/leadership/photos/ridhima.png";
import ryanban from "@/app/leadership/photos/ryanban.jpg";
import ryanbig from "@/app/leadership/photos/ryanbig.png";
import sar from "@/app/leadership/photos/sar.jpg";
import sepandar from "@/app/leadership/photos/sepandar.png";
import william from "@/app/leadership/photos/william.png";
import win from "@/app/leadership/photos/win.jpeg";
import Image from "next/image";

function Leadership() {
    const team = [
      {
        name: "Andrew Truong",
        position: "Hardware Outreach",
        year: "26",
        // img: "/app/leadership/photos/Andrew Truong - Hardware Outreach.jpg",
        img: andrewt
      },
      {
        name: "Jahaanshah Sheikh",
        position: "Software Lead",
        year: "26",
        // img: "/app/leadership/Jahaanshah Sheikh, Software Lead_ Robot.JPG",
        img: jahaan
      },
      {
        name: "Ryan Banerjee",
        position: "Business",
        year: "26",
        // img: "/static/leadership/Ryan Banerjee, Business LIT.jpg",
        img: ryanban
      },
      {
        name: "Sepandar Farhood",
        position: "Software Lead",
        year: "26",
        // img: "/static/leadership/Sepandar Farhood, Software Lead_ Development.HEIC",
        img: sepandar
      },
      {
        name: "Ryan Biggee",
        position: "Co-Captain",
        year: "25",
        // img: "/static/images/Leadership/RyanB.jpg",
        img: ryanbig
      },
      {
        name: "William Chen",
        position: "Software Lead",
        year: 25,
        // img: "/static/images/Leadership/e - William Chen.jpg",
        img: william
      },
      {
        name: "Kelly Wu",
        position: "Business Lead",
        year: 25,
        // img: "/static/images/Leadership/Screenshot 2023-01-20 at 11.13.35 PM - Kelly Wu.png",
        img: kelly
      },
      {
        name: "Kevin Ji",
        position: "Finance Lead",
        year: 27,
        // img: "/static/leadership/Kevin Ji, Finance Lead.HEIC",
        img: kevin
      },
      {
        name: "Mahad Saeed",
        position: "Outreach",
        year: 27,
        // img: "/static/leadership/Mahad Saeed, Outreach LIT.heic",
        img: mahad
      },
  
      {
        name: "Arya Bharath",
        position: "Captain",
        year: 26,
        // img: "/static/images/Leadership/Arya Bharath.jpg",
        img: arya
      },
      {
        name: "Dev Mehra",
        position: "Mechanical Co-lead",
        year: 25,
        // img: "/static/images/Leadership/IMG_1763 - Dēv Mehra.jpg",
        img: dev
      },
  
      {
        name: "Dhruv Iyer",
        position: "Mechanical Co-lead",
        year: 25,
        // img: "/static/images/Leadership/iyer.png",
        img: dhruv
      },
      {
        name: "Win Htet Lin",
        position: "Software",
        year: 27,
        // img: "/static/images/leadership/Win Htet Lin, Software LIT.jpg",
        img: win
      },
      {
        name: "Brian Lam",
        position: "Software Scouting and Apps ",
        year: "25",
        // img: "/static/leadership/Brian Lam, Software Scouting and Apps.heic",
        img: brian
      },
      {
        name: "Krish Jashnani",
        position: "Co-Captain",
        year: 25,
        // img: "/static/images/Leadership/krish.jpg"
        img: dice
      },
  
      {
        name: "Krishiv Manyam",
        position: "Software Co-Lead",
        year: 25,
        // img: "/static/images/Leadership/krishiv.jpg",
        img: krishiv
      },
      {
        name: "Ananya Nayak",
        position: "Media Lead",
        year: 27,
        // img: "/static/leadership/Ananya_Nayak-Media Lead.jpeg",
        img: ananya
      },
      {
        name: "Ridhima Motewar",
        position: "Co-Captain",
        year: 25,
        // img: "/static/images/Leadership/E4C99F44-1A64-45E3-A4AA-FA127F5E5594 - Ridhima Motewar.jpeg",
        img: ridhima
      },
      {
        name: "Khoi Le",
        position: "Software",
        year: 27,
        // img: "/static/leadership/Khoi Le, Software LIT (Apps, Website, Scouting).png",
        img: khoi
      },
      {
        name: "Andrew Cheng",
        position: "Hardware Outreach",
        year: 25,
        // img: "/static/leadership/Andrew Cheng, Hardware Outreach Lead.jpg",
        img: andrewc
      },
      {
        name: "Ada Ji",
        position: "Electrical Co-lead",
        year: 25,
        // img: "public/static/leadership/Ada Ji, Electrical Co-lead.jpeg",
        img: ada
      },
      {
        name: "Alexander Xie",
        position: "Hardware",
        year: 26,
        // img: "/static/leadership/Alexander Xie - Hardware LIT.jpeg",
        img: alex
      },
      {
        name: "Anson Ng",
        position: "Design Lead",
        year: 26,
        // img: "/static/leadership/Anson Ng, Design Lead.png",
        img: anson
      },
      {
        name: "Krithi Manyam",
        position: "Design Co-lead",
        year: 26,
        // img: "/static/leadership/Krithi Manyam, Design Co-Lead.jpg",
        img: krithi
      },
      {
        name: "Michelle Liao",
        position: "Hardware",
        year: 26,
        // img: "/static/leadership/Michelle Liao, Hardware LIT.jpg",
        img: michelle
      },
      {
        name: "Rachelle Wang",
        position: "Electrical Co-Lead",
        year: 25,
        // img: "/static/leadership/Rachelle Wang - Electrical Co-Lead.JPG",
        img: rachelle
      },
      {
        name: "Saravanan Valliappan",
        position: "Fabrication and Assembly Lead",
        year: 25,
        // img: "/static/leadership/Saravanan Valliappan, Fabrication & Assembly Lead.jpg",
        img: sar
      }
    ];
  
    return (
      <main className="flex-grow">
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="py-12 md:py-20">
              {/* Section header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-14">
                <h2 className="h2">Our Student Leadership</h2>
                <p className="text-lg text-gray-600 mt-10" data-aos="zoom-y-out">
                  True to the FIRST® mission of sparking invention and creativity,
                  team operations are entirely student-led. We have three main
                  departments: Mechanical, Programming, and Buisness. In each
                  of these sub-teams, leadership positions are earned through
                  continuous effort and dedication. We take pride in our team’s
                  culture that helps our leaders further explore their own skills
                  and passions and find joy in helping others.
                </p>
              </div>
  
              {/* Items */}
              <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {team.map((member, index) => {
                    // fix id
                    return (
                      <div
                        key={index}
                        className="flex space-x-6"
                        style={{ marginLeft: "25%" }}
                      >
                        <Image
                          src={member.img}
                          height={100}
                          width={100}
                          className="h-16 object-cover w-16 rounded-xl bg-gray-800 border-none shadow-sm"
                          alt={member.name}
                        />
                        <div className="block text-lg">
                          <a
                            className="hover:text-gray-700"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <p className="font-semibold break-normal">
                              {member.name} '{member.year}
                            </p>
                          </a>
                          <p className="mt-1 text-base inline text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 font-medium">
                            {member.position}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
  
export default function MentorsPage() {
    return (
        <><NavHeader /><Leadership/></>
    )
}