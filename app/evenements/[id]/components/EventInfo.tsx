"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LuClock,
  LuMapPin,
  LuTrainFront,
  LuBus,
  LuCar,
  LuShieldCheck,
  LuExternalLink,
  LuTicket,
  LuGamepad2,
} from "react-icons/lu";
import RegistrationDialog from "./RegistrationDialog";
import EventMap from "./EventMap";
import { Event } from "@/types/pages/detail-event";
import Statistics from "@/components/sections/Statistics";
import Gallery from "@/components/sections/Gallery";

interface EventInfoProps {
  description: Event["description"];
  startDate: Event["startDate"];
  endDate?: Event["endDate"];
  startTime: Event["startTime"];
  location: Event["location"];
  highlightColor: Event["color"];
  transports?: Event["transports"];
  weezeventCode?: Event["weezeventCode"];
  eventTitle: Event["title"];
  registrationOpen?: boolean;
}

const EventInfo: React.FC<EventInfoProps> = ({
  description,
  startDate,
  endDate,
  startTime,
  location,
  highlightColor,
  transports,
  weezeventCode,
  eventTitle,
  registrationOpen = false,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Format date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const displayDate = (() => {
    const start = formatDate(startDate);

    // Vérifier si endDate existe et est différente de startDate
    const hasEndDate =
      endDate && endDate.trim() !== "" && endDate !== startDate;
    const hasStartTime = startTime && startTime.trim() !== "";

    if (hasEndDate) {
      const end = formatDate(endDate);
      // Période avec date de fin différente
      if (hasStartTime) {
        return `Du ${start} au ${end} à ${startTime}`;
      }
      return `Du ${start} au ${end}`;
    }

    // Date unique (ou endDate identique à startDate)
    if (hasStartTime) {
      return `Le ${start} à ${startTime}`;
    }
    return `Le ${start}`;
  })();

  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Description */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="font-goldman text-3xl text-white uppercase tracking-tight flex items-center gap-3">
              <span
                className="w-8 h-1"
                style={{ backgroundColor: highlightColor }}
              />
              Détails
            </h2>
            <div>
              {description &&
                description.map((block, index) => {
                  if (block.type === "text" && Array.isArray(block.content)) {
                    return block.content.map(
                      (contentItem: any, idx: number) => {
                        if (contentItem.type === "title") {
                          return (
                            <h3
                              key={idx}
                              className="font-rajdhani font-bold text-2xl text-white mt-8 mb-4"
                            >
                              {contentItem.title}
                            </h3>
                          );
                        } else if (contentItem.type === "paragraph") {
                          return contentItem.paragraphs.map(
                            (para: string, pIdx: number) => (
                              <p
                                key={pIdx}
                                className="text-gray-300 text-base leading-7 mb-4"
                              >
                                {para}
                              </p>
                            ),
                          );
                        } else if (contentItem.type === "list") {
                          return (
                            <ul
                              key={idx}
                              className="list-disc list-inside text-gray-300 text-base leading-7 mb-4"
                            >
                              {contentItem.items?.map(
                                (item: string, itemIdx: number) => (
                                  <li key={itemIdx}>{item}</li>
                                ),
                              )}
                            </ul>
                          );
                        } else if (contentItem.type === "citation") {
                          return (
                            <blockquote
                              key={idx}
                              className="border-l-4 border-gray-500 pl-4 italic text-gray-400 my-6"
                            >
                              {contentItem.citationText}
                            </blockquote>
                          );
                        }
                        return null;
                      },
                    );
                  } else if (block.type === "statistics" && block.content) {
                    return <Statistics key={index} data={block.content} isDetailedEventPage={true} />;
                  } else if (block.type === "gallery" && block.content) {
                    return <Gallery key={index} data={block.content} isDetailedEventPage={true} />;
                  } else {
                    return null;
                  }
                })}
            </div>

            {/* Map Section */}
            {location && (
              <EventMap location={location} highlightColor={highlightColor} />
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Info Card */}
            <div className="sticky top-48 bg-gray-900/50 border border-white/10 rounded-2xl p-6 space-y-6 backdrop-blur-sm">
              <h3 className="font-goldman text-2xl text-white uppercase tracking-tight">
                Infos Pratiques
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <LuGamepad2
                      className="w-5 h-5"
                      style={{ color: highlightColor }}
                    />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                      Date
                    </p>
                    <p className="text-white font-rajdhani font-bold">
                      {displayDate}
                    </p>
                  </div>
                </div>

                {startTime && (
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      <LuClock
                        className="w-5 h-5"
                        style={{ color: highlightColor }}
                      />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                        Horaires
                      </p>
                      <p className="text-white font-rajdhani font-bold">
                        {startTime}
                      </p>
                    </div>
                  </div>
                )}

                {location && (
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      <LuMapPin
                        className="w-5 h-5"
                        style={{ color: highlightColor }}
                      />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                        Lieu
                      </p>
                      <p className="text-white font-rajdhani font-bold">
                        {location}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Transports Section */}
              {transports && (
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <h4 className="text-white font-goldman uppercase text-sm tracking-wider">
                    Comment s'y rendre ?
                  </h4>

                  {transports.metro && (
                    <div className="flex items-start gap-4">
                      <LuTrainFront className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                      <p className="text-gray-400 text-sm font-rajdhani">
                        Métro{" "}
                        <span className="text-white font-bold">
                          {transports.metro.lines.join(", ")}
                        </span>{" "}
                        : Arrêt{" "}
                        <span className="text-white font-bold">
                          {transports.metro.station}
                        </span>
                      </p>
                    </div>
                  )}

                  {transports.tramway && (
                    <div className="flex items-start gap-4">
                      <LuTrainFront className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                      <p className="text-gray-400 text-sm font-rajdhani">
                        Tramway{" "}
                        <span className="text-white font-bold">
                          {transports.tramway.lines.join(", ")}
                        </span>{" "}
                        : Arrêt{" "}
                        <span className="text-white font-bold">
                          {transports.tramway.station}
                        </span>
                      </p>
                    </div>
                  )}

                  {transports.bus && (
                    <div className="flex items-start gap-4">
                      <LuBus className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                      <p className="text-gray-400 text-sm font-rajdhani">
                        Bus{" "}
                        <span className="text-white font-bold">
                          {transports.bus.lines.join(", ")}
                        </span>{" "}
                        : Arrêt{" "}
                        <span className="text-white font-bold">
                          {transports.bus.station}
                        </span>
                      </p>
                    </div>
                  )}

                  {transports.car && (
                    <div className="space-y-3">
                      <div className="flex items-start gap-4">
                        <LuCar className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                        <p className="text-white font-rajdhani font-bold text-sm">
                          Parkings à proximité :
                        </p>
                      </div>
                      <div className="pl-9 space-y-2">
                        {transports.car.parkings.map((p, idx) => (
                          <div key={idx} className="text-xs">
                            <p className="text-gray-200 font-bold">
                              {p.name} ({p.distance})
                            </p>
                            <p className="text-gray-500 font-rajdhani">
                              {p.address}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                <Link
                  href="/reglement"
                  target="_blank"
                  className="w-full py-4 rounded-xl border border-white/10 bg-white/5 font-rajdhani font-bold text-white uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-white/10 transition-all group"
                >
                  <LuShieldCheck className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  Voir le règlement
                  <LuExternalLink className="w-4 h-4 opacity-50" />
                </Link>

                {weezeventCode &&
                  new Date() < new Date(endDate || startDate) && (
                    <button
                      onClick={() => registrationOpen && setIsDialogOpen(true)}
                      disabled={!registrationOpen}
                      className="w-full py-4 rounded-xl font-rajdhani font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all shadow-lg"
                      style={{ 
                        backgroundColor: registrationOpen ? highlightColor : '#4b5563',
                        color: registrationOpen ? '#111827' : '#d1d5db',
                        cursor: registrationOpen ? 'pointer' : 'not-allowed',
                        opacity: registrationOpen ? 1 : 0.6,
                      }}
                    >
                      <LuTicket className="w-5 h-5" />
                      {registrationOpen ? "S'inscrire maintenant" : "Inscriptions fermées"}
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {weezeventCode && (
        <RegistrationDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          weezeventCode={weezeventCode}
          title={eventTitle}
          registrationOpen={registrationOpen}
        />
      )}
    </section>
  );
};

export default EventInfo;
