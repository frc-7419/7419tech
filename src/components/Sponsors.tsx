import React from "react";
import Image from "next/image"

function Sponsors() {
  return (
    <main className="flex-grow">
      <section className="relative">
        {/* Illustration behind content */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -mb-32"
          aria-hidden="true"
        >
          <svg
            width="1760"
            height="518"
            viewBox="0 0 1760 518"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="illustration-02"
              >
                <stop stopColor="#FFF" offset="0%" />
                <stop stopColor="#EAEAEA" offset="77.402%" />
                <stop stopColor="#DFDFDF" offset="100%" />
              </linearGradient>
            </defs>
            <g
              transform="translate(0 -3)"
              fill="url(#illustration-02)"
              fillRule="evenodd"
            ></g>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h2 className="h2 mb-4">Our Sponsors</h2>
              <p className="text-xl text-gray-600" data-aos="zoom-y-out">
                Thank you for all your help along the way.
              </p>
            </div>

            <div className="max-w-sm md:max-w-7xl mx-auto flex flex-auto flex-row flex-wrap justify-center px-20">
              <div className="basis-1/3 sponsor flex items-center justify-center py-2 col-span-2 md:col-auto">
                <img src={"/static/sponsors/qls.png"} alt="qls.png" />
              </div>
              <div className="basis-1/3 sponsor flex items-center justify-center py-2 col-span-2 md:col-auto">
                <img
                  src={"/static/sponsors/notion-logo.png"}
                  alt="notion-logo.png"
                />
              </div>
              <div className=" basis-1/3 sponsor flex items-center justify-center py-2 col-span-2 md:col-auto">
                <img
                  src={"/static/sponsors/TheVillageOfDreams.png"}
                  alt="TheVillageOfDreams.png"
                />
              </div>
              <div className="basis-1/3 sponsor flex items-center justify-center py-2 col-span-2 md:col-auto">
                <img
                  src={"/static/sponsors/HansLaser.png"}
                  alt="HansLaser.png"
                />
              </div>
              <div className="basis-1/3 sponsor flex items-center justify-center ml-3 py-2 col-span-2 md:col-auto">
                <img
                  src={"/static/sponsors/IntuitiveFoundation.png"}
                  alt="IntuitiveFoundation.png"
                />
              </div>
              <div className="basis-1/3 sponsor flex items-center justify-center ml-3 py-2 col-span-2 md:col-auto">
                <img src={"/static/sponsors/nasa.png"} alt="nasa.png" />
              </div>
              <div className="basis-1/3 sponsor flex items-center justify-center ml-3 py-2 col-span-2 md:col-auto">
                <img
                  src={"/static/sponsors/FIRST-NorCal.png"}
                  alt="FIRST-NorCal.png"
                />
              </div>
              <div className="basis-1/3 sponsor flex items-center justify-center ml-3 py-2 col-span-2 md:col-auto">
                <img src={"/static/sponsors/sf-cable.png"} alt="sf-cable.png" />
              </div>
              <div className="basis-1/3 sponsor flex items-center justify-center ml-3 py-2 col-span-2 md:col-auto">
                <img
                  src={"/static/sponsors/googleLogo.png"}
                  alt="googleLogo.png"
                />
              </div>
              <div className="basis-1/3 sponsor flex items-center justify-center ml-3 py-2 col-span-2 md:col-auto">
                <img src={"/static/sponsors/ldl.svg"} alt="ldl.svg" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Sponsors;
