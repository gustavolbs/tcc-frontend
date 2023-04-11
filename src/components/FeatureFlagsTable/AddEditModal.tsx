import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Modal from "react-responsive-modal";

import { LabelLayout } from "../LabelLayout";

import { FeatureFlag } from "../../interfaces/feature-flag";
import { SelectLayout } from "../SelectLayout";

interface AddEditModalProps {
  modal: {
    mode: string;
    open: boolean;
  };
  isLoading: boolean;
  handleAdd: (featureName: string) => void;
  handleEdit: (feature: FeatureFlag) => void;
  onCloseModal: () => void;
  selected?: FeatureFlag | undefined;
}

export const AddEditModal: React.FC<AddEditModalProps> = ({
  modal,
  handleAdd,
  handleEdit,
  isLoading,
  onCloseModal,
  selected,
}) => {
  const [featureName, setFeatureName] = useState("");
  const [featureStatus, setFeatureStatus] = useState(selected?.status);

  const handleConfirm = () => {
    if (modal.mode === "add") {
      handleAdd(featureName);
      setFeatureName("");
      onCloseModal();
    } else {
      handleEdit({
        id: Number(selected?.id),
        name: featureName,
        status: !!featureStatus,
      });
    }
  };

  useEffect(() => {
    setFeatureName(selected?.name || "");
  }, [selected]);

  return (
    <Modal open={modal.open} onClose={onCloseModal} center>
      <div className="p-4">
        <h2 className="mt-4 text-2xl text-center mb-4">
          {modal.mode === "add" ? "Adicionar" : "Editar"} Feature Flag
        </h2>

        <div className="mt-10 mb-4">
          <span>Nome</span>
          <LabelLayout htmlFor="feature" className="sm:w-96">
            <input
              type="text"
              id="feature"
              name="feature"
              placeholder="Nome da Feature"
              value={featureName}
              onChange={(e) => setFeatureName(e.target.value)}
            />
          </LabelLayout>
        </div>

        {modal.mode === "edit" && (
          <>
            <span>Status</span>
            <SelectLayout
              onChange={(e) => setFeatureStatus(e.target.value === "true")}
              defaultValue={String(selected?.status)}
              disabled={isLoading}
              className="w-full"
            >
              <option value="true">Ativa</option>
              <option value="false">Inativa</option>
            </SelectLayout>
          </>
        )}

        <div className="flex justify-between mt-10">
          <button
            className="bg-slate-600 px-6 py-2 rounded-lg text-white"
            onClick={onCloseModal}
          >
            Cancelar
          </button>
          <button
            className="bg-green-600 px-6 py-2 rounded-lg text-white"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <Oval
                color="#fff"
                height={18}
                strokeWidth={4}
                strokeWidthSecondary={4}
              />
            ) : modal.mode === "add" ? (
              "Adicionar"
            ) : (
              "Editar"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
