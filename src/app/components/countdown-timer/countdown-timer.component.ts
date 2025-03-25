import { Component, input, model, output, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent, CountdownModule } from 'ngx-countdown';

@Component({
  selector: 'app-countdown-timer',
  imports: [CountdownComponent],
  templateUrl: './countdown-timer.component.html',
  styleUrl: './countdown-timer.component.scss'
})
export class CountdownTimerComponent {
    // props
    config = model<CountdownConfig>({
      demand: true,
      leftTime: 10,
      format: 'mm:ss',
      notify: 0
    });
    localStorageVariable = input<string>("");
    onDoneEventEmitter = output<CountdownEvent>();
    onNotifyEventEmitter = output<CountdownEvent>();

    @ViewChild(CountdownComponent) private countdown!: CountdownComponent;

    // methods
    handleEvent(e: CountdownEvent): void {
      if (e.action === 'done') {
        this.onDoneEventEmitter.emit(e);
      }
  
      if (e.action === 'notify') {
        // Save remaining time to localStorage
        localStorage.setItem(this.localStorageVariable(), e.left.toString());
        this.onNotifyEventEmitter.emit(e);
      }
    }

    restart(countdownTime: number): void {
      // remove localStorage when countdown to 0
      localStorage.setItem(this.localStorageVariable(), Number(countdownTime).toString());
      this.config.set({
        ...this.config(),
        leftTime: countdownTime
      });
    }
}
