"use client";
import React, { useState } from "react";
import styles from "./style.module.scss";
import LightBulb from "@/components/ui/LightBulb";

const light_btns_left: number = 8;
const light_btns_right: number = 8;

const Dashboard = () => {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [activeButtons, setActiveButtons] = useState<number[]>([]);
  const handleButtonClick = (i: number) => {
    if (activeButtons.includes(i)) {
      setActiveButtons(activeButtons.filter((btn) => btn !== i));
    } else {
      setActiveButtons([...activeButtons, i]);
    }
  };
  return (
    <div id={styles["dashboard"]}>
      <div className="container">
        <div className={styles["floor_plan"]}>
          <img src={"/images/floorplan.png"} alt="floor plan" />
          <div className={styles["light_btns"]}>
            <div className={styles["light_btns_sides"]}>
              {Array.from({ length: light_btns_left }, (_, i) => (
                <button
                  key={i}
                  className={`${styles["light_btn"]} ${
                    hoveredButton === i ? styles["hover"] : ""
                  } ${activeButtons.includes(i) ? styles["active"] : ""}`}
                  onMouseEnter={() => setHoveredButton(i)}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => handleButtonClick(i)}
                >
                  <LightBulb
                    hover={hoveredButton === i}
                    active={activeButtons.includes(i)}
                  />
                </button>
              ))}
            </div>
            <div className={styles["light_btns_sides"]}>
              {Array.from({ length: light_btns_right }, (_, i) => (
                <button
                  key={i + light_btns_left}
                  className={`${styles["light_btn"]} ${
                    hoveredButton === i + light_btns_left
                      ? styles["hover"]
                      : ""
                  } ${
                    activeButtons.includes(i + light_btns_left)  ? styles["active"] : ""
                  }`}
                  onMouseEnter={() => setHoveredButton(i + light_btns_left)}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => handleButtonClick(i + light_btns_left)}
                >
                  <LightBulb
                    hover={hoveredButton === i + light_btns_left}
                    active={activeButtons.includes(i + light_btns_left)}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
