"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import LightBulb from "@/components/ui/LightBulb";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { getLightData, Light, patchLightData } from "@/redux/slice/light/light";

const Dashboard = () => {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [formatButton, setFormatButton] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const router = useRouter();

  const formatClick = (f: boolean) => {
    setFormatButton(f);
  };
  const dispatch: AppDispatch = useDispatch();

  const lightsData = useSelector((state: RootState) => state.lights.lights);
  const [allLightData, setAllLightData] = useState<Light[]>([]);
  useEffect(() => {
    dispatch(getLightData());
  }, [dispatch]);

  useEffect(() => {
    setAllLightData(lightsData);
  }, [lightsData]);

  const handleButtonClick = (i: number) => {
    const clickedLight: any = allLightData.find((light) => light.id == i);
    if (clickedLight.status === "on") {
      dispatch(patchLightData({ id: i, newData: { status: "off" } }));
      setAllLightData(
        allLightData.map((light) =>
          light.id === i ? { ...light, status: "off" } : light
        )
      );
    } else {
      dispatch(patchLightData({ id: i, newData: { status: "on" } }));
      setAllLightData(
        allLightData.map((light) =>
          light.id === i ? { ...light, status: "on" } : light
        )
      );
    }
  };

  const halfIndex = Math.ceil(allLightData.length / 2);
  const firstHalf = allLightData.slice(0, halfIndex);
  const secondHalf = allLightData.slice(halfIndex);


  console.log(allLightData);

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
                  e.stopPropagation();
                  router.push(
                    "https://platform.maket.ai/shared/floorplan-designs/YYt1bQuRML"
                  );
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
              {firstHalf?.map((light: Light) => (
                <button
                  key={light.id}
                  className={`${styles["light_btn"]} ${
                    hoveredButton === light.id ? styles["hover"] : ""
                  } ${light.status === "on" ? styles["active"] : ""}`}
                  onMouseEnter={() => setHoveredButton(light.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => handleButtonClick(light.id)}
                >
                  <LightBulb
                    hover={hoveredButton === light.id}
                    active={light.status === "on"}
                  />
                </button>
              ))}
            </div>
            <div
              className={`${styles["light_btns_sides"]} ${
                formatButton && styles["plan3"]
              }`}
            >
              {secondHalf?.map((light: Light) => (
                <button
                  key={light.id}
                  className={`${styles["light_btn"]} ${
                    hoveredButton === light.id ? styles["hover"] : ""
                  } ${light.status === "on" ? styles["active"] : ""}`}
                  onMouseEnter={() => setHoveredButton(light.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => handleButtonClick(light.id)}
                >
                  <LightBulb
                    hover={hoveredButton === light.id}
                    active={light.status === "on"}
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
