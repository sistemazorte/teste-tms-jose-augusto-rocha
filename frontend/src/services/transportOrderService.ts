import axiosClient from "@/api/axios-client";
import type { NewTransportOrderData } from "@/types/NewTransportOrder";
import type { TransportOrder } from "@/types/TransportOrder";

export const getTransportOrders = () => {
  return axiosClient.get("/transport-orders");
};

export const updateTransportOrders = (transportOrder: TransportOrder) => {
  return axiosClient.put(
    `/transport-orders/${transportOrder.id}`,
    transportOrder,
  );
};

export const updateTransportOrderStatus = (
  transportOrderId: number,
  nextStatus: string,
) => {
  return axiosClient.patch(
    `/transport-orders/${transportOrderId}/update-status`,
    {
      status: nextStatus,
    },
  );
};

export const createTransportOrders = (
  transportOrder: NewTransportOrderData,
) => {
  return axiosClient.post("/transport-orders", transportOrder);
};

export const deleteTransportOrders = (id: number) => {
  return axiosClient.delete(`/transport-orders/${id}`);
};
