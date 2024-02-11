import { create } from "zustand";
import { Coruse } from "../../types";

export type ModalType =
  | "navDialog"
  | "filterDialog"
  | "filterTeacherDialog"
  | "confirmModal"
  | "confirmDeleteModal"
  | "cartModal"
  | "shareModal"
  | "sendRespond"
  | "unauthorizedModal";

type ModalData = {
  course?: Coruse;
  reserveId?: string;
};

type ModalStore = {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
