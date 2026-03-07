import type { ReactNode } from "react";
import Modal from "../../Modal/Modal";
import type { Driver } from "../../../types/Driver";

interface NewDriverModalProps {
  open: boolean;
  onClose: () => void;
  formData: Driver;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NewDriverModal({
  open,
  onClose,
  formData,
  onChange,
}: NewDriverModalProps) {
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="min-w-xl">
          <div>
            <h2 className="text-xl font-semibold mb-1">Novo Motorista</h2>

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
                //value={formData.name}
                onChange={onChange}
                className="border rounded-lg p-2 text-sm"
              />
            </div>

            <div className="flex flex-row w-full gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium">CPF *</label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  //value={formData.cpf}
                  onChange={onChange}
                  className="border rounded-lg p-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium">Telefone</label>
                <input
                  type="text"
                  placeholder="(00) 0000-0000"
                  //value={formData.cpf}
                  onChange={onChange}
                  className="border rounded-lg p-2 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-row w-full gap-4">
              <div className="flex flex-col gap-1 flex-1 max-w-68">
                <label className="text-sm font-medium">Número CNH *</label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  //value={formData.cnh_number}
                  onChange={onChange}
                  className="border rounded-lg p-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Categoria CNH *</label>
                <select
                  //value={formData.cnh_category}
                  onChange={onChange}
                  className="border rounded-lg p-2 text-sm max-w-12"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
