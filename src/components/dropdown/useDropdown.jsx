import { useContext } from "react";
import { DropdownContext } from "./DropdownProvider";

function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined") {
    throw new Error("useDropdown must be used within DropdownProvider");
  }
  return context;
}

export default useDropdown;
