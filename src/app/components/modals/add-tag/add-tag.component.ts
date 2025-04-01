import { Component, inject, input } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TagComponent } from "../../tag/tag.component";
import { ButtonComponent } from "../../buttons/button/button.component";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { TagService } from '../../../services/tag/tag.service';
import { AddTagDto } from '../../../models/tag/add-tag-dto/add-tag-dto.model';
import { User } from '../../../models/user/user.model';
import { finalize } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  user = input<User>();
  isLoading: boolean = false;

  // injection
  tagService: TagService = inject(TagService);
  message: NzMessageService = inject(NzMessageService);

  // hooks
  ngOnInit(): void {

  }

  // methods
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(addTagModalTitle: 'Add Tag' | 'Select Tags'): void {
    if (addTagModalTitle === 'Add Tag') {
      let addTag: AddTagDto = new AddTagDto();
      addTag.name = this.addedTag;
      addTag.userId = this.user()!.id;
      this.isLoading = true;

      this.tagService.addTag(addTag).pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      ).subscribe({
        next: (res) => {
          console.log(res);

          this.message.success('Add tag successfully!', {
            nzDuration: 3000,
            nzPauseOnHover: true,
          });

          this.addedTag = "";
          this.isVisible = false;
        },
        error: (err) => {
          this.message.error(err.error.message, {
            nzDuration: 3000,
            nzPauseOnHover: true,
          });
        }
      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.selectedTags = [];
    console.log("Cancel");
    console.log(this.addedTag);
  }
}
