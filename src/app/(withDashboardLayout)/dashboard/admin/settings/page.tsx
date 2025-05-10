"use client";
import { useState } from "react";

import ChangePassword from "./notifications/ChangePassword";
import BannerSlider from "./notifications/Notification";
import ScrollReveal from "./notifications/Scroll";
import ToggleSlide from "./notifications/ToggleSlide";
import TwoSideScrollReveal from "./notifications/SlideIn";
import Tabs from "./notifications/Tabs";

const Settings = () => {
  const [active, setActive] = useState("notifications");
  return (
    <div>
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-5 md:col-span-5">
          <Tabs active={active} setActive={setActive}></Tabs>
        </div>
        <div className="col-span-5 md:col-span-5">
          {active == "password" && <ChangePassword></ChangePassword>}
          {active == "notifications" && <BannerSlider></BannerSlider>}
        </div>
      </div>
      <ToggleSlide></ToggleSlide>
      <ScrollReveal></ScrollReveal>
      <TwoSideScrollReveal></TwoSideScrollReveal>
    </div>
  );
};

export default Settings;
