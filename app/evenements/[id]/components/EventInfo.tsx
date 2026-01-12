"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LuCalendar,
  LuClock,
  LuMapPin,
  LuTrainFront,
  LuBus,
  LuCar,
  LuShieldCheck,
  LuExternalLink,
  LuTicket,
} from "react-icons/lu";
import RegistrationDialog from "./RegistrationDialog";
import EventMap from "./EventMap";

interface Transport {
  metro?: { lines: string[]; station: string };
  tramway?: { lines: string[]; station: string };
  bus?: { lines: string[]; station: string };
  car?: { parkings: { name: string; address: string; distance: string }[] };
}

interface EventInfoProps {
  description: string;
  startDate: string;
  endDate?: string;
  startTime: string;
  location: string;
  highlightColor: string;
  transports?: Transport;
  weezeventCode?: string;
  eventTitle: string;
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

  const displayDate = endDate
    ? `Du ${new Date(startDate).getDate()} au ${formatDate(endDate)}`
    : formatDate(startDate);

  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Description */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="font-rajdhani font-bold text-3xl text-white uppercase tracking-tight flex items-center gap-3">
              <span
                className="w-8 h-1"
                style={{ backgroundColor: highlightColor }}
              />
              Détails
            </h2>
            <div className="prose prose-invert max-w-none prose-p:text-gray-400 prose-p:font-rajdhani prose-p:text-lg prose-p:leading-relaxed mb-12 text-white font-poppins">
              <p>{description}</p>
            </div>

            <EventMap location={location} highlightColor={highlightColor} />
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Info Card */}
            <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 space-y-6 backdrop-blur-sm">
              <h3 className="font-rajdhani font-bold text-2xl text-white uppercase tracking-tight">
                Infos Pratiques
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <LuCalendar
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
              </div>

              {/* Transports Section */}
              {transports && (
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <h4 className="text-white font-rajdhani font-bold uppercase text-sm tracking-wider">
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

                {weezeventCode && (
                  <button
                    onClick={() => setIsDialogOpen(true)}
                    className="w-full py-4 rounded-xl font-rajdhani font-bold text-gray-950 uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
                    style={{ backgroundColor: highlightColor }}
                  >
                    <LuTicket className="w-5 h-5" />
                    S'inscrire maintenant
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
        />
      )}
    </section>
  );
};

export default EventInfo;
