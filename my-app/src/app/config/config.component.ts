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
        projects: [
          {
            project_name: '',
            pipelines: ({})
          }
        ]
      }
    ]
  }

  constructor(private fb : FormBuilder){
    this.form = this.fb.group({
      server: '',
      organization: '',
      pat_username: '',
      products: this.fb.array([])
    });
  }

  // PRODUCTS
  products = this.fb.group({
    svg_product_name: '',
    headers: this.fb.array([new FormControl('test')]),
    numDays: '',
    projects: this.fb.array([])
  })

  get productsForm() : FormArray {
    return this.form.get('products') as FormArray;
  }

  setProducts() {
    this.data.products.forEach(x => {
      this.productsForm.push(
        this.fb.group({
          svg_product_name: x.svg_product_name,
          headers: this.fb.array([new FormControl('test')]),
          numDays: x.numDays,
          projects: this.setProjects(x)
        })
      );
    })
  }

  addProduct() {
    this.productsForm.push(
      this.fb.group({
        svg_product_name: [''],
        headers: this.fb.array([new FormControl('test')]),
        numDays: [''],
        projects: this.fb.array([]),
      })
    );
  }

  deleteProduct(index) {
    this.productsForm.removeAt(index);
  }

  // HEADERS
  get headersForm() : FormArray {
    return this.products.get('headers') as FormArray;
  }

  addHeader(control) {
    const form = new FormControl('');
    control.push(form);
  }

  deleteHeader(control, index) {
    control.removeAt(index);
  }

  // PROJECTS
  get projectsForm() : FormArray {
    return this.products.get('projects') as FormArray;
  }

  projects = this.fb.group({
    project_name: '',
    pipelines: this.fb.group({})
  })

  setProjects(x) {
    let arr = new FormArray([]);
    x.projects.forEach(y => {
      arr.push(
        this.fb.group({
          project_name: y.project_name,
          pipelines: this.fb.group({})
        })
      );
    })
    return arr;
  }

  addProject(control) {
    control.push(
      this.fb.group({
        project_name: [''],
        pipelines: this.fb.group({})
      })
    )
  }

  deleteProject(control, index) {
    control.removeAt(index);
  }

  // PIPELINES
  get pipelinesForm() : FormGroup {
    return this.projects.get('pipelines') as FormGroup;
  }

  pipelines = this.fb.group({
    build: this.fb.array([]),
    release: this.fb.array([])
  })

  setPipelines(x) {
    x.projects.forEach(y => {
      this.fb.group({
        build: this.fb.array([]),
        release: this.fb.array([])
      })
    })
  }

  /*
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