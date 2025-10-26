import { createContext, useState } from "react";

const DropdownContext = createContext();

function DropdownProvider({ children }) {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };

  const values = { show, setShow, toggle };

  return (
    <DropdownContext.Provider value={values}>
      {children}
    </DropdownContext.Provider>
  );
}

export { DropdownProvider, DropdownContext };
