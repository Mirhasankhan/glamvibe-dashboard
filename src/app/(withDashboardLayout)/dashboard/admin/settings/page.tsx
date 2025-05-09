"use client";
import { useState } from "react";
import Tabs from "./notifications/Tabs";
import ChangePassword from "./notifications/ChangePassword";
import Notification from "./notifications/Notification";

const Settings = () => {
  const [active, setActive] = useState("password");
  return (
    <div className="grid grid-cols-5 gap-6">
      <div className="col-span-5 md:col-span-2">
        <Tabs active={active} setActive={setActive}></Tabs>
      </div>
      <div className="col-span-5 md:col-span-3">
        {active == "password" && <ChangePassword></ChangePassword>}
        {active == "notifications" && <Notification></Notification>}
      </div>
    </div>
  );
};

export default Settings;
