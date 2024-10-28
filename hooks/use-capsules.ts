import { fetchCapsules, fetchLaunch } from "@/lib/api";
import { type RootState } from "@/stores";
import { setCapsules } from "@/stores/slices/capsules-slice";
import { Capsule } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useCapsules = () => {
  const dispatch = useDispatch();
  const localCapsulesState = useSelector((state: RootState) => state.capsules);

  const {
    isLoading: isCapsulesLoading,
    isError: isCapsulesError,
    error: capsulesError,
    data: capsules,
  } = useQuery({
    queryKey: ["capsules"],
    queryFn: fetchCapsules,
  });

  const {
    isLoading: isLaunchesLoading,
    isError: isLaunchesError,
    error: launchesError,
    data: launches,
  } = useQuery({
    queryKey: ["launches", capsules],
    queryFn: () => {
      if (!capsules) return [];
      const launchesPromises = capsules.map((capsule) =>
        fetchLaunch(capsule.launches[0])
      );
      return Promise.all(launchesPromises);
    },
    enabled: !!capsules,
  });

  const isLoading = isCapsulesLoading || isLaunchesLoading;
  const isError = isCapsulesError || isLaunchesError;
  const error = capsulesError || launchesError;

  const data = useMemo(() => {
    if (!capsules || !launches) return [];
    return capsules.map<Capsule>((capsule, idx) => {
      const date = launches[idx].date_utc;
      let formattedDate = "";
      if (!!date) formattedDate = format(new Date(date), "yyyy-MM-dd");
      return {
        id: capsule.id,
        serial: capsule.serial,
        launchDate: formattedDate,
        status: capsule.status,
        type: capsule.type,
      };
    });
  }, [capsules, launches]);

  useEffect(() => {
    dispatch(setCapsules(data));
  }, [data, dispatch]);

  return { isLoading, isError, error, capsules: localCapsulesState.capsules };
};
