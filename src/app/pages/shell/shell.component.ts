import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../components/sidebar/sidebar/sidebar.component";

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {

}
