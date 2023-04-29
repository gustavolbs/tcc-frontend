import React, { useState } from "react";
import { FiShare } from "react-icons/fi";
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

import { FFS } from "../../../interfaces/feature-flag";
import { Issue } from "../../../interfaces/issue";

import { useCity } from "../../../contexts/CityContext";
import { useUser } from "../../../contexts/UserContext";

import { ButtonLayout } from "../../../components/ButtonLayout";
import { CommentInput } from "../../../components/CommentInput";
import { CommentList } from "../../../components/CommentList";
import { LabelLayout } from "../../../components/LabelLayout";
import { RenderField } from "./RenderField";

import keySVG from "../../../assets/key.svg";

export const ViewIssue: React.FC = () => {
  const { issueId } = useParams();
  const { user } = useUser();
  const { isFeatureEnabled } = useCity();
  const [isLoading, setIsLoading] = useState(false);
  const [commentText, setCommentText] = useState("");

  const isResident = user?.role === "resident";
  const enableConversations = isFeatureEnabled(FFS.CONVERSATIONS);

  const { data: issue, isLoading: isLoadingIssue } = api.getIssue(
    Number(issueId)
  );

  const { data: comments, isLoading: isLoadingComments } =
    api.getAllCommentsFromIssue(Number(issueId));

  const isIssueSolved = issue?.status === STATUSES[5].value;

  const handleAssignMe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const field = (e.target as any)?.name as string;

    try {
      const fieldResponse = field === "manager" ? "Gestor" : "Fiscal";

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

  const handleAddComment = async () => {
    try {
      await api.addComment(Number(issueId), {
        text: commentText,
        // commentId: data.comId,
      });
      setCommentText("");
      notify("success", `Comentário realizado com sucesso!`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    setIsLoading(true);

    try {
      await api.deleteComment(Number(issueId), commentId);
      notify("success", `Comentário deletado com sucesso!`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    const isMobile = /Mobile/.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      await navigator.share({
        url: window.location.href,
      });
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        notify("success", "Link copiado com sucesso!");
      } catch (err) {
        notify("error", "Ocorreu um erro ao copiar o link!");
      }
    }
  };

  return (
    <>
      <FiShare
        onClick={handleShare}
        className="block cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-900 w-10 h-auto absolute right-2 top-2   p-2 rounded-full"
      />

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

      {enableConversations ? (
        <>
          <h3 className="flex flex-col w-full mt-16 text-start text-xl">
            Comentários
          </h3>

          <CommentInput
            className="mt-4"
            value={commentText}
            setValue={setCommentText}
            onClickSend={handleAddComment}
            limit={1024}
          />

          {!isLoadingComments && comments && (
            <details open className="flex flex-col w-full mt-8 text-start">
              <summary className="text-start text-xl">
                Exibir comentários
              </summary>

              <CommentList
                className="mt-4"
                data={comments}
                issue={issue}
                handleDelete={handleDeleteComment}
                isLoading={isLoading}
              />
            </details>
          )}
        </>
      ) : null}
    </>
  );
};
