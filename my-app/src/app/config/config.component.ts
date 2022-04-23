import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {

  data = {
    server: 'azure',
    organization: 'organization',
    pat_username: 'devopsMetrics',
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

  configForm : FormGroup;
  headersArray : FormArray;

  constructor(private fb : FormBuilder) {
    this.configForm = this.fb.group({
      server: ['', Validators.required],
      organization: ['', Validators.required],
      pat_username: ['', Validators.required],
      products: this.fb.array([])
    })

    this.setProducts();
  }

  ngOnInit() : void {}

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
        pipelines: this.fb.array([])
      })
    )
  }

  deleteProject(control, index) {
    control.removeAt(index);
  }

  setPipelines(x) {
    let arr = new FormArray([]);
    x.projects.forEach(y => {
      arr.push(
        this.fb.group({
          pipeline: y.pipeline
        })
      );
    })
    return arr;
  }

  addNewPipeline(control) {
    control.push(
      this.fb.group({
        pipeline: ['']
      })
    )
  }

  deletePipeline(control, index) {
    control.removeAt(index);
  }

  onSubmit() {
    console.log(this.configForm.value);
  }

}