import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { LatLngExpression } from "leaflet";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import Skeleton from "react-loading-skeleton";

import { api } from "../../../api/client";
import { notify } from "../../../helpers/notify";
import { formatDate } from "../../../helpers/date";
import { AVAILABLE_CATEGORIES } from "../../../helpers/issue-categories";

import { useUser } from "../../../contexts/UserContext";

import { ButtonLayout } from "../../../components/ButtonLayout";
import { LabelLayout } from "../../../components/LabelLayout";

import keySVG from "../../../assets/key.svg";

export const ViewIssue: React.FC = () => {
  const { issueId } = useParams();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const isResident = user?.role === "resident";

  const { data: issue, isLoading: isLoadingIssue } = api.getIssue(
    Number(issueId)
  );

  const handleAssignMe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const field = (e.target as any)?.name as string;

    try {
      await api.updateIssueAssignees(String(issueId), field, Number(user?.id));
      notify("success", `Cargo atualizado com sucesso!`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2>
        Problema - #{" "}
        {isLoadingIssue ? (
          <Skeleton width={160} />
        ) : (
          `${issue?.id} (${issue?.status})`
        )}
      </h2>

      <span className="mt-4">
        Registrado em{" "}
        {isLoadingIssue ? (
          <Skeleton width={200} />
        ) : (
          issue?.createdAt && formatDate(issue?.createdAt)
        )}
      </span>
      <span>
        Atualizado em{" "}
        {isLoadingIssue ? (
          <Skeleton width={200} />
        ) : (
          issue?.updatedAt && formatDate(issue?.updatedAt)
        )}
      </span>

      <form className="w-full flex flex-col gap-4 text-start mt-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div>
              <span>Tipo</span>
              {isLoadingIssue ? (
                <Skeleton height={60} />
              ) : (
                <LabelLayout>
                  <div>
                    {
                      AVAILABLE_CATEGORIES.find(
                        (c) => c.value === issue?.category
                      )?.name
                    }
                  </div>
                </LabelLayout>
              )}
            </div>

            <div className="flex flex-col flex-1">
              <span className="mb-0">Descrição</span>
              {isLoadingIssue ? (
                <Skeleton height={60} />
              ) : (
                <LabelLayout className="flex-1">
                  <ReactSVG src={keySVG} />
                  <div>{issue?.description}</div>
                </LabelLayout>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <span>Relator</span>
              {isLoadingIssue ? (
                <Skeleton height={60} />
              ) : (
                <LabelLayout>
                  <ReactSVG src={keySVG} />
                  <div>
                    {issue?.reporter?.name} {issue?.reporter?.surname}
                  </div>
                </LabelLayout>
              )}
            </div>

            <div>
              <span>Fiscal</span>
              {/* 
                Checar se é residente
                - Se for residente:
                    - Se não tiver ninguém atribuido, mostrar botão de se atribuir
                    - Se tiver alguém atribuido
                        - Se for o próprio usuário, mostra botão de se desatribuir
                        - Mostra o nome do usuário
                    
                    - Se não for residente:
                        - Mostra o nome se tiver
                        - Mostra msg de não tem, se n tiver
                
                */}
              {isLoadingIssue ? (
                <Skeleton height={60} />
              ) : !isResident || issue?.reporterId === user?.id ? (
                <LabelLayout>
                  <ReactSVG src={keySVG} />
                  <div>
                    {issue?.fiscal
                      ? `${issue?.fiscal?.name} ${issue?.fiscal?.surname}`
                      : "Nenhum fiscal foi atríbuido ainda"}
                  </div>
                </LabelLayout>
              ) : !issue?.fiscal ? (
                <div>
                  <ButtonLayout
                    name="fiscalId"
                    onClick={handleAssignMe}
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    Me atribuir
                  </ButtonLayout>
                </div>
              ) : issue?.fiscal.id === user?.id ? (
                <div>
                  <ButtonLayout
                    name="fiscalId"
                    onClick={handleAssignMe}
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    Me desatribuir
                  </ButtonLayout>
                </div>
              ) : (
                <LabelLayout>
                  <ReactSVG src={keySVG} />
                  <div>
                    {issue?.fiscal?.name} ${issue?.fiscal?.surname}
                  </div>
                </LabelLayout>
              )}
            </div>

            <div>
              <span className="mt-4">Gestor responsável</span>
              {/* 
                Checar se é gestor
                - Se não for gestor:
                    - Mostra o nome se tiver
                    - Mostra msg de não tem, se n tiver
                - Se for gestor:
                    - Se não tiver ninguém atribuido, mostrar botão de se atribuir
                    - Se tiver alguém atribuido
                        - Se for o próprio usuário, mostra botão de se desatribuir
                        - Mostra o nome do usuário
                
                */}
              {isLoadingIssue ? (
                <Skeleton height={60} />
              ) : isResident || issue?.reporterId === user?.id ? (
                <LabelLayout>
                  <ReactSVG src={keySVG} />
                  <div>
                    {issue?.manager
                      ? `${issue?.manager?.name} ${issue?.manager?.surname}`
                      : "Nenhum gestor foi atríbuido ainda"}
                  </div>
                </LabelLayout>
              ) : !issue?.manager ? (
                <div>
                  <ButtonLayout
                    name="managerId"
                    onClick={handleAssignMe}
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    Me atribuir
                  </ButtonLayout>
                </div>
              ) : issue?.manager.id === user?.id ? (
                <div>
                  <ButtonLayout
                    name="managerId"
                    onClick={handleAssignMe}
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    Me desatribuir
                  </ButtonLayout>
                </div>
              ) : (
                <LabelLayout>
                  <ReactSVG src={keySVG} />
                  <div>
                    {issue?.manager?.name} ${issue?.manager?.surname}
                  </div>
                </LabelLayout>
              )}
            </div>
          </div>
        </div>

        <div className="map-container">
          {isLoadingIssue && <Skeleton height={400} />}{" "}
          {issue?.latitude && (
            <MapContainer
              center={[issue?.latitude, issue?.longitude] as LatLngExpression}
              zoom={13}
              scrollWheelZoom
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {issue?.latitude && (
                <Marker
                  position={
                    [issue?.latitude, issue?.longitude] as LatLngExpression
                  }
                />
              )}
            </MapContainer>
          )}
        </div>
      </form>
    </>
  );
};
