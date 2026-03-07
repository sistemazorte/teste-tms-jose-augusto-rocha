import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axios-client";
import Modal from "../../components/Modal/Modal";
import NewDriverModal from "../../components/DriverModals/NewDriverModal/NewDriverModal";
import { Button, IconButton } from "@mui/material";
import type { Driver } from "../../types/Driver";
import { Link } from "react-router-dom";
import {
  CircleCheck,
  CircleX,
  Pencil,
  Plus,
  UserCheck,
  UserRoundCheck,
  UserRoundX,
  UserX,
} from "lucide-react";

export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const [newDriverOpen, setNewDriverOpen] = useState(false);

  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = () => {
    setLoading(true);
    axiosClient
      .get("/drivers")
      .then(({ data }) => {
        setLoading(false);
        console.log(data);
        setDrivers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-3xl">Motoristas</h1>
          <p>Gerenciar motoristas cadastrados</p>
        </div>
        <Button
          color="success"
          variant="contained"
          startIcon=<Plus />
          onClick={() => setNewDriverOpen(true)}
        >
          Novo motorista
        </Button>
      </div>
      <div className="">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>CNH</th>
              <th>Categoria</th>
              <th>Telefone</th>
              <th>Status</th>
              <th className="flex justify-end">Ações</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver: Driver) => (
              <tr>
                <td>{driver.id}</td>
                <td>{driver.name}</td>
                <td>{driver.cpf}</td>
                <td>{driver.cnh_number}</td>
                <td>
                  {
                    <span className="border border-black  px-2 py-1 rounded">
                      {driver.cnh_category}
                    </span>
                  }
                </td>
                <td>{driver.phone}</td>
                <td>
                  {driver.is_active ? (
                    <span className="bg-green-300 text-green-600  px-2 py-1 rounded">
                      Ativo
                    </span>
                  ) : (
                    <span className="bg-red-300 text-red-600  px-2 py-1 rounded">
                      Inativo
                    </span>
                  )}
                </td>
                <td className="flex justify-end">
                  <IconButton>
                    <Pencil />
                  </IconButton>
                  <IconButton
                    color={`${driver.is_active ? "success" : "error"}`}
                  >
                    {driver.is_active ? <UserCheck /> : <UserX />}
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NewDriverModal
        open={newDriverOpen}
        onClose={() => setNewDriverOpen(false)}
      />
    </>
  );
}
