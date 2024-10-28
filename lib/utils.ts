import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as Yup from "yup";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capsuleSchema = Yup.object().shape({
  serial: Yup.string().required("Capsule ID is required"),
  launchDate: Yup.string().required("Launch date is required"),
  status: Yup.string().required("Status is required"),
  type: Yup.string().required("Type is required"),
});
