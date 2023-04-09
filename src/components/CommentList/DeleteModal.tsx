import Modal from "react-responsive-modal";
import { Oval } from "react-loader-spinner";

interface DeleteModalProps {
  open: boolean;
  onCloseModal: () => void;
  isLoading: boolean;
  handleDelete: (value: number) => void;
  selected: number | null;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onCloseModal,
  handleDelete,
  selected,
  isLoading,
}) => {
  const handleConfirmDelete = (commentId: number) => {
    handleDelete(commentId);
    onCloseModal();
  };

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <div className="p-4">
        <h2 className="mt-4 text-2xl text-center mb-4">Deletar comentário</h2>

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
            onClick={() => handleConfirmDelete(Number(selected))}
            disabled={isLoading}
          >
            {isLoading ? (
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
  );
};
