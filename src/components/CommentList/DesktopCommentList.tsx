import React from "react";

import { Comment } from "../../interfaces/comment";

import { formatDateHour } from "../../helpers/date";
import { makeLinksClickable } from "../../helpers/string";

interface DesktopCommentListProps {
  authorName: string;
  fullname: string;
  role: string;
  userCanDelete: boolean;
  comment: Comment;
  onOpenModal: (value: number) => void;
}

export const DesktopCommentList: React.FC<DesktopCommentListProps> = ({
  authorName,
  fullname,
  role,
  userCanDelete,
  comment,
  onOpenModal,
}) => {
  return (
    <div className="hidden md:flex gap-4 bg-blue-100 rounded-lg p-4 justify-start items-start ">
      <div className="flex gap-2 flex-1 justify-start items-start">
        <img
          className="rounded-full w-12"
          src={`https://ui-avatars.com/api/name=${authorName}&background=random`}
          alt={fullname}
        />

        <div className="flex flex-col flex-1">
          <span className="font-semibold text-sm">
            {authorName} ({role})
            <small className="font-medium text-xs ml-1">
              {formatDateHour(comment.createdAt)}
            </small>
          </span>

          <div className="flex mt-2">
            <span
              dangerouslySetInnerHTML={{
                __html: makeLinksClickable(comment.text),
              }}
            />
          </div>
        </div>
      </div>

      {userCanDelete && (
        <button
          className="transition text-blue-800 hover:text-blue-500"
          onClick={() => onOpenModal(comment.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 22"
            height="16"
            width="22"
            preserveAspectRatio="xMidYMid meet"
            version="1.1"
            x="0px"
            y="0px"
            enable-background="new 0 0 16 22"
          >
            <path
              d="M5,0,3,2H0V4H16V2H13L11,0ZM15,5H1V19.5A2.5,2.5,0,0,0,3.5,22h9A2.5,2.5,0,0,0,15,19.5Z"
              fill="currentColor"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
