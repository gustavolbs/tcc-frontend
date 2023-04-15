import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Modal from "react-responsive-modal";

import { LabelLayout } from "../LabelLayout";

import { FeatureFlag } from "../../interfaces/feature-flag";

import { slugify } from "../../helpers/string";

interface AddEditModalProps {
  modal: {
    mode: string;
    open: boolean;
  };
  isLoading: boolean;
  handleAdd: (slug: string, description: string) => void;
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
  const [featureSlug, setFeatureSlug] = useState("");
  const [featureDescription, setFeatureDescription] = useState("");

  const handleConfirm = () => {
    if (modal.mode === "add") {
      handleAdd(slugify(featureSlug), featureDescription);
      setFeatureSlug("");
      onCloseModal();
    } else {
      handleEdit({
        id: Number(selected?.id),
        slug: slugify(featureSlug),
        description: featureDescription,
        status: !!selected?.status,
      });
    }
  };

  useEffect(() => {
    setFeatureSlug(selected?.slug || "");
    setFeatureDescription(selected?.description || "");
  }, [selected]);

  return (
    <Modal open={modal.open} onClose={onCloseModal} center>
      <div className="p-4">
        <h2 className="mt-4 text-2xl text-center mb-4">
          {modal.mode === "add" ? "Adicionar" : "Editar"} Feature Flag
        </h2>

        <div className="mt-10 mb-6">
          <span>Nome</span>
          <LabelLayout htmlFor="feature" className="sm:w-96">
            <input
              type="text"
              id="feature"
              name="feature"
              placeholder="Nome da Feature"
              value={featureSlug}
              onChange={(e) => setFeatureSlug(e.target.value)}
            />
          </LabelLayout>
          <div className="mt-4">slug: {slugify(featureSlug)}</div>
        </div>

        <span>Descrição curta</span>
        <LabelLayout htmlFor="description" className="sm:w-96">
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Descrição curta"
            value={featureDescription}
            onChange={(e) => setFeatureDescription(e.target.value)}
          />
        </LabelLayout>

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
