import React from "react";

import { Comment } from "../../interfaces/comment";

import { formatDateHour } from "../../helpers/date";
import { makeLinksClickable } from "../../helpers/string";

interface MobileCommentListProps {
  authorName: string;
  fullname: string;
  role: string;
  userCanDelete: boolean;
  comment: Comment;
  onOpenModal: (value: number) => void;
}

export const MobileCommentList: React.FC<MobileCommentListProps> = ({
  authorName,
  fullname,
  role,
  userCanDelete,
  comment,
  onOpenModal,
}) => {
  return (
    <div className="flex flex-col gap-2 bg-blue-100 rounded-lg p-4 justify-start items-start md:hidden">
      <div className="flex gap-2 flex-1 w-full justify-start items-start">
        <img
          className="rounded-full w-12"
          src={`https://ui-avatars.com/api/name=${authorName}&background=random`}
          alt={fullname}
        />

        <div className="flex flex-1  justify-between items-start">
          <span className="font-semibold text-sm">
            {authorName} ({role})
            <br />
            <small className="font-medium text-xs">
              {formatDateHour(comment.createdAt)}
            </small>
          </span>

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
      </div>

      <div>
        <span
          dangerouslySetInnerHTML={{
            __html: makeLinksClickable(comment.text),
          }}
        />
      </div>
    </div>
  );
};
