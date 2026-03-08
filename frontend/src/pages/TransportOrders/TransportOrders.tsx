import { useEffect, useState } from "react";
import axiosClient from "../../api/axios-client";
import { Button } from "@mui/material";
import { Plus } from "lucide-react";
import { columns } from "../../components/TransportOrderTable/columns";
import {
  deleteTransportOrders,
  getTransportOrders as fetchTransportOrders,
  updateTransportOrderStatus,
} from "../../services/transportOrderService";
import Modal from "@/components/Modal/Modal";
import type { TransportOrder } from "@/types/TransportOrder";
import type { Status } from "@/types/Status";
import { TransportOrdersTable } from "@/components/TransportOrderTable/TransportOrderTable";
import EditTransportOrderModal from "@/components/TransportOrderModals/EditTransportOrderModal/EditTransportOrderModal";
import NewTransportOrderModal from "@/components/TransportOrderModals/NewTransportOrderModal/NewTransportOrderModal";
export default function TransportOrders() {
  const [transportOrders, setTransportOrders] = useState<TransportOrder[]>([]);
  const [editTransportOrderOpen, setEditTransportOrderOpen] = useState(false);
  const [_, setUpdateTransportOrderStatusOpen] = useState(false);
  const [selectedTransportOrder, setSelectedTransportOrder] =
    useState<TransportOrder | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newTransportOrderOpen, setNewTransportOrderOpen] = useState(false);

  const getTransportOrders = () => {
    axiosClient;
    fetchTransportOrders().then(({ data }) => {
      console.log(data);
      setTransportOrders(data.data);
    });
  };

  useEffect(() => {
    getTransportOrders();
  }, []);

  const handleAdvanceStatus = async (id: number, nextStatus: Status) => {
    try {
      await updateTransportOrderStatus(id, nextStatus);
      await getTransportOrders();
    } catch (err) {
      console.error("Erro ao dar update na ordem de transporte:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTransportOrders(id);
      setTransportOrders((prev) => prev.filter((o) => o.id !== id));
      setSelectedTransportOrder(null);
    } catch (err) {
      console.error("Erro ao deletar ordem de transporte:", err);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-3xl">Ordens de transporte</h1>
          <p>Gerenciar ordens de transporte cadastradas</p>
        </div>
        <Button
          color="success"
          variant="contained"
          startIcon={<Plus />}
          onClick={() => setNewTransportOrderOpen(true)}
        >
          Nova ordem
        </Button>
      </div>
      <div className="bg-white p-8 rounded-2xl my-5 shadow-md">
        <TransportOrdersTable
          columns={columns(
            setEditTransportOrderOpen,
            setUpdateTransportOrderStatusOpen,
            setSelectedTransportOrder,
            handleAdvanceStatus,
            setDeleteModalOpen,
          )}
          data={transportOrders}
        />
      </div>

      <NewTransportOrderModal
        open={newTransportOrderOpen}
        onClose={() => setNewTransportOrderOpen(false)}
        onSaved={getTransportOrders}
      />
      <EditTransportOrderModal
        open={editTransportOrderOpen}
        formData={selectedTransportOrder}
        onClose={() => setEditTransportOrderOpen(false)}
        onSaved={() => {
          getTransportOrders();
          setEditTransportOrderOpen(false);
        }}
      />

      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <div className="max-w-80">
          <div>
            Você deseja excluir a ordem de transporte{" "}
            <strong>{`${selectedTransportOrder?.order_number}`}</strong>?
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <Button
              color="success"
              variant="contained"
              onClick={async () => {
                if (selectedTransportOrder?.id) {
                  await handleDelete(selectedTransportOrder.id);
                  setDeleteModalOpen(false);
                }
              }}
            >
              Confirmar
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
