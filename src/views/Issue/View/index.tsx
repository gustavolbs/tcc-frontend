import React from "react";
import { ReactSVG } from "react-svg";
import { LatLngExpression } from "leaflet";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import { api } from "../../../api/client";
import { notify } from "../../../helpers/notify";
import { formatDate } from "../../../helpers/date";
import { AVAILABLE_CATEGORIES } from "../../../helpers/issue-categories";

import { useUser } from "../../../contexts/UserContext";

import { ButtonLayout } from "../../../components/ButtonLayout";
import { LabelLayout } from "../../../components/LabelLayout";

import keySVG from "../../../assets/key.svg";

import "./index.scss";

export const ViewIssue: React.FC = () => {
  const { issueId } = useParams();
  const { user } = useUser();

  const isResident = user?.role === "resident";

  const { data: issue, isError, isLoading } = api.getIssue(Number(issueId));

  const handleAssignMe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const field = (e.target as any)?.name as string;

    try {
      await api.updateIssueAssignees(String(issueId), field, Number(user?.id));
      notify("success", `Cargo atualizado com sucesso!`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="box-create-city box-create-issue">
        <h2>
          Problema - # {issue?.id} ({issue?.status})
        </h2>

        <span>
          Registrado em {issue?.createdAt && formatDate(issue?.createdAt)}
        </span>
        <span>
          Atualizado em {issue?.updatedAt && formatDate(issue?.updatedAt)}
        </span>

        <form className="auth-form">
          <div className="grid-row issue-view-grid">
            <div>
              <span>Tipo</span>
              <LabelLayout>
                <div>
                  {
                    AVAILABLE_CATEGORIES.find(
                      (c) => c.value === issue?.category
                    )?.name
                  }
                </div>
              </LabelLayout>

              <span>Descrição</span>
              <LabelLayout>
                <ReactSVG src={keySVG} />
                <div>{issue?.description}</div>
              </LabelLayout>
            </div>

            <div>
              <span>Relator</span>
              <LabelLayout>
                <ReactSVG src={keySVG} />
                <div>
                  {issue?.reporter?.name} {issue?.reporter?.surname}
                </div>
              </LabelLayout>

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
              {!isResident || issue?.reporterId === user?.id ? (
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
                  <ButtonLayout name="fiscalId" onClick={handleAssignMe}>
                    Me atribuir
                  </ButtonLayout>
                </div>
              ) : issue?.fiscal.id === user?.id ? (
                <div>
                  <ButtonLayout name="fiscalId" onClick={handleAssignMe}>
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

              <span>Gestor responsável</span>
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
              {isResident || issue?.reporterId === user?.id ? (
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
                  <ButtonLayout name="managerId" onClick={handleAssignMe}>
                    Me atribuir
                  </ButtonLayout>
                </div>
              ) : issue?.manager.id === user?.id ? (
                <div>
                  <ButtonLayout name="managerId" onClick={handleAssignMe}>
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

          <div className="map-container">
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
      </div>
    </div>
  );
};
