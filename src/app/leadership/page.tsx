import { NavHeader } from "@/components/NavHeader";
import Image from "next/image";
import ada from "./photos/ada.jpeg";
import alex from "./photos/alex.jpeg";
import ananya from "./photos/ananya.jpeg";
import andrewc from "./photos/andrewc.jpg";
import andrewt from "./photos/andrewt.jpg";
import anson from "./photos/anson.png";
import arya from "./photos/arya.jpg";
import brian from "./photos/brian.png";
import dev from "./photos/dev.png";
import dhruv from "./photos/dhruv.png";
import dice from "./photos/dice.png";
import jahaan from "./photos/jahaan.jpeg";
import kelly from "./photos/kelly.jpg";
import kevin from "./photos/kevin.png";
import khoi from "./photos/khoi.png";
import krishiv from "./photos/krishiv.jpg";
import krithi from "./photos/krithi.jpg";
import mahad from "./photos/mahad.png"; 
import michelle from "./photos/michelle.jpg";
import rachelle from "./photos/rachelle.jpg";
import ridhima from "./photos/ridhima.png";
import ryanban from "./photos/ryanban.jpg";
import ryanbig from "./photos/ryanbig.png";
import sar from "./photos/sar.jpg";
import sepandar from "./photos/sepandar.png";
import william from "./photos/william.png";
import win from "./photos/win.jpeg";

export default function Leadership() {
    const team = [
      {
        name: "Andrew Truong",
        position: "Hardware Outreach",
        year: "26",
        img: andrewt
      },
      {
        name: "Jahaanshah Sheikh",
        position: "Software Lead",
        year: "26",
        img: jahaan
      },
      {
        name: "Ryan Banerjee",
        position: "Business",
        year: "26",
        img: ryanban
      },
      {
        name: "Sepandar Farhood",
        position: "Software Lead",
        year: "26",
        img: sepandar
      },
      {
        name: "Ryan Biggee",
        position: "Co-Captain",
        year: "25",
        img: ryanbig
      },
      {
        name: "William Chen",
        position: "Software Lead",
        year: 25,
        img: william
      },
      {
        name: "Kelly Wu",
        position: "Business Lead",
        year: 25,
        img: kelly
      },
      {
        name: "Kevin Ji",
        position: "Finance Lead",
        year: 27,
        img: kevin
      },
      {
        name: "Mahad Saeed",
        position: "Outreach",
        year: 27,
        img: mahad
      },
      {
        name: "Arya Bharath",
        position: "Captain",
        year: 26,
        img: arya
      },
      {
        name: "Dev Mehra",
        position: "Hardware Co-lead",
        year: 25,
        img: dev
      },
  
      {
        name: "Dhruv Iyer",
        position: "Hardware Co-lead",
        year: 25,
        img: dhruv
      },
      {
        name: "Win Htet Lin",
        position: "Software",
        year: 27,
        img: win
      },
      {
        name: "Brian Lam",
        position: "Software Scouting and Apps ",
        year: "25",
        img: brian
      },
      {
        name: "Krish Jashnani",
        position: "Co-Captain",
        year: 25,
        img: dice
      },
  
      {
        name: "Krishiv Manyam",
        position: "Software Co-Lead",
        year: 25,
        img: krishiv
      },
      {
        name: "Ananya Nayak",
        position: "Media Lead",
        year: 27,
        img: ananya
      },
      {
        name: "Ridhima Motewar",
        position: "Co-Captain",
        year: 25,
        img: ridhima
      },
      {
        name: "Khoi Le",
        position: "Software",
        year: 27,
        img: khoi
      },
      {
        name: "Andrew Cheng",
        position: "Hardware Outreach",
        year: 25,
        img: andrewc
      },
      {
        name: "Ada Ji",
        position: "Electrical Co-lead",
        year: 25,
        img: ada
      },
      {
        name: "Alexander Xie",
        position: "Hardware",
        year: 26,
        img: alex
      },
      {
        name: "Anson Ng",
        position: "Design Lead",
        year: 26,
        img: anson
      },
      {
        name: "Krithi Manyam",
        position: "Design Co-lead",
        year: 26,
        img: krithi
      },
      {
        name: "Michelle Liao",
        position: "Hardware",
        year: 26,
        img: michelle
      },
      {
        name: "Rachelle Wang",
        position: "Electrical Co-Lead",
        year: 25,
        img: rachelle
      },
      {
        name: "Saravanan Valliappan",
        position: "Fabrication and Assembly Lead",
        year: 25,
        img: sar
      }
    ];
  
    return (
      <main className="flex-grow">
        <NavHeader />
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="py-12 md:py-20">
              {/* Section header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-14">
                <h2 className="bg-gradient-to-r from-[#ffc14a] to-[#d59a25] bg-clip-text text-transparent text-5xl font-bold tracking-tight lg:text-6xl xl:text-7xl p-3">Student Leadership</h2> 
                <p className="text-lg text-gray-600 mt-10" data-aos="zoom-y-out">
                  Team operations are entirely student-led; 
                  we stay true to the FIRST® mission of sparking invention and creativity.
                  We have three main
                  departments: Hardware, Software, and Business. In each
                  of these sub-teams, leadership positions are earned through
                  continuous effort and dedication. We take pride in our team’s
                  culture that helps our leaders further explore their own skills
                  and passions while finding joy in helping others.
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
                          <p className="mt-1 text-base inline text-transparent bg-clip-text bg-gradient-to-r from-[#11224e] to-[#11226e] font-medium">
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