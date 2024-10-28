/* eslint-disable */

import { Capsule } from "@/types";

const baseUrl = "https://api.spacexdata.com/v4/";

export interface CapsulesResponse {
  id: string;
  launches: Array<string>;
  serial: string;
  status: Capsule["status"];
  type: string;
}

export interface LaunchesResponse {
  date_unix: number;
  date_utc: string;
  date_local: string;
}

export const fetchCapsules = async (): Promise<CapsulesResponse[]> => {
  const response = await fetch(`${baseUrl}capsules`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchLaunch = async (
  flightNo: string
): Promise<LaunchesResponse> => {
  try {
    const response = await fetch(`${baseUrl}launches/${flightNo}`);
    if (!response.ok)
      return {
        date_local: "",
        date_unix: 0,
        date_utc: "",
      };
    return response.json();
  } catch (error) {
    error;
    return {
      date_local: "",
      date_unix: 0,
      date_utc: "",
    };
  }
};
