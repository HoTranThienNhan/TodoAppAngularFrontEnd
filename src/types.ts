import { SweetAlertIcon } from "sweetalert2";

export type AlertProps = {
    title?: string;
    htmlText?: string;
    icon?: SweetAlertIcon;
    iconColor?: string;
    showConfirmButton?: boolean;
    showDenyButton?: boolean;
    showCloseButton?: boolean;
    confirmButtonText?: string;
    denyButtonText?: string;
    reverseButtons?: boolean;
    allowOutsideClick?: boolean;
    customClass?: string;
  };

  export type AlertRequest = {
    onConfirm: () => void;
  }