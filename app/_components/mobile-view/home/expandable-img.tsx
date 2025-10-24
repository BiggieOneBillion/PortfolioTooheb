"use client";
import { Button } from "@/components/ui/button";
import React, { ReactNode, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../../../../components/ui/animated-modal";

type ExpandableImageType = {
  children: ReactNode;
  src: string;
};

const ExpandableImage = ({ children, src }: ExpandableImageType) => {
  const [expandImg, setExpandImg] = useState<boolean>(false);
  return (
    <Modal>
      <ModalTrigger >{children}</ModalTrigger>

      {/* {expandImg && ( */}
      <ModalBody>
        <ModalContent>
          {/* <div className="fixed top-0 left-0 w-screen h-screen bg-black/90 flex flex-col gap-10 items-center justify-center"> */}
          <div className="mb-10">
            <div className="w-full h-[400px] relative overflow-hidden rounded-lg">
              <img
                src={src}
                alt={`Photo grid`}
                className="w-full h-full object-cover"
              />
            </div>
          
          </div>
          {/* </div> */}
        </ModalContent>
      </ModalBody>
      {/* )} */}
    </Modal>
  );
};

export default ExpandableImage;
