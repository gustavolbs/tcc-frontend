import React, { useState } from "react";

import { DeleteModal } from "./DeleteModal";
import { MobileCommentList } from "./MobileCommentList";
import { DesktopCommentList } from "./DesktopCommentList";

import { useUser } from "../../contexts/UserContext";

import { Comment } from "../../interfaces/comment";
import { Issue } from "../../interfaces/issue";

interface CommentListProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Comment[];
  issue?: Issue;
  isLoading: boolean;
  handleDelete: (commentId: number) => void;
}

export const CommentList: React.FC<CommentListProps> = ({
  className,
  data,
  issue,
  isLoading,
  handleDelete,
  ...props
}) => {
  const { user } = useUser();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const onOpenModal = (commentId: number) => {
    setOpen(true);
    setSelected(commentId);
  };

  const onCloseModal = () => setOpen(false);

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`} {...props}>
      <DeleteModal
        handleDelete={handleDelete}
        isLoading={isLoading}
        onCloseModal={onCloseModal}
        open={open}
        selected={selected}
      />

      {data.map((comment) => {
        const fullname = `${comment?.author?.name || "Fake"} ${
          comment?.author?.surname || "Name"
        }`;
        const authorName = comment?.author?.name || "FakeName";

        const userIsAuthor = comment.authorId === issue?.reporterId;
        const userIsFiscal = comment.authorId === issue?.fiscalId;
        const userIsManager = comment.authorId === issue?.managerId;

        const role = userIsAuthor
          ? "relator"
          : userIsFiscal
          ? "fiscal"
          : userIsManager
          ? "gestor"
          : "cidadão";

        const userCanDelete = comment.authorId === user?.id;

        return (
          <div key={comment.id}>
            {/* MD ~ LG screens */}
            <DesktopCommentList
              authorName={authorName}
              comment={comment}
              fullname={fullname}
              onOpenModal={onOpenModal}
              role={role}
              userCanDelete={userCanDelete}
            />

            {/* MOBILE */}
            <MobileCommentList
              authorName={authorName}
              comment={comment}
              fullname={fullname}
              onOpenModal={onOpenModal}
              role={role}
              userCanDelete={userCanDelete}
            />
          </div>
        );
      })}
    </div>
  );
};
