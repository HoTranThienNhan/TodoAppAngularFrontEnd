import { Component, input, OnInit } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-tag',
  imports: [NzTagModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent implements OnInit {
  // props
  tagTitle = input<string>("Tag 1");
  color = input<'#F9DBB5' | '#E9E8E8'>('#F9DBB5');
  hoverColor = input<string>(this.color());
  fontSize = input<number>(16);
  hoverColorString: string = "";

  // hooks
  ngOnInit(): void {
    this.hoverColorString = "tag hover:bg-[" + this.hoverColor() + "] tag--sm";
  }

}
