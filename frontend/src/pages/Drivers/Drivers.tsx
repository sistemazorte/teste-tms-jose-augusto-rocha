import { useEffect, useState } from "react";
import axiosClient from "../../api/axios-client";
import NewDriverModal from "../../components/DriverModals/NewDriverModal/NewDriverModal";
import { Button } from "@mui/material";
import type { Driver } from "../../types/Driver";
import { Plus } from "lucide-react";
import { columns } from "../../components/DriverTable/columns";
import { DriverTable } from "@/components/DriverTable/DriverTable";
import EditDriverModal from "@/components/DriverModals/EditDriverModal/EditDriverModal";
import {
  getDrivers as fetchDrivers,
  toggleDriverStatus,
} from "../../services/driverService";
import Modal from "@/components/Modal/Modal";
export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [editDriverOpen, setEditDriverOpen] = useState<boolean>(false);
  const [updateDriverStatusOpen, setUpdateDriverStatusOpen] =
    useState<boolean>(false);

  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [newDriverOpen, setNewDriverOpen] = useState<boolean>(false);

  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = () => {
    axiosClient;
    fetchDrivers().then(({ data }) => {
      console.log(data);
      setDrivers(data.data);
    });
  };

  const handleSubmit = () => {
    if (!selectedDriver?.id) return;
    axiosClient;
    toggleDriverStatus(selectedDriver?.id)
      .then(() => {
        getDrivers();
        setUpdateDriverStatusOpen(false);
      })
      .catch((err) => {
        console.error(err);
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

      <div className="bg-white p-8 rounded-2xl my-5">
        <DriverTable
          columns={columns(
            setEditDriverOpen,
            setUpdateDriverStatusOpen,
            setSelectedDriver,
          )}
          data={drivers}
        />
      </div>

      <NewDriverModal
        open={newDriverOpen}
        onClose={() => setNewDriverOpen(false)}
        onSaved={getDrivers}
      />
      <EditDriverModal
        open={editDriverOpen}
        formData={selectedDriver}
        onClose={() => setEditDriverOpen(false)}
        onSaved={getDrivers}
      />

      <Modal
        open={updateDriverStatusOpen}
        onClose={() => setUpdateDriverStatusOpen(false)}
      >
        <div className="max-w-80">
          {selectedDriver?.is_active ? (
            <div>
              Você deseja realmente tornar o usuário(a){" "}
              <strong>{`${selectedDriver?.name}`}</strong> inativo?
            </div>
          ) : (
            <div>
              Você deseja realmente tornar o usuário(a){" "}
              <strong>{`${selectedDriver?.name}`}</strong> ativo?
            </div>
          )}
          <div className="flex justify-center gap-3 mt-6">
            <Button color="success" variant="contained" onClick={handleSubmit}>
              Confirmar
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => setUpdateDriverStatusOpen(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
