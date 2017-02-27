import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";

@Component({
  selector: 'app-apod-info-modal',
  templateUrl: './apod-info-modal.component.html',
  styleUrls: ['./apod-info-modal.component.scss']
})
export class ApodInfoModalComponent implements OnInit {

  apod;

  constructor(public dialogRef: MdDialogRef<ApodInfoModalComponent>) { }

  ngOnInit() {
    this.apod = this.dialogRef._containerInstance.dialogConfig.data.apod;
  }

}
