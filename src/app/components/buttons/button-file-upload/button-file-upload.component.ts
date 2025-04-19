import { Component, inject, output } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { BlobToBase64Service } from '../../../services/blob-to-base64/blob-to-base64.service';

@Component({
  selector: 'app-button-file-upload',
  imports: [ButtonComponent],
  templateUrl: './button-file-upload.component.html',
  styleUrl: './button-file-upload.component.scss'
})
export class ButtonFileUploadComponent {
  // props
  base64ImageEventEmitter = output<string>();

  // injection
  blobToBase64Service: BlobToBase64Service = inject(BlobToBase64Service);

  // methods
  onFileSelected(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {
      this.blobToBase64Service.convertBlobToBase64(file).subscribe((base64: string) => {
        this.base64ImageEventEmitter.emit(base64);
      });
    }
  }
}
