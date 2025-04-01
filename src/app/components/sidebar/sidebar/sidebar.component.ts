import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AvatarProfileComponent } from "../../avatar-profile/avatar-profile.component";
import { AccountComponent } from '../../modals/account/account.component';
import { User } from '../../../models/user/user.model';
import { UserStore } from '../../../stores/user.store';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputSearchComponent } from "../../inputs/input-search/input-search.component";
import { MenuTaskComponent } from "../menu-task/menu-task.component";
import { TagComponent } from "../../tag/tag.component";
import { AddTagComponent } from "../../modals/add-tag/add-tag.component";
import { MenuTaskItemsComponent } from "../menu-task-items/menu-task-items.component";
import { Router } from '@angular/router';
import { TagService } from '../../../services/tag/tag.service';
import { Tag } from '../../../models/tag/tag/tag.model';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SidebarStateStore } from '../../../stores/sidebar.store';

@Component({
  selector: 'app-sidebar',
  imports: [AvatarProfileComponent, AccountComponent, ReactiveFormsModule, InputSearchComponent, MenuTaskComponent, TagComponent, AddTagComponent, MenuTaskItemsComponent, NzToolTipModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  // props
  user!: User;
  searchForm!: FormGroup;
  isSelectedSettings: boolean = false;
  tags: Array<Tag> = [];
  isCollapsed!: boolean;

  // getters, setters
  get search(): FormControl {
    return this.searchForm.get('search') as FormControl;
  }

  // injection
  userStore = inject(UserStore);
  sidebarStateStore = inject(SidebarStateStore);
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  tagService: TagService = inject(TagService);

  // hooks
  ngOnInit(): void {
    this.user = this.userStore.getUser();
    this.isCollapsed = this.sidebarStateStore.getSidebarState();

    this.searchForm = this.fb.group({
      search: ["", []]
    });

    if (this.user.id !== "") {
      this.tagService.getAllByUserId(this.user.id).subscribe({
        next: (res) => {
          res.data?.tags.map((tag: Tag) => {
            this.tags.push(tag);
          });
        }
      });
    }
  }
  
  @ViewChild(AccountComponent) accountComp!: AccountComponent;
  @ViewChild(MenuTaskComponent) menuTaskComp!: MenuTaskComponent;
  @ViewChild("sidebar") sidebarEl!: ElementRef;

  ngAfterViewInit(): void {
    if (this.isCollapsed) {
      this.sidebarEl.nativeElement.classList.add('sidebar-collapse');
    } else {
      this.sidebarEl.nativeElement.classList.remove('sidebar-collapse');
    }
  }

  // methods
  openAccountModal(): void {
    this.accountComp.showModal();
  }

  updateAccount(account: User): void {
    console.log(account);
  }

  onButtonSearchClick(searchValue: string): void {
    console.log(searchValue);
  }

  navigateToTaskPage(page: string): void {
    this.isSelectedSettings = false;
    switch(page) {
      case "today": 
        this.router.navigate(['today']);
        break;
      case "upcoming": 
        this.router.navigate(['upcoming']);
        break;
      case "important": 
        this.router.navigate(['important']);
        break;
      case "done": 
        this.router.navigate(['done']);
        break;
      case "calendar": 
        this.router.navigate(['calendar']);
        break;
      default:
        break;
    }
  }

  navigateToSettings(): void {
    this.isSelectedSettings = true;
    this.menuTaskComp.setAllAsFalse();
  }

  signOut(): void {
    this.userStore.removeUser();
    this.router.navigate(['/']);
  }

  closeLeftSidebar(isCollapsed: boolean): void {
    if (!isCollapsed) {
      this.sidebarEl.nativeElement.classList.add('sidebar-collapse');
      this.isCollapsed = true;
      this.sidebarStateStore.storeSidebarState(true);
    } else {
      this.sidebarEl.nativeElement.classList.remove('sidebar-collapse');
      this.isCollapsed = false;
      this.sidebarStateStore.storeSidebarState(false);
    }
  }
}
