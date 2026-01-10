import React from "react";
import AboutWidget from "./AboutWidget";
import FooterWidget from "./FooterWidget";
import Newsletter from "./Newsletter";
import Copyright from "./Copyright";
import footerData from "@/data/pages/official/footer.json";

const Footer: React.FC = () => {
  return (
    <footer className="relative z-20 bg-gray-950 overflow-hidden border-t-4 xl:border-t-3 border-theme">
      {/* Top Decorative Shape */}
      <div className="text-center">
        <div
          className="inline-block bg-gray-90 px-12 sm:px-60 py-6 mb-[-20px]"
          style={{
            clipPath: "polygon(0 0, 100% 0, calc(100% - 50px) 100%, 50px 100%)",
          }}
        />
      </div>

      {/* Widget Area */}
      <div className="pt-16 pb-0">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 justify-items-start xl:justify-items-center">
            {/* About Widget */}
            <div className="w-1/3 flex flex-col items-center xl:items-start xl:w-auto">
              <AboutWidget
                logo={footerData.logo}
                about={footerData.about}
                socialLinks={footerData.socialLinks}
              />
            </div>

            {/* Link Widgets */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 xl:gap-12">
            {footerData.widgets.map((widget) => (
              <div key={widget.title} className="w-full xl:w-auto">
                <FooterWidget title={widget.title} links={widget.links} />
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <Copyright />
    </footer>
  );
};

export default Footer;
