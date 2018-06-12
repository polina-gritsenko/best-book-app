import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AlertType } from '@app/shared/alert-type';

@Component({
  selector: 'best-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit {

  public alertClass: string;
  public isOpen: boolean;

  @Input() set showAlert(isOpen: boolean) {
    if (isOpen) {
      this.isOpen = isOpen;
    }
  }
  @Input() alertMessage: string;

  @Input() set alertType(type: AlertType) {
    switch (type) {
      case AlertType.Success:
        this.alertClass = 'alert-success';
        break;
      case AlertType.Error:
        this.alertClass = 'alert-danger';
        break;
      default:
        this.alertClass = 'alert-info';
        break;
    }
  }

  constructor() { }

  hideAlert() {
    this.isOpen = false;
  }

  ngOnInit() {
  }

}
