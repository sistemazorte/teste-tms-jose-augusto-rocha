import axiosClient from "@/api/axios-client";
import type { Driver } from "@/types/Driver";

export const getDrivers = () => {
  return axiosClient.get("/drivers");
};

export const updateDriver = (driver: Driver) => {
  return axiosClient.put(`/drivers/${driver.id}`, driver);
};

export const toggleDriverStatus = (driverId: number) => {
  return axiosClient.patch(`/drivers/${driverId}/toggle-active`);
};

export const createDriver = (driver: Driver) => {
  return axiosClient.post("/drivers", driver);
};

export const deleteDriver = (id: number) => {
  return axiosClient.delete(`/drivers/${id}`);
};
