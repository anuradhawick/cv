import { Component, input, model, output } from '@angular/core';
import { Field, FormCheckboxControl, FormUiControl } from '@angular/forms/signals';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class Checkbox implements FormCheckboxControl {
  title = input('');
  description = input('');

  checked = model<boolean>(false);

  onToggleChecked(): void {
    this.checked.update((val) => !val);

    console.log(`Checkbox "${this.title()}" checked: ${this.checked()}`);
  }
}
