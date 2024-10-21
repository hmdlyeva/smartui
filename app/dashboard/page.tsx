"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import LightBulb from "@/components/ui/LightBulb";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { getLightData, Light, patchLightData } from "@/redux/slice/light/light";
import { getWaterData, patchWaterData, Water } from "@/redux/slice/water/water";
import WaterIcon from "@/components/ui/WaterIcon";

const Dashboard = () => {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [hoveredWater, setHoveredWater] = useState<number | null>(null);
  const [formatButton, setFormatButton] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const router = useRouter();

  const formatClick = (f: boolean) => {
    setFormatButton(f);
  };
  const dispatch: AppDispatch = useDispatch();

  const lightsData = useSelector((state: RootState) => state.lights.lights);
  const watersData = useSelector((state: RootState) => state.waters.waters);
  const [allLightData, setAllLightData] = useState<Light[]>([]);
  const [allWaterData, setAllWaterData] = useState<Light[]>([]);
  useEffect(() => {
    dispatch(getLightData());
    dispatch(getWaterData());
  }, [dispatch]);

  useEffect(() => {
    setAllLightData(lightsData);
  }, [lightsData]);
  useEffect(() => {
    setAllWaterData(watersData);
  }, [watersData]);

  const handleButtonClick = (i: number) => {
    const clickedLight = allLightData.find((light) => light.id == i);
    if (clickedLight) {
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
  }
  };
  const handleWaterClick = (i: number) => {
    const clickedWater = allWaterData.find((water) => water.id == i);
    if (clickedWater) {
    if (clickedWater.status === "on") {
      dispatch(patchWaterData({ id: i, newData: { status: "off" } }));
      setAllWaterData(
        allWaterData.map((water) =>
          water.id === i ? { ...water, status: "off" } : water
        )
      );
    } else {
      dispatch(patchWaterData({ id: i, newData: { status: "on" } }));
      setAllWaterData(
        allWaterData.map((water) =>
          water.id === i ? { ...water, status: "on" } : water
        )
      );
    }
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
            className={styles["all_btns"]}
            style={{ left: formatButton ? "39%" : "36%" }}
          >
            <div
              className={styles["water_btns_sides"]}
              style={{
                top: formatButton ? "-54px" : "7px",
                left: formatButton ? "-8%" : "-5%",
              }}
            >
              {allWaterData?.map((water: Water) => (
                <button
                  key={water.id}
                  className={`${styles["water_btn"]} ${
                    hoveredWater === water.id ? styles["hover"] : ""
                  } ${water.status === "on" ? styles["active"] : ""}`}
                  onMouseEnter={() => setHoveredWater(water.id)}
                  onMouseLeave={() => setHoveredWater(null)}
                  onClick={() => handleWaterClick(water.id)}
                >
                  <WaterIcon
                    hover={hoveredWater === water.id}
                    active={water.status === "on"}
                  />
                </button>
              ))}
            </div>
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
