import React, { useState } from "react";
import { AiFillDelete, AiFillEdit, AiOutlineLink } from "react-icons/ai";
import { Link } from "react-router-dom";

import { api } from "../../api/client";
import { notify } from "../../helpers/notify";

import { City } from "../../interfaces/city";
import { User } from "../../interfaces/user";

import { useUser } from "../../contexts/UserContext";

import { DeleteModal } from "../DeleteModal";
import { SkeletonTableRow } from "../Skeletons/TableRow";
import { FeatureFlag } from "../../interfaces/feature-flag";
import { AddEditModal } from "./AddEditModal";
import { ButtonLayout } from "../ButtonLayout";

interface FeatureFlagsTableProps {
  features: FeatureFlag[] | undefined;
  isLoadingFeatures: boolean;
}

const TABLE_KEYS = ["ID", "Nome", "Status", "Editar", "Deletar"];

export const FeatureFlagsTable: React.FC<FeatureFlagsTableProps> = ({
  features,
  isLoadingFeatures,
}) => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    open: false,
    mode: "add",
  });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<
    FeatureFlag | undefined
  >(undefined);

  const onOpenAddEditModal = (
    mode: "add" | "edit",
    feature?: FeatureFlag | undefined
  ) => {
    console.log("FEATURE:", feature);
    setOpenAddEditModal({
      open: true,
      mode,
    });
    setSelectedFeature(feature);
  };

  const onCloseAddEditModal = () =>
    setOpenAddEditModal({
      ...openAddEditModal,
      open: false,
    });

  const onOpenDeleteModal = (feature: FeatureFlag) => {
    setOpenDeleteModal(true);
    setSelectedFeature(feature);
  };

  const onCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleAddFeature = async (featureName: string) => {
    setIsLoading(true);

    try {
      await api.createFeatureFlag(featureName);
      notify("success", `Feature Flag adicionada com sucesso!`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditFeature = async (feature: FeatureFlag) => {
    setIsLoading(true);

    try {
      await api.updateFeatureFlag(feature);
      notify("success", `Feature Flag atualizada com sucesso!`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      onCloseAddEditModal();
    }
  };

  const handleDeleteFeature = async () => {
    setIsLoading(true);

    try {
      await api.deleteFeatureFlag(Number(selectedFeature?.id));
      notify("success", `Feature Flag excluída com sucesso!`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <AddEditModal
        modal={openAddEditModal}
        isLoading={isLoading}
        handleAdd={handleAddFeature}
        handleEdit={handleEditFeature}
        onCloseModal={onCloseAddEditModal}
        selected={selectedFeature}
      />

      <DeleteModal
        handleDelete={handleDeleteFeature}
        isLoading={isLoading}
        onCloseModal={onCloseDeleteModal}
        open={openDeleteModal}
        selected={Number(selectedFeature?.id)}
        objectName="feature flag"
        dataName={selectedFeature?.name}
      />

      <div className="flex flex-row-reverse justify-between items-baseline mt-4">
        {!features?.length && !isLoadingFeatures && (
          <div>Nenhum resultado encontrado</div>
        )}
        <ButtonLayout
          onClick={() => onOpenAddEditModal("add", undefined)}
          type="button"
          className="py-1.5 mx-0"
        >
          Adicionar
        </ButtonLayout>
      </div>

      <table className="w-full mt-8 border-collapse text-sm md:text-base">
        <thead>
          <tr className="bg-blue-500 font-bold">
            {TABLE_KEYS.map((key) => (
              <td
                key={`featureFlagsHeader#${key}`}
                className="py-4 px-6 text-center"
              >
                {key}
              </td>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoadingFeatures ? (
            <SkeletonTableRow columns={TABLE_KEYS} />
          ) : (
            features?.map((feature, index) => (
              <tr
                key={feature.id}
                className={`${index % 2 !== 0 ? "bg-blue-100" : ""}`}
              >
                <td className="text-center py-4 px-6">{feature.id}</td>
                <td className="text-center py-4 px-6">{feature.name}</td>
                <td className="text-center py-4 px-6">
                  {feature.status ? "Ativa" : "Inativa"}
                </td>
                <td
                  className="text-center py-4 px-6 text-center transition text-blue-800 hover:text-blue-500 cursor-pointer"
                  onClick={() => onOpenAddEditModal("edit", feature)}
                >
                  <AiFillEdit className="m-auto w-5 h-auto" />
                </td>
                <td
                  className="text-center py-4 px-6 text-center transition text-blue-800 hover:text-blue-500 cursor-pointer"
                  onClick={() => onOpenDeleteModal(feature)}
                >
                  <AiFillDelete className="m-auto w-5 h-auto" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
