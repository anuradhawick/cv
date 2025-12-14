import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  pressed = output<void>();
  label = input('');
  kind = input<'primary' | 'secondary' | 'ghost'>('primary');

  onClick(): void {
    this.pressed.emit();
  }
}
