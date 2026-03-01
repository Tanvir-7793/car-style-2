"use client";
import React from "react";
import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  description: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, role, image, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-blue-600 font-semibold mb-3">{role}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default TeamCard;
