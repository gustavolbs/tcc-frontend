import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { LatLngExpression } from "leaflet";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import Skeleton from "react-loading-skeleton";

import { api } from "../../../api/client";
import { notify } from "../../../helpers/notify";
import { formatDate } from "../../../helpers/date";
import { STATUSES, findStatusName } from "../../../helpers/status";
import { AVAILABLE_CATEGORIES } from "../../../helpers/issue-categories";

import { Issue } from "../../../interfaces/issue";

import { useUser } from "../../../contexts/UserContext";

import { ButtonLayout } from "../../../components/ButtonLayout";
import { LabelLayout } from "../../../components/LabelLayout";
import { RenderField } from "./RenderField";

import keySVG from "../../../assets/key.svg";

export const ViewIssue: React.FC = () => {
  const { issueId } = useParams();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const isResident = user?.role === "resident";

  const { data: issue, isLoading: isLoadingIssue } = api.getIssue(
    Number(issueId)
  );

  const isIssueSolved = issue?.status === STATUSES[5].value;

  const handleAssignMe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const field = (e.target as any)?.name as string;

    try {
      const fieldResponse = field === "fiscal" ? "Fiscal" : "Gestor";

      await api.updateIssueAssignees(String(issueId), field, Number(user?.id));
      notify("success", `${fieldResponse} atualizado com sucesso!`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsSolved = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.markIssueAsSolved(String(issueId));
      notify("success", `Problema resolvido com sucesso!`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2>
        Problema - # {isLoadingIssue ? <Skeleton width={160} /> : issue?.id}
      </h2>
      <span>({findStatusName(String(issue?.status))})</span>

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
            {issue?.reporterId === user?.id && !isIssueSolved ? (
              <div>
                <span>Marcar como resolvido</span>
                <ButtonLayout
                  className="w-full"
                  onClick={handleMarkAsSolved}
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  Confirmar
                </ButtonLayout>
              </div>
            ) : (
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
            )}

            <div>
              <span>Fiscal</span>
              <RenderField
                isLoadingIssue={isLoadingIssue}
                isIssueSolved={isIssueSolved}
                isResident={isResident}
                isLoading={isLoading}
                issue={issue as Issue}
                handleAssignMe={handleAssignMe}
                field="fiscal"
              />
            </div>

            <div>
              <span className="mt-4">Gestor responsável</span>
              <RenderField
                isLoadingIssue={isLoadingIssue}
                isIssueSolved={isIssueSolved}
                isResident={isResident}
                isLoading={isLoading}
                issue={issue as Issue}
                handleAssignMe={handleAssignMe}
                field="manager"
              />
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
