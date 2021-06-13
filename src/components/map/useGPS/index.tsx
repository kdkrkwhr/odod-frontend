import { useEffect, useState } from "react";
import * as Location from "expo-location";

import useInterval from './useInterval';
import useTimer from './useTimer';

export const useGPS = () => {
  const Interval = useInterval();
  const Timer = useTimer();
  const [region, setRegion] = useState<any>(undefined);
  const [permissionStatus, setPermissionStatus] = useState<string>('waiting');
  const [summarizedData, setSummarizedData] = useState<string>("Waiting...");
  const [marks, setMarks] = useState<MarkObject[]>([]);

  //get permission status update events
  useEffect(() => {
    console.log('update interval or permissionStatus: ', Interval.interval, permissionStatus);
    updatePositionText();
  }, [permissionStatus]);

  //get location update event
  useEffect(() => {
    if (region === undefined) return;
    if (marks.length && marks[marks.length - 1].timestamp === region.timestamp)
      return;
    setMarks([...marks, {
      coordinate: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
      accuracy: region.accuracy,
      timestamp: region.timestamp,
      title: String(marks.length),
      description: String(region.timestamp),
    }]);
  }, [region]);

  //get mark list update event
  useEffect(() => {
    console.log('update mark list: ', marks.length);
    updatePositionText();
  }, [marks]);

  //get interval to update events
  useEffect(() => {
    console.log('update changed interval: ', Interval.interval,
    permissionStatus);
    if (permissionStatus === 'granted') {
      resetRegularLocationUpdater();
    }
    updatePositionText();
    return () => {
      Timer.clear();
    }
  }, [Interval.interval, permissionStatus]);

  //get permission
  useEffect(() => {
    (async () => {
      const permission = await Location.requestForegroundPermissionsAsync();
      console.log('get permission: ', permission.status);
      if (!permission || permission.status !== "granted")
        setPermissionStatus('denied');
      else setPermissionStatus('granted');
    })();
  }, []);

  const resetRegularLocationUpdater = async () => {
    await Timer.run(Interval.interval);
    setLocation(await getLocation());
    resetRegularLocationUpdater();
  }
  const getLocation = async () =>
    await Location.getCurrentPositionAsync({ accuracy: 6 });
  const setLocation = ({
    coords: { accuracy, latitude, longitude },
    timestamp
  }: {
    coords: {
      accuracy: number | null,
      latitude: number,
      longitude: number
    },
    timestamp: number,
  }) => {
    setRegion({
      latitude, longitude,
      accuracy: accuracy === null ? Infinity : accuracy,
      timestamp,
      latitudeDelta: 0.001 * 10,
      longitudeDelta: 0.0008 * 10,
    });
  }

  const updatePositionText = () => {
    console.log('update position text', Interval.interval, permissionStatus);
    if (permissionStatus !== 'granted') {
      setSummarizedData(
        `status: ${permissionStatus}\n` +
        `interval: ${Interval.interval / 1000} sec`
      );
    }
    else if (marks.length) {
      setSummarizedData(
        `status: ${permissionStatus}\n` +
        `count: ${marks.length}  ` +
        `interval: ${Interval.interval / 1000} sec\n` +
        `latitude: ${Math.round(marks[marks.length - 1].coordinate.latitude * 100) / 100
        }  ` +
        `longitude: ${Math.round(marks[marks.length - 1].coordinate.longitude * 100) / 100
        }`
      );
    }
    else {
      setSummarizedData(
        `status: ${permissionStatus}\n` +
        `count: ${marks.length}  ` +
        `interval: ${Interval.interval / 1000} sec\n`
      );
    }

  };

  return {
    marks,
    get summarizedData() { return summarizedData },
    get Interval() { return Interval },
    region,
  };
};

export type MarkObject = {
  coordinate: { latitude: number; longitude: number };
  accuracy: number;
  timestamp: number;
  title: String;
  description: String;
};
