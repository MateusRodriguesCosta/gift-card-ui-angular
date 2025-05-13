import { Component, Input } from '@angular/core';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-edit-card-dialog',
    imports: [
        Dialog
    ],
  templateUrl: './edit-card-dialog.component.html',
  styleUrl: './edit-card-dialog.component.scss'
})
export class EditCardDialogComponent {
  @Input() visible: boolean = false;

}
