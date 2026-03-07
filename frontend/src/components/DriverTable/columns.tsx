"use client";

import type { Driver } from "@/types/Driver";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  IdCardLanyard,
  Pencil,
  UserCheck,
  UserX,
} from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = (
  setEditDriverOpen: (open: boolean) => void,
  setUpdateDriverStatusOpen: (open: boolean) => void,
  setSelectedDriver: (driver: Driver) => void,
): ColumnDef<Driver>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "cnh_number",
    header: "CNH",
  },
  {
    accessorKey: "cnh_category",
    header: "Category",
    cell: ({ row }) => {
      return (
        <span className="border border-gray-400  px-2 py-0.5 rounded">
          {row.original.cnh_category}
        </span>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      return row.original.phone ? row.original.phone : "Não informado";
    },
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      return row.original.is_active ? (
        <span className="bg-green-200 text-green-600 border border-green-300  px-2 py-1 rounded">
          Ativo
        </span>
      ) : (
        <span className="bg-red-200 text-red-600 border border-red-300  px-2 py-1 rounded">
          Inativo
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const driver = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-white rounded-md shadow-lg border-0 p-2 min-w-50 animate-in fade-in-80 slide-in-from-top-2"
            align="end"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-gray-400 text-sm">
                Ações
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(
                    driver.id ? driver.id.toString() : "Id não especificado",
                  )
                }
              >
                <div className="flex items-center gap-2">
                  <div>
                    <IdCardLanyard />
                  </div>
                  <div>Copiar id do motorista</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedDriver(driver);
                  setEditDriverOpen(true);
                }}
              >
                <div className="flex items-center gap-2">
                  <div>
                    <Pencil />
                  </div>
                  <div>Editar motorista</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedDriver(driver);
                  setUpdateDriverStatusOpen(true);
                }}
              >
                {driver.is_active ? (
                  <div className="flex items-center gap-2">
                    <div>
                      <UserX />
                    </div>
                    <div>Tornar inativo</div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div>
                      <UserCheck />
                    </div>
                    <div>Tornar Ativo</div>
                  </div>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
