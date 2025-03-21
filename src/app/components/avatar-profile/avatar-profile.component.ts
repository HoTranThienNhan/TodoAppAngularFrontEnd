import { Component, input } from '@angular/core';
import { FullNamePipe } from '../../pipes/full-name.pipe';

@Component({
  selector: 'app-avatar-profile',
  imports: [FullNamePipe],
  templateUrl: './avatar-profile.component.html',
  styleUrl: './avatar-profile.component.scss'
})
export class AvatarProfileComponent {
  // props
  firstName = input<string>("First Name");
  lastName = input<string>("");
  username = input<string>("username");
  userId = input<string>("userid");
  avatarSrc = input<string>("");
}
