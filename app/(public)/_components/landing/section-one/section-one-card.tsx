"use client";
import ImageCarousel from "@/components/ImageCarousel";
import { cn } from "@/lib/utils";
import { LandingSection1 } from "@prisma/client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

type Props = {
  type: "single" | "double";
  container?: LandingSection1;
};

const SectionOneCard = (props: Props) => {
  return (
    <Link target="_blank" href={props.container?.redirectUrl ?? "#"}>
      {/* Single or multiple image check*/}
      {props.container?.images ? (
        <>
          <ImageCarousel
            slug={"Banner image 1"}
            imageList={props.container?.images}
          />
        </>
      ) : (
        <img
          className="w-full rounded-lg object-cover h-auto"
          src="https://images.unsplash.com/photo-1488998427799-e3362cec87c3"
          alt="Placeholder image"
        />
      )}
    </Link>
  );
};

export default SectionOneCard;
