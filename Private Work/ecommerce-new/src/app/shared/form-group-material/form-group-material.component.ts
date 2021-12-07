import { EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NameId } from 'src/app/model/name-id';

@Component({
  selector: 'app-form-group-material',
  templateUrl: './form-group-material.component.html',
  styleUrls: ['./form-group-material.component.scss'],
})
export class FormGroupMaterialComponent implements OnInit {
  @Input() fieldLabel: string;
  @Input() hint: string;
  @Input() inputType: string;
  @Input() inputPlaceholder: string;
  @Input() control: FormControl;
  @Input() dataSource: NameId[];
  @Output() changeValue: EventEmitter<number>;

  constructor() {
    this.fieldLabel = '';
    this.hint = '';
    this.inputType = '';
    this.inputPlaceholder = '';
    this.control = new FormControl();
    this.dataSource = [];
    this.changeValue = new EventEmitter();
  }

  ngOnInit(): void {}

  onChangeValue(event: any): void {
    if (event && event.value) {
      const id = event.value;
      this.changeValue.emit(+id);
    }
  }
}
