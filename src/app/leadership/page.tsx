import { NavHeader } from "@/components/NavHeader";

function Leadership() {
    const team = [
      {
        name: "Andrew Truong",
        position: "Mechanical Outreach",
        year: "26",
        img: "@/../public/static/leadership/Andrew Truong - Hardware Outreach.jpg",
      },
      {
        name: "Jahaanshah Sheikh",
        position: "Software",
        year: "26",
        img: "static/leadership/Jahaanshah Sheikh, Software Lead_ Robot.JPG",
      },
      {
        name: "Ryan Banerjee",
        position: "Buisness",
        year: "26",
        img: "public/static/leadership/Ryan Banerjee, Business LIT.jpg",
      },
      {
        name: "Sepander Farhood",
        position: "Software Lead",
        year: "26",
        img: "public/static/leadership/Sepandar Farhood, Software Lead_ Development.HEIC",
      },
      {
        name: "Ryan Biggee",
        position: "Mechanical Co-Captain",
        year: "25",
        img: "/static/images/Leadership/RyanB.jpg",
      },
      {
        name: "William Chen",
        position: "Software Lead",
        year: 25,
        img: "/static/images/Leadership/e - William Chen.jpg",
      },
      {
        name: "Kelly Wu",
        position: "Business",
        year: 25,
        img: "/static/images/Leadership/Screenshot 2023-01-20 at 11.13.35 PM - Kelly Wu.png",
      },
      {
        name: "Kevin Ji",
        position: "Business",
        year: 27,
        img: "public/static/leadership/Kevin Ji, Finance Lead.HEIC",
      },
      {
        name: "Mahad Saeed",
        position: "Business",
        year: 27,
        img: "public/static/leadership/Mahad Saeed, Outreach LIT.heic",
      },
  
      {
        name: "Arya Bharath",
        position: "Business",
        year: 26,
        img: "/static/images/Leadership/Arya Bharath.jpg",
      },
      {
        name: "Dev Mehra",
        position: "Mechanical",
        year: 25,
        img: "/static/images/Leadership/IMG_1763 - Dēv Mehra.jpg",
      },
  
      {
        name: "Dhruv Iyer",
        position: "Mechanical",
        year: 25,
        img: "/static/images/Leadership/iyer.png",
      },
      {
        name: "Win Htet Lin",
        position: "Software",
        year: 27,
        img: "/static/images/leadership/Win Htet Lin, Software LIT.jpg",
      },
      {
        name: "Brian Lam",
        position: "Software",
        year: "25",
        img: "public/static/leadership/Brian Lam, Software Scouting and Apps.heic",
      },
      {
        name: "Krish Jashnani",
        position: "Mechanical",
        year: 25,
        img: "/static/images/Leadership/krish.jpg"
      },
  
      {
        name: "Krishiv Manyam",
        position: "Software",
        year: 25,
        img: "/static/images/Leadership/krishiv.jpg",
      },
      {
        name: "Ananya Nayak",
        position: "Buisness",
        year: 27,
        img: "public/static/leadership/Ananya_Nayak-Media Lead.jpeg",
      },
      {
        name: "Ridhima Motewar",
        position: "Business",
        year: 25,
        img: "/static/images/Leadership/E4C99F44-1A64-45E3-A4AA-FA127F5E5594 - Ridhima Motewar.jpeg",
        
      },
      {
        name: "Khoi Le",
        position: "Software",
        year: 27,
        img: "public/static/leadership/Khoi Le, Software LIT (Apps, Website, Scouting).png",
      },
      {
        name: "Andrew Cheng",
        position: "Mechanical",
        year: 25,
        img: "public/static/leadership/Andrew Cheng, Hardware Outreach Lead.jpg",
      },
      {
        name: "Ada Ji",
        position: "Mechanical",
        year: 25,
        img: "public/static/leadership/Ada Ji, Electrical Co-lead.jpeg",
      },
      {
        name: "Alexander Xie",
        position: "Mechanical",
        year: 26,
        img: "public/static/leadership/Alexander Xie - Hardware LIT.jpeg",
      },
      {
        name: "Anson Ng",
        position: "Mechanical",
        year: 26,
        img: "public/static/leadership/Anson Ng, Design Lead.png",
      },
      {
        name: "Krithi Manyam",
        position: "Mechanical",
        year: 26,
        img: "public/static/leadership/Krithi Manyam, Design Co-Lead.jpg",
      },
      {
        name: "Michelle Liao",
        position: "Mechanical",
        year: 26,
        img: "public/static/leadership/Michelle Liao, Hardware LIT.jpg",
      },
      {
        name: "Rachelle Wang",
        position: "Mechanical",
        year: 25,
        img: "public/static/leadership/Rachelle Wang - Electrical Co-Lead.JPG",
      },
      {
        name: "Saravanan Valliappan",
        position: "Mechanical",
        year: 25,
        img: "public/static/leadership/Saravanan Valliappan, Fabrication & Assembly Lead.jpg",
      },
      
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
                        <img
                          src={member.img}
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