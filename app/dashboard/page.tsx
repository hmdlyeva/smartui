"use client";
import React, { useState } from "react";
import styles from "./style.module.scss";
import LightBulb from "@/components/ui/LightBulb";
import Link from "next/link";
import { useRouter } from "next/navigation";
const light_btns_left: number = 8;
const light_btns_right: number = 8;

const Dashboard = () => {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [activeButtons, setActiveButtons] = useState<number[]>([]);
  const [formatButton, setFormatButton] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const router = useRouter()
  const handleButtonClick = (i: number) => {
    if (activeButtons.includes(i)) {
      setActiveButtons(activeButtons.filter((btn) => btn !== i));
    } else {
      setActiveButtons([...activeButtons, i]);
    }
  };
  const formatClick = (f: boolean) => {
    setFormatButton(f);
  };

  return (
    <div id={styles["dashboard"]}>
      <div className="container">
        <div className={styles["floor_plan"]}>
          {activeModal && (
           
            <div
              className={styles["image_modal"]}
              onClick={() => setActiveModal(false)}
            >
                <img
                  src={"/images/mikroplan.png"}
                  alt="micro plan"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push("https://platform.maket.ai/shared/floorplan-designs/YYt1bQuRML")
                  }}
                />
            </div>
          )}

          {formatButton && (
            <div
              className={styles["micro_plan"]}
              onClick={() => setActiveModal(true)}
            >
              <img src={"/images/mikroplan.png"} alt="micro plan" />
            </div>
          )}

          <div className={styles["format_btns"]}>
            <button
              onClick={() => formatClick(false)}
              className={styles[`${!formatButton && "active"}`]}
            >
              2D
            </button>
            <button
              onClick={() => formatClick(true)}
              className={styles[`${formatButton && "active"}`]}
            >
              3D
            </button>
          </div>
          <img
            src={
              formatButton ? "/images/floorplan2.png" : "/images/floorplan.png"
            }
            alt="floor plan"
          />
          <div
            className={styles["light_btns"]}
            style={{ left: formatButton ? "40%" : "36%" }}
          >
            <div
              className={`${styles["light_btns_sides"]} ${
                formatButton && styles["plan2"]
              }`}
            >
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
            <div
              className={`${styles["light_btns_sides"]} ${
                formatButton && styles["plan3"]
              }`}
            >
              {Array.from({ length: light_btns_right }, (_, i) => (
                <button
                  key={i + light_btns_left}
                  className={`${styles["light_btn"]} ${
                    hoveredButton === i + light_btns_left ? styles["hover"] : ""
                  } ${
                    activeButtons.includes(i + light_btns_left)
                      ? styles["active"]
                      : ""
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
