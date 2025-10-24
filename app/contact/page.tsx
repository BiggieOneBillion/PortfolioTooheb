"use client";
import React, { useEffect } from "react";
import ContactView from "../_components/mobile-view/contact";
import ContactSection from "../_components/desktop-view/contact/contact-form";
import { useContactContentStore } from "@/store/contact-data-store";
import useGetSiteData from "@/hooks/use-get-sitedata";

const ContactPage = () => {
  const { contactData, isLoadingContactData } = useGetSiteData();

  const setAboutContent = useContactContentStore(
    (state) => state.setcontactContent
  );

  useEffect(() => {
    if (contactData && Object.keys(contactData).length > 0) {
      setAboutContent(contactData);
    }
  }, [contactData]);

  if (isLoadingContactData) {
    return <p className="text-center">Loading....</p>;
  }

  return (
    <>
      <div className="md:hidden">
        <ContactView />
      </div>
      <div className="hidden md:block">
        <ContactSection />
      </div>
    </>
  );
};

export default ContactPage;
