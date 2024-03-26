import React from "react";

import { Navbarbefore } from "./Navbarbefore";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <Navbarbefore />
      </header>
      {children}
    </div>
  );
};

export default Layout;
