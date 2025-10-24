"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

type ImageThreeDCardType = {
  imageUrl: string;
};

export function ImageThreeDCard({ imageUrl }: ImageThreeDCardType) {
  return (
    <CardContainer className="inter-var p-0 m-0 mb-10">
      <CardBody className="relative group/card  w-auto sm:w-[30rem] rounded-xl   ">
        <CardItem translateZ="100" className="w-full">
          <img
            src={imageUrl}
            height="1000"
            width="1000"
            className="h-60y w-full object-cover rounded-xl group-hover/card:shadow-xl h-[500px] "
            alt="thumbnail"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
