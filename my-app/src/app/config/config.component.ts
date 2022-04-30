import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {

  ngOnInit() : void {}

  form : FormGroup;
  form2 : FormGroup;

  constructor(private fb : FormBuilder){
    this.form = this.fb.group({
      user: '',
      directory: '',
      filename: new FormArray([new FormControl('test')])
    });

    this.form2 = this.fb.group({
      products: this.fb.array([])
    });
  }

  products = this.fb.group({
    headers: this.fb.array([new FormControl('test')]),
  })

  get productsForm() : FormArray {
    return this.form2.get('products') as FormArray;
  }

  setProducts() {
    this.data.products.forEach(x => {
      this.productsForm.push(
        this.fb.group({
          headers: this.fb.array([new FormControl('test')]),
        })
      );
    })
  }

  addProduct() {
    this.productsForm.push(
      this.fb.group({
        headers: this.fb.array([new FormControl('test')]),
      })
    );
  }

  deleteProduct(index) {
    this.productsForm.removeAt(index);
  }

  addHeader(control){
    const form2 = new FormControl('');
    control.push(
      (<FormArray>this.form2.controls['headers']).push(form2)
    )
  }
  addNewHeader(control) {
    control.push(
      this.fb.control('')
    )
  }

  deleteHeader(control, index) {
    control.removeAt(index);
  }

  addFormInput(){
    const form=new FormControl('');
    (<FormArray>this.form.controls['filename']).push(form);
  }

  removeFormInput(i){
    (<FormArray>this.form.get('filename')).removeAt(i);
  }
  

  data = {
    server: '',
    organization: '',
    pat_username: '',
    products: [
      {
        svg_product_name: '',
        headers: [
          ""
        ],
        numDays: '',
      }
    ]
  }

  /*
  ngOnInit() : void {}

  configForm : FormGroup;

  constructor(private fb : FormBuilder) {
    this.configForm = this.fb.group({
      server: ['', Validators.required],
      organization: ['', Validators.required],
      pat_username: ['', Validators.required],
      products: this.fb.array([])
    })
  }

  products = this.fb.group({
    svg_product_name: [''],
    headers: this.fb.array([]),
    numDays: [''],
    projects: this.fb.array([])
  })

  data = {
    server: 'azure',
    organization: 'organization',
    pat_username: 'devopsMetrics',
    //
    products: [
      {
        svg_product_name: '',
        headers: [
          ""
        ],
        numDays: '',
        //
        projects: [
          {
            project_name: '',
            //
            pipelines: {
              build: [
                {
                  // buildName is defined by the user
                  buildName: {
                    id: '',
                    stages: [
                      {
                        name: '',
                        alias: ''
                      }
                    ]
                  }
                }
              ],
              release: [
                {
                  releaseName: {
                    id: '',
                    stages: [
                      {
                        name: '',
                        alias: ''
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    ]
  }

  get productsFormArray() : FormArray {
    return this.configForm.get('products') as FormArray;
  }

  setProducts() {
    this.data.products.forEach(x => {
      this.productsFormArray.push(
        this.fb.group({
          svg_product_name: x.svg_product_name,
          headers: this.setHeaders(x),
          numDays: x.numDays,
          projects: this.setProjects(x)
        })
      );
    })
  }

  addNewProduct() {
    this.productsFormArray.push(
      this.fb.group({
        svg_product_name: [''],
        headers: [''],
        numDays: [''],
        projects: this.fb.array([])
      })
    );
  }

  deleteProduct(index) {
    this.productsFormArray.removeAt(index);
  }

  setHeaders(x) {
    let arr = new FormArray([]);
    x.headers.forEach(y => {
      arr.push(
        this.fb.group({
          header: y.header
        })
      );
    })
    return arr;
  }

  addNewHeader(control) {
    control.push(
      this.fb.control('')
    )
  }

  deleteHeader(control, index) {
    control.removeAt(index);
  }

  setProjects(x) {
    let arr = new FormArray([]);
    x.projects.forEach(y => {
      arr.push(
        this.fb.group({
          project_name: y.project_name,
          pipelines: this.setPipelines(x)
        })
      );
    })
    return arr;
  }

  addNewProject(control) {
    control.push(
      this.fb.group({
        project_name: [''],
        pipelines: this.fb.array([]),
      })
    )
  }

  deleteProject(control, index) {
    control.removeAt(index);
  }

  setPipelines(x) {
    x.projects.forEach(y => {
      build: y.build;
    })
  }

  addNewPipeline(control) {
    control.push(
      this.fb.group({
        build: ['']
      })
    )
  }

  deletePipeline(control, index) {
    control.removeAt(index);
  }

  onSubmit() {
    console.log(this.configForm.value);
  }
*/
}