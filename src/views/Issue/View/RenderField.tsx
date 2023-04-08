import Skeleton from "react-loading-skeleton";
import { ReactSVG } from "react-svg";

import { ButtonLayout } from "../../../components/ButtonLayout";
import { LabelLayout } from "../../../components/LabelLayout";

import { useUser } from "../../../contexts/UserContext";

import { Issue } from "../../../interfaces/issue";

import keySVG from "../../../assets/key.svg";

interface RenderFieldProps {
  isLoadingIssue: boolean;
  isIssueSolved: boolean;
  isResident: boolean;
  isLoading: boolean;
  issue: Issue;
  handleAssignMe: (e: React.MouseEvent<HTMLButtonElement>) => void;
  field: "fiscal" | "manager";
}

export const RenderField: React.FC<RenderFieldProps> = ({
  isLoadingIssue,
  isIssueSolved,
  isResident,
  issue,
  handleAssignMe,
  isLoading,
  field,
}) => {
  const { user } = useUser();

  if (isLoadingIssue) {
    return <Skeleton height={60} />;
  }

  const assignedPerson = issue?.[field];

  if (
    isIssueSolved ||
    (field === "fiscal" ? !isResident : isResident) ||
    issue?.reporterId === user?.id
  ) {
    return (
      <LabelLayout>
        <ReactSVG src={keySVG} />
        <div>
          {assignedPerson
            ? `${assignedPerson?.name} ${assignedPerson?.surname}`
            : `Nenhum ${field === "manager" ? "gestor" : field} foi atríbuido
            ${!isIssueSolved ? " ainda" : ""}`}
        </div>
      </LabelLayout>
    );
  }

  const buttonLabel =
    assignedPerson?.id === user?.id ? "Me desatribuir" : "Me atribuir";

  return (
    <div>
      <ButtonLayout
        className="w-full"
        name={`${field}Id`}
        onClick={handleAssignMe}
        disabled={isLoading}
        isLoading={isLoading}
      >
        {buttonLabel}
      </ButtonLayout>
    </div>
  );
};
