import { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import type { Driver } from "../../../types/Driver";
import axiosClient from "@/api/axios-client";
import { Button } from "@mui/material";
import { updateDriver } from "@/services/driverService";

interface NewDriverModalProps {
  open: boolean;
  onClose: () => void;
  formData: Driver | null;
  onSaved: () => void;
}

export default function EditDriverModal({
  open,
  onClose,
  formData,
  onSaved,
}: NewDriverModalProps) {
  const [driver, setDriver] = useState<Driver>({
    id: null,
    name: "",
    cpf: "",
    cnh_number: "",
    cnh_category: "",
    phone: "",
    is_active: true,
  });

  useEffect(() => {
    if (formData) {
      setDriver(formData);
    }
  }, [formData]);

  const handleSubmit = () => {
    if (!driver.id) return;
    axiosClient;
    updateDriver(driver)
      .then(() => {
        onSaved();
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setDriver((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="min-w-xl">
          <div>
            <h2 className="text-xl font-semibold mb-1">Editar Motorista</h2>

            <p className="text-sm text-gray-500 mb-3">
              Preencha os dados do motorista
            </p>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-200px)] px-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Nome *</label>
              <input
                type="text"
                placeholder="Nome Completo"
                name="name"
                value={driver.name}
                onChange={handleChange}
                className="border border-gray-500 rounded-lg p-2 text-sm"
              />
            </div>

            <div className="flex flex-row w-full gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium">CPF *</label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  name="cpf"
                  value={driver.cpf}
                  onChange={handleChange}
                  className="border border-gray-500 rounded-lg p-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium">Telefone</label>
                <input
                  type="text"
                  placeholder="(00) 0000-0000"
                  name="phone"
                  value={driver.phone}
                  onChange={handleChange}
                  className="border border-gray-500 rounded-lg p-2 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-row w-full gap-4">
              <div className="flex flex-col gap-1 flex-1 max-w-68">
                <label className="text-sm font-medium">Número CNH *</label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  name="cnh_number"
                  value={driver.cnh_number}
                  onChange={handleChange}
                  className="border border-gray-500 rounded-lg p-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Categoria CNH *</label>
                <select
                  name="cnh_category"
                  value={driver.cnh_category}
                  onChange={handleChange}
                  className="border border-gray-500 rounded-lg p-2 max-w-24"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button color="error" variant="contained" onClick={onClose}>
                Cancelar
              </Button>

              <Button
                color="success"
                variant="contained"
                onClick={handleSubmit}
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
