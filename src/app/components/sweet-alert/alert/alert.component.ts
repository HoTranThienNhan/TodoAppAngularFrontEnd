import { Component, inject, output } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { AlertProps } from '../../../../types';
import { AlertService } from '../../../services/shared/alert/alert.service';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  // props
  alertModalProps: AlertProps = {
    title: `Success!`,
    htmlText: `Alert Modal Content`,
    icon: 'success',
    iconColor: 'green',
    showConfirmButton: true,
    showDenyButton: true,
    showCloseButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'No',
    reverseButtons: true,
    allowOutsideClick: true,
    customClass: 'custom-alert-modal',
  };
  onConfirmCallback!: () => void;

  // injection
  alertService: AlertService = inject(AlertService);

  // hooks
  ngOnInit(): void {
    this.alertService.alertRequest$.subscribe(req => {
      this.onConfirmCallback = req.onConfirm;
    });
  }

  // methods
  setProps(alertModalProps?: AlertProps): void {
    this.alertModalProps = {
      title: alertModalProps?.title ?? this.alertModalProps.title,
      htmlText: alertModalProps?.htmlText ?? this.alertModalProps.htmlText,
      icon: alertModalProps?.icon ?? this.alertModalProps.icon,
      iconColor: alertModalProps?.iconColor ?? this.alertModalProps.iconColor,
      showConfirmButton: alertModalProps?.showConfirmButton !== null ? alertModalProps?.showConfirmButton : this.alertModalProps.showConfirmButton,
      showDenyButton: alertModalProps?.showDenyButton !== null ? alertModalProps?.showDenyButton : this.alertModalProps.showDenyButton,
      showCloseButton: alertModalProps?.showCloseButton !== null ? alertModalProps?.showCloseButton : this.alertModalProps.showCloseButton,
      confirmButtonText: alertModalProps?.confirmButtonText ?? this.alertModalProps.confirmButtonText,
      denyButtonText: alertModalProps?.denyButtonText ?? this.alertModalProps.denyButtonText,
      reverseButtons: alertModalProps?.reverseButtons !== null ? alertModalProps?.reverseButtons : this.alertModalProps.reverseButtons,
      allowOutsideClick: alertModalProps?.allowOutsideClick !== null ? alertModalProps?.allowOutsideClick : this.alertModalProps.allowOutsideClick,
      customClass: alertModalProps?.customClass ?? this.alertModalProps.customClass,
    };
  }

  open(alertModalProps?: AlertProps): void {
    this.setProps(alertModalProps);
    Swal.fire({
      title: `<span class='text-black'>` + this.alertModalProps.title + `<span>`,
      html: `<span class='text-black'>` + this.alertModalProps.htmlText + `</span>`,
      icon: this.alertModalProps.icon,
      iconColor: this.alertModalProps.iconColor,
      showConfirmButton: this.alertModalProps.showConfirmButton,
      showDenyButton: this.alertModalProps.showDenyButton,
      showCloseButton: this.alertModalProps.showCloseButton,
      confirmButtonText: this.alertModalProps.confirmButtonText,
      denyButtonText: this.alertModalProps.denyButtonText,
      reverseButtons: this.alertModalProps.reverseButtons,
      allowOutsideClick: this.alertModalProps.allowOutsideClick,
      customClass: {
        container: this.alertModalProps.customClass
      }
      }).then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          this.onConfirmCallback();
        }
    });
  }
}