import { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import { Button } from "@mui/material";
import type { TransportOrder } from "@/types/TransportOrder";
import type { Driver } from "@/types/Driver";
import { updateTransportOrders } from "@/services/transportOrderService";
import { getDrivers } from "@/services/driverService";

interface EditTransportOrderModalProps {
  open: boolean;
  onClose: () => void;
  formData: TransportOrder | null;
  onSaved: () => void;
}

export default function EditTransportOrderModal({
  open,
  onClose,
  formData,
  onSaved,
}: EditTransportOrderModalProps) {
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
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    if (open) {
      getDrivers().then(({ data }) => {
        setDrivers(data.data);
      });
      if (formData) {
        const scheduledDate = formData.scheduled_date?.split(" ")[0] || "";
        setTransportOrder({ ...formData, scheduled_date: scheduledDate });
      }
    }
  }, [open, formData]);

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

  const handleSubmit = async () => {
    if (!transportOrder.id) {
      console.error("ID da ordem de transporte não encontrado");
      return;
    }

    try {
      const dataToSubmit = {
        driver_id: transportOrder.driver_id,
        origin_address: transportOrder.origin_address,
        destination_address: transportOrder.destination_address,
        cargo_description: transportOrder.cargo_description,
        weight_kg: transportOrder.weight_kg,
        status: transportOrder.status,
        scheduled_date: transportOrder.scheduled_date,
        notes: transportOrder.notes,
      };

      console.log("Enviando dados:", {
        id: transportOrder.id,
        ...dataToSubmit,
      });

      const response = await updateTransportOrders({
        ...transportOrder,
        ...dataToSubmit,
      });

      console.log("Resposta do servidor:", response);

      onSaved();
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar ordem de transporte:", err);
      if (err instanceof Error) {
        console.error("Mensagem de erro:", err.message);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="min-w-xl">
        <div>
          <h2 className="text-xl font-semibold mb-1">
            Editar Ordem de Transporte
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Preencha os dados da ordem de transporte
          </p>
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-200px)] px-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Número da Ordem</label>
            <input
              type="text"
              value={transportOrder.order_number}
              disabled
              className="border border-gray-500 rounded-lg p-2 text-sm bg-gray-100 text-gray-600 cursor-not-allowed"
              placeholder="OT-2026-0001"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Motorista</label>
            <select
              name="driver_id"
              value={transportOrder.driver_id}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg p-2 text-sm"
            >
              <option value={0}>Selecione um motorista</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={transportOrder.driver_id || 0}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Carga</label>
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
              <label className="text-sm font-medium">Origem</label>
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
              <label className="text-sm font-medium">Destino</label>
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
              <label className="text-sm font-medium">Data Agendada</label>
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
