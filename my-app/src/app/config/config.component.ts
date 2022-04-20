import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {

  ngOnInit(): void {
  }

  contact = {
    firstName: 'Harry',
    lastName: 'Potter',
    contacts: [{ phoneNo: '555-55-555', emailAddr: 'harry@potter.com' }]
  }

  form: FormGroup = this.formBuilder.group({
    firstName: this.contact.firstName,
    lastName: this.contact.lastName,
    contacts: this.buildContacts(this.contact.contacts)
  });

  constructor(private formBuilder: FormBuilder) {}

  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  buildContacts(contacts: {phoneNo: string; emailAddr: string;}[] = []) {
    return this.formBuilder.array(contacts.map(contact => this.formBuilder.group(contact)));
  }

  addContactField() {
    this.contacts.push(this.formBuilder.group({phoneNo: null, emailAddr: null}))
  }

  removeContactField(index: number): void {
    if (this.contacts.length > 1) this.contacts.removeAt(index);
    else this.contacts.patchValue([{phoneNo: null, emailAddr: null}]);
  }

  submit(value: any): void {
    console.log(value)
  }

  reset(): void {
    this.form.reset();
    this.contacts.clear();
    this.addContactField();
  }
}