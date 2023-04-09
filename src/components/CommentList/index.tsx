import React, { useState } from "react";
import Modal from "react-responsive-modal";
import { Oval } from "react-loader-spinner";

import { useUser } from "../../contexts/UserContext";

import { Comment } from "../../interfaces/comment";
import { Issue } from "../../interfaces/issue";

import { formatDateHour } from "../../helpers/date";
import { makeLinksClickable } from "../../helpers/string";

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

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`} {...props}>
      {data.map((comment) => {
        const fullname = `${comment.author.name} ${comment.author.surname}`;

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
          <>
            <Modal open={open} onClose={onCloseModal} center>
              <div className="p-4">
                <h2 className="mt-4 text-2xl text-center mb-4">
                  Deletar comentário
                </h2>

                <p className="text-center mb-8">
                  Deseja realmente excluir o comentário?
                  <br />
                  <b>Essa ação não poderá ser desfeita.</b>
                </p>

                <div className="flex justify-between">
                  <button
                    className="bg-slate-600 px-6 py-2 rounded-lg text-white"
                    onClick={onCloseModal}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-red-600 px-6 py-2 rounded-lg text-white"
                    onClick={() => handleDelete(comment.id)}
                    disabled={isLoading}
                  >
                    {!isLoading ? (
                      <Oval
                        color="#fff"
                        height={18}
                        strokeWidth={4}
                        strokeWidthSecondary={4}
                      />
                    ) : (
                      "Excluir"
                    )}
                  </button>
                </div>
              </div>
            </Modal>

            {/* MD ~ LG screens */}
            <>
              <div className="hidden md:flex gap-4 bg-blue-100 rounded-lg p-4 justify-start items-start ">
                <div className="flex gap-2 flex-1 justify-start items-start">
                  <img
                    className="rounded-full w-12"
                    src={`https://ui-avatars.com/api/name=${comment.author.name}&background=random`}
                    alt={fullname}
                  />

                  <div className="flex flex-col flex-1">
                    <span className="font-semibold text-sm">
                      {comment.author.name} ({role})
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
                    onClick={onOpenModal}
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
            </>

            {/* MOBILE */}
            <>
              <div className="flex flex-col gap-2 bg-blue-100 rounded-lg p-4 justify-start items-start md:hidden">
                <div className="flex gap-2 flex-1 w-full justify-start items-start">
                  <img
                    className="rounded-full w-12"
                    src={`https://ui-avatars.com/api/name=${comment.author.name}&background=random`}
                    alt={fullname}
                  />

                  <div className="flex flex-1  justify-between items-start">
                    <span className="font-semibold text-sm">
                      {comment.author.name} ({role})
                      <br />
                      <small className="font-medium text-xs">
                        {formatDateHour(comment.createdAt)}
                      </small>
                    </span>

                    {userCanDelete && (
                      <button
                        className="transition text-blue-800 hover:text-blue-500"
                        onClick={onOpenModal}
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
            </>
          </>
        );
      })}
    </div>
  );
};
