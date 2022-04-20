import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {
  
  configForm : FormGroup;

  constructor(private fb : FormBuilder) { }

  ngOnInit() : void {
    this.configForm = this.fb.group({
      server: ['', Validators.required],
      organization: ['', Validators.required],
      pat_username: ['', Validators.required],
      products: this.fb.array([])
    });
  }

  addProduct() {
    const product = this.fb.group({
      svg_product_name: ['', Validators.required],
      headers: this.fb.array([]),
      numDays: ['', Validators.required],
      projects: this.fb.array([])
    });

    (this.configForm.get('products') as FormArray).push(product);
  }
   
  removeProduct(i : number) {
    (this.configForm.get('products') as FormArray).removeAt(i);
  }

  addHeader(headersFormArray : FormArray) {
    const header = this.fb.control('');

    headersFormArray.push(header);
  }

  removeHeader(headersFormArray : FormArray, i : number) {
    headersFormArray.removeAt(i);
  }

  addProject(projectsFormArray : FormArray) {
    const project = this.fb.group({
      project_name: '',
      pipelines: this.fb.array([])
    })

    projectsFormArray.push(project);
  }
  
  removeProject(projectsFormArray : FormArray, i : number) {
    projectsFormArray.removeAt(i);
  }

  onSubmit() {
    console.log(this.configForm.value);
  }
}