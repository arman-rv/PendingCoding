import { useEffect, useState } from "react";
import { NavbarMobile } from "../../landing/navigation/navbar-mobile";
import { MobileFilter } from "../../courses/mobile-filter";
import { MobileFilter as MobileTeacherFilter } from "../../teachers/mobile-filter";
import { ShareModal } from "../share-modal";
import { RespondModal } from "../respond-modal";
import { ConfirmModal } from "../confirm-modal";
import { CartModal } from "../../landing/navigation/cart-modal";
import { ConfirmDeleteModal } from "../confirm-delete-modal";
import { UnauthorizedModal } from "../unauthorized-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <NavbarMobile />
      <MobileFilter />
      <MobileTeacherFilter />
      <ShareModal />
      <RespondModal />
      <ConfirmModal />
      <ConfirmDeleteModal />
      <CartModal />
      <UnauthorizedModal />
    </>
  );
};
