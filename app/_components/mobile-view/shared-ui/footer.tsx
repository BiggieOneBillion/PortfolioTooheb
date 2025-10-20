import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="h-20 text-black mt-10">
      <p className="font-medium text-center text-sm flex flex-col justify-center gap-4">
        <span>&copy; {date} Abuja Portrait House</span>
        <span className="text-black/50">All rights reserved.</span>
      </p>
    </footer>
  );
};

export default Footer;
