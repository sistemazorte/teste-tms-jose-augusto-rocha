"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TransportOrder } from "@/types/TransportOrder";

export const columns = (): ColumnDef<TransportOrder>[] => [
  {
    accessorKey: "order_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Número
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "driver_name",
    header: "Motorista",
  },
  {
    accessorKey: "cargo_description",
    header: "Carga",
    cell: ({ row }) => {
      return row.original.cargo_description
        ? row.original.cargo_description
        : "Não informado";
    },
  },
  {
    id: "route",
    header: "Origem / Destino",
    cell: ({ row }) => {
      const { origin_address, destination_address } = row.original;
      return (
        <div className="flex flex-col">
          <span className="">{origin_address}</span>
          <span className="">{destination_address}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusMap: Record<string, { label: string; className: string }> = {
        pending: {
          label: "Pendente",
          className: "bg-yellow-100 text-yellow-400 border border-yellow-300",
        },
        collecting: {
          label: "Em Coleta",
          className: "bg-blue-100 text-blue-400 border border-blue-300",
        },
        collected: {
          label: "Coletado",
          className: "bg-gray-100 text-gray-400 border border-gray-300",
        },
        delivering: {
          label: "Em Entrega",
          className: "bg-purple-100 text-purple-400 border border-purple-300",
        },
        delivered: {
          label: "Entregue",
          className: "bg-green-100 text-green-600 border border-green-300",
        },
      };

      const status = statusMap[row.original.status];

      return (
        <span className={`px-2 py-1 rounded ${status?.className}`}>
          {status?.label || "Desconhecido"}
        </span>
      );
    },
  },
  {
    accessorKey: "weight_kg",
    header: "Peso (kg)",
  },
  {
    accessorKey: "scheduled_date",
    header: "Data",
    cell: ({ row }) => {
      const date = new Date(row.original.scheduled_date);
      return date.toLocaleDateString("pt-BR");
    },
  },
];
