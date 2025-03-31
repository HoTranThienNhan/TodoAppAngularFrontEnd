import { Component, ElementRef, model, ViewChild } from '@angular/core';
import { DatePickerComponent } from "../../date-picker/date-picker.component";
import { TagComponent } from "../../tag/tag.component";
import { AddTagComponent } from "../../modals/add-tag/add-tag.component";
import { SubtaskComponent } from "../../subtask/subtask.component";
import { ButtonComponent } from "../../buttons/button/button.component";

@Component({
  selector: 'app-task-details-sidebar',
  imports: [DatePickerComponent, TagComponent, AddTagComponent, SubtaskComponent, ButtonComponent],
  templateUrl: './task-details-sidebar.component.html',
  styleUrl: './task-details-sidebar.component.scss'
})
export class TaskDetailsSidebarComponent {
  // props
    isImportant = model<boolean>(false);


    // hooks
    @ViewChild("importantEl") importantEl!: ElementRef;

  // methods
  checkAsImportant(): void {
    // important element
    if (this.importantEl.nativeElement.classList.contains('checked')) {
      this.importantEl.nativeElement.classList.remove('checked');
    } else {
      this.importantEl.nativeElement.classList.add('checked');
    }
    // emit isImportant
    this.isImportant.set(!this.isImportant());

  }

  changeDate(date: Date): void {
    console.log("date", date);
  }

  toggleDoneSubtask(subtask: { 'id': string, 'isDone': boolean }): void {
    console.log("subtask", subtask);
  }

  addNewSubtask(newSubtask: string): void {
    console.log("newSubtask", newSubtask);
  }

  deleteSubtask(id: string): void {
    console.log("id", id);
  }

}
