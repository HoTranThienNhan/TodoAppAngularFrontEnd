import { Component, input } from '@angular/core';

@Component({
  selector: 'app-avatar-profile',
  imports: [],
  templateUrl: './avatar-profile.component.html',
  styleUrl: './avatar-profile.component.scss'
})
export class AvatarProfileComponent {
  // props
  username = input<string>("Username");
  avatarSrc = input<string>("");
}
