import { Component, effect, inject, input, model, output } from '@angular/core';
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
import { Tag } from '../../../models/tag/tag/tag.model';

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
  tags: Array<Tag> = [];
  selectedTags = model<Array<Tag>>([]);
  selectedTagsString: Array<string> = [];
  addedTag: string = "";
  user = input<User>();
  isLoading: boolean = false;
  notifyRefetchTagsEventEmitter = output<void>();
  selectTagsEventEmitter = output<Array<Tag>>();

  // injection
  tagService: TagService = inject(TagService);
  message: NzMessageService = inject(NzMessageService);

  // hooks
  ngOnInit(): void {
  }
  
  selectedTagsEffect = effect(() => {
    this.selectedTagsString = [];
    if (this.selectedTags()) {
      this.selectedTags().map((tag) => {
        if (!this.selectedTagsString.includes(tag.name)) {
          this.selectedTagsString.push(tag.name);
        }
      });
    }
  });

  // methods
  showModal(): void {
    this.isVisible = true;
    
    this.tagService.getAllByUserId(this.user()!.id).subscribe({
      next: (res) => {
        this.tags = res.data?.tags!;
      }
    });
  }

  selectTags(tagsString: Array<string>): void {
    this.selectedTags().length = 0;
    this.selectedTagsString.length = 0;

    const filteredSelectedTags = this.tags.filter(tag => tagsString.includes(tag.name));
    filteredSelectedTags.map((selectedTag) => {
        this.selectedTags().push(selectedTag);
        this.selectedTagsString.push(selectedTag.name);
    })
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
          this.message.success('Add tag successfully!', {
            nzDuration: 3000,
            nzPauseOnHover: true,
          });

          this.notifyRefetchTagsEventEmitter.emit();
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
    } else {
      this.selectTagsEventEmitter.emit(this.selectedTags());

      this.message.success(`Selected ${this.selectedTags().length} tag${this.selectedTags().length > 1 ? 's' : ''}!`, {
        nzDuration: 3000,
        nzPauseOnHover: true,
      });
      
      this.isVisible = false;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.addedTag = "";
    console.log("Cancel");
  }
}
