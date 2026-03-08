import { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import { Button } from "@mui/material";
import type { TransportOrder } from "@/types/TransportOrder";
import type { Driver } from "@/types/Driver";
import { createTransportOrders } from "@/services/transportOrderService";
import { getDrivers } from "@/services/driverService";
import type { ValidationErrors } from "@/types/ValidationErrors";
import type { NewTransportOrderData } from "@/types/NewTransportOrder";

interface NewTransportOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function NewTransportOrderModal({
  open,
  onClose,
  onSaved,
}: NewTransportOrderModalProps) {
  const [errors, setErrors] = useState<ValidationErrors | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const [transportOrder, setTransportOrder] = useState<TransportOrder>({
    id: null,
    order_number: "",
    driver_id: 0,
    driver_name: "",
    cargo_description: "",
    origin_address: "",
    destination_address: "",
    scheduled_date: "",
    status: "pending",
    weight_kg: 0,
    notes: "",
  });

  useEffect(() => {
    if (open) {
      getDrivers().then(({ data }) => {
        setDrivers(data.data);
      });
      setTransportOrder({
        id: null,
        order_number: "",
        driver_id: 0,
        driver_name: "",
        cargo_description: "",
        origin_address: "",
        destination_address: "",
        scheduled_date: "",
        status: "pending",
        weight_kg: 0,
        notes: "",
      });
      setErrors(null);
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setTransportOrder((prev) => ({
      ...prev,
      [name]:
        name === "driver_id" || name === "weight_kg"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    if (
      !transportOrder.driver_id ||
      !transportOrder.origin_address.trim() ||
      !transportOrder.destination_address.trim() ||
      !transportOrder.cargo_description.trim() ||
      !transportOrder.scheduled_date
    ) {
      setErrors({
        form: ["Preencha todos os campos obrigatórios para continuar"],
      });
      return;
    }

    setErrors(null);

    const dataToSubmit: NewTransportOrderData = {
      driver_id: transportOrder.driver_id,
      origin_address: transportOrder.origin_address,
      destination_address: transportOrder.destination_address,
      cargo_description: transportOrder.cargo_description,
      weight_kg: transportOrder.weight_kg || undefined,
      scheduled_date: transportOrder.scheduled_date,
      notes: transportOrder.notes || undefined,
      status: "pending",
    };

    createTransportOrders(dataToSubmit)
      .then(() => {
        onSaved();
        onClose();
      })
      .catch((err) => {
        if (err.response && err.response.status === 422) {
          if (err.response.data.errors) {
            setErrors(err.response.data.errors);
            return;
          }
        }
        setErrors({
          form: ["Erro ao criar ordem de transporte. Tente novamente."],
        });
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="min-w-xl">
        <div>
          <h2 className="text-xl font-semibold mb-1">
            Nova Ordem de Transporte
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Preencha os dados da ordem de transporte
          </p>
          {errors && (
            <div className="p-3 bg-red-500 text-white rounded mb-3">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-200px)] px-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Motorista *</label>
            <select
              name="driver_id"
              value={transportOrder.driver_id}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg p-2 text-sm"
            >
              <option value={0}>Selecione um motorista</option>
              {drivers
                .filter((driver) => driver.is_active)
                .map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Carga *</label>
            <input
              type="text"
              name="cargo_description"
              value={transportOrder.cargo_description}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg p-2 text-sm"
              placeholder="Descrição da carga"
            />
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium">Origem *</label>
              <input
                type="text"
                name="origin_address"
                value={transportOrder.origin_address}
                onChange={handleChange}
                className="border border-gray-500 rounded-lg p-2 text-sm"
                placeholder="Endereço de origem"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium">Destino *</label>
              <input
                type="text"
                name="destination_address"
                value={transportOrder.destination_address}
                onChange={handleChange}
                className="border border-gray-500 rounded-lg p-2 text-sm"
                placeholder="Endereço de destino"
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Data Agendada *</label>
              <input
                type="date"
                name="scheduled_date"
                value={transportOrder.scheduled_date}
                onChange={handleChange}
                className="border border-gray-500 rounded-lg p-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Peso (kg)</label>
              <input
                type="number"
                name="weight_kg"
                value={transportOrder.weight_kg || ""}
                onChange={handleChange}
                className="border border-gray-500 rounded-lg p-2 text-sm"
                placeholder="Peso em kg"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Notas</label>
            <textarea
              name="notes"
              value={transportOrder.notes || ""}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg p-2 text-sm"
              placeholder="Observações adicionais"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button color="error" variant="contained" onClick={onClose}>
              Cancelar
            </Button>
            <Button color="success" variant="contained" onClick={handleSubmit}>
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
