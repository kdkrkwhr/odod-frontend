import { useEffect, useState } from "react";
import * as Location from "expo-location";

export const useGPS = (interval?: number) => {
  const [updateInterval, setUpdateInterval] = useState<number>(interval || 3000);
  const [region, setRegion] = useState<any>(undefined);
  const [positionText, setPositionText] = useState<string>("Waiting...");
  const [marks, setMarks] = useState<MarkObject[]>([]);

  useEffect(() => {
    (async () => {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission || permission.status !== "granted") {
        setPositionText("Permission denied.");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    const timeout = setInterval(updateLocation, updateInterval);

    return () => {
      clearInterval(timeout);
    };
  }, [updateInterval]);

  const increateInterval = () => {
    setUpdateInterval(updateInterval + 500);
    updatePositionText();
  };

  const decreateInterval = () => {
    setUpdateInterval(Math.max(updateInterval - 500, 500));
    updatePositionText();
  };

  const updateLocation = async () => {
    const {
      coords: { latitude, longitude },
    } = await getLocation();
    focusCurrentPosition(latitude, longitude); // 맵 이동
    updatePositionData(latitude, longitude); // 포지션 업데이트 , 마커 찍기
  };

  const getLocation = async () =>
    await Location.getCurrentPositionAsync({ accuracy: 6 });

  const focusCurrentPosition = (latitude: number, longitude: number) => {
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.001 * 10,
      longitudeDelta: 0.0008 * 10,
    });
  };
  const updatePositionData = (latitude: number, longitude: number) => {
    marks.push({
      coordinate: { latitude, longitude },
      title: String(marks.length),
      description: String(marks.length),
    });
    // alert("marks length " + _marks.length);
    setMarks([...marks]);
    updatePositionText();
  };

  const updatePositionText = () => {
    if (!marks.length) return;

    setPositionText(
      `count: ${marks.length}  ` +
        `interval: ${updateInterval / 1000} sec\n` +
        `latitude: ${
          Math.round(marks[marks.length - 1].coordinate.latitude * 100) / 100
        }  ` +
        `longitude: ${
          Math.round(marks[marks.length - 1].coordinate.longitude * 100) / 100
        }`
    );
  };

  return {
    setPositionText,
    updateLocation,
    marks,
    positionText,
    increateInterval,
    decreateInterval,
    region,
  };
};

export type MarkObject = {
  coordinate: { latitude: number; longitude: number };
  title: String;
  description: String;
};
