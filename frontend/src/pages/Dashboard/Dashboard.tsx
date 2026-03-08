import { columns } from "@/components/TransportOrderTableDashboard/columns";
import { TransportOrdersTableDashboard } from "@/components/TransportOrderTableDashboard/TransportOrderTableDashboard";
import { useEffect, useState } from "react";
import { getTransportOrders as fetchTransportOrders } from "../../services/transportOrderService";
import { getDrivers as fetchDrivers } from "../../services/driverService";

import axiosClient from "@/api/axios-client";
import type { TransportOrder } from "@/types/TransportOrder";
import { Card } from "@mui/material";
import {
  CircleCheckBig,
  ClipboardList,
  Clock,
  Truck,
  Users,
} from "lucide-react";
import type { Driver } from "@/types/Driver";
export default function Dashboard() {
  const [transportOrders, setTransportOrders] = useState<TransportOrder[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  useEffect(() => {
    getTransportOrders();
    getDrivers();
  }, []);

  const getTransportOrders = () => {
    axiosClient;
    fetchTransportOrders().then(({ data }) => {
      setTransportOrders(data.data);
    });
  };

  const getDrivers = () => {
    axiosClient;
    fetchDrivers().then(({ data }) => {
      setDrivers(data.data);
    });
  };

  return (
    <>
      <div>
        <h1 className="text-3xl">Dashboard</h1>
        <p>Visao geral do sistema de transporte</p>
      </div>

      <div
        className="grid gap-6 mt-5 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4 
                xl:grid-cols-5"
      >
        <Card
          sx={{
            borderRadius: 4,
            p: 3,
          }}
        >
          <div className="flex justify-between">
            <div>Total de ordens</div>
            <ClipboardList />
          </div>
          <div className="text-5xl font-semibold mt-4">
            {transportOrders.length}
          </div>
        </Card>
        <Card
          sx={{
            borderRadius: 4,
            p: 3,
          }}
        >
          <div className="flex justify-between">
            <div>Pendentes</div>
            <Clock />
          </div>
          <div className="text-5xl font-semibold mt-4">
            {
              transportOrders.filter((order) => order.status === "pending")
                .length
            }
          </div>
        </Card>
        <Card
          sx={{
            borderRadius: 4,
            p: 3,
          }}
        >
          <div className="flex justify-between">
            <div>Em andamento</div>
            <Truck />
          </div>
          <div className="text-5xl font-semibold mt-4">
            {
              transportOrders.filter((order) => order.status === "delivering")
                .length
            }
          </div>
        </Card>
        <Card
          sx={{
            borderRadius: 4,
            p: 3,
          }}
        >
          <div className="flex justify-between">
            <div>Entregues</div>
            <CircleCheckBig />
          </div>
          <div className="text-5xl font-semibold mt-4">
            {
              transportOrders.filter((order) => order.status === "delivered")
                .length
            }
          </div>
        </Card>
        <Card
          sx={{
            borderRadius: 4,
            p: 3,
          }}
        >
          <div className="flex justify-between">
            <div>Motoristas Ativos</div>
            <Users />
          </div>
          <div className="text-5xl font-semibold mt-4">
            {drivers.filter((driver) => driver.is_active).length}
          </div>
        </Card>
      </div>
      <div className="bg-white p-8 rounded-2xl my-5 shadow-md">
        <TransportOrdersTableDashboard
          columns={columns()}
          data={transportOrders}
        />
      </div>
    </>
  );
}
