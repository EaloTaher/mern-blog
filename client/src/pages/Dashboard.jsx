import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProflie from "../components/DashProflie";

export default function Dashboard() {
  //UseLocation Hook to know which tab we are in
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabfromUrl = urlParams.get("tab");
    if (tabfromUrl) {
      setTab(tabfromUrl);
    }
  }, [location.search]);
  return (
    <div className=" min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/*Side Bar */}
        <DashSidebar />
      </div>
      {/* Profile ..... */}
      {tab === "profile" && <DashProflie />}
    </div>
  );
}
