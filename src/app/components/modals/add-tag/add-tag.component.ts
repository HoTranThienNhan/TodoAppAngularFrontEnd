import { Component, input } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TagComponent } from "../../tag/tag.component";
import { ButtonComponent } from "../../buttons/button/button.component";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-tag',
  imports: [TagComponent, NzModalModule, ButtonComponent, NzSelectModule, FormsModule],
  templateUrl: './add-tag.component.html',
  styleUrl: './add-tag.component.scss'
})
export class AddTagComponent {
  // props
  isVisible = false;
  addTagModalTitle = input<'Add Tag' | 'Select Tags'>('Add Tag');
  tags: Array<string> = [
    "Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5", "Tag 6"
  ];
  selectedTags: Array<string> = [];
  addedTag: string = "";

  // methods
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.selectedTags = [];
  }
}
