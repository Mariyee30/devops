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
            pipelines: [
              {
                build: [],
                release: [],
              }
            ]
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
  get productsForm() : FormArray {
    return this.form.get('products') as FormArray;
  }

  products = this.fb.group({
    svg_product_name: '',
    headers: this.fb.array([new FormControl('test')]),
    numDays: '',
    projects: this.fb.array([])
  })

  setProduct() {
    this.data.products.forEach(x => {
      this.productsForm.push(
        this.fb.group({
          svg_product_name: x.svg_product_name,
          headers: this.fb.array([new FormControl('test')]),
          numDays: x.numDays,
          projects: this.setProject(x)
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
    pipelines: this.fb.array([])
  })

  setProject(x) {
    let arr = new FormArray([]);
    x.projectsForm.forEach(y => {
      arr.push(
        this.fb.group({
          project_name: y.project_name,
          pipelines: this.setPipeline(x)
        })
      );
    })
    return arr;
  }

  addProject(control) {
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

  // PIPELINES
  get pipelinesForm() : FormArray {
    return this.projects.get('pipelines') as FormArray;
  }

  pipelines = this.fb.group({
    build: this.fb.array([]),
    release: this.fb.array([])
  })

  setPipeline(x) {
    let arr = new FormArray([]);
    x.pipelinesForm.forEach(y => {
      arr.push(
        this.fb.group({
          build: this.setBuild(x),
          release: this.fb.array([])
        })
      );
    })
    return arr;
  }

  addPipeline(control) {
    control.push(
      this.fb.group({
        build: this.fb.array([]),
        release: this.fb.array([])
      })
    )
  }

  deletePipeline(control, index) {
    control.removeAt(index);
  }

  // BUILD
  get buildsForm() : FormArray {
    return this.pipelines.get('build') as FormArray;
  }

  builds = this.fb.group({
    buildUserDefined: this.fb.array([])
  })

  setBuild(x) {
    let arr = new FormArray([]);
    x.buildsForm.forEach(y => {
      arr.push(
        this.fb.group({
          id: y.id,
          stages: this.setStage(x)
        })
      );
    })
    return arr;
  }

  addBuild(control) {
    control.push(
      this.fb.group({
        buildUserDefined: this.fb.array([
          this.fb.group({
            id: [''],
            stages: this.fb.array([])
          }) 
        ])
      })
    )
  }

  deleteBuild(control, index) {
    control.removeAt(index);
  }

  // Build User Defined Form
  get buildUserDefinedForm() : FormArray {
    return this.pipelines.get('build') as FormArray;
  }

  buildUserDefined = this.fb.group({
    id: [''],
    stages: this.fb.array([])
  })

  setBuildUser(x) {
    let arr = new FormArray([]);
    x.buildUserDefinedForm.forEach(y => {
      arr.push(
        this.fb.group({
          id: y.id,
          stages: this.setStage(x)
        })
      );
    })
    return arr;
  }

  addBuildUser(control) {
    control.push(
      this.fb.group({
        id: [''],
        stages: this.fb.array([])
      })
    )
  }

  deleteBuildUser(control, index) {
    control.removeAt(index);
  }

  // BUILD STAGES
  get stagesForm() : FormArray {
    return this.buildUserDefined.get('stages') as FormArray;
  }

  stages = this.fb.group({
    id: [''],
    stages: this.fb.array([])
  })

  setStage(x) {
    let arr = new FormArray([]);
    x.stagesForm.forEach(y => {
      arr.push(
        this.fb.group({
          name: y.name,
          alias: y.alias
        })
      );
    })
    return arr;
  }

  addStage(control) {
    control.push(
      this.fb.group({
        name: [''],
        alias: ['']
      })
    )
  }

  deleteStage(control, index) {
    control.removeAt(index);
  }

  // RELEASE
  get releaseForm() : FormArray {
    return this.pipelines.get('release') as FormArray;
  }

  releases = this.fb.group({
    releaseUserDefined: this.fb.array([])
  })

  setRelease(x) {
    let arr = new FormArray([]);
    x.buildsForm.forEach(y => {
      arr.push(
        this.fb.group({
          user: this.setReleaseUser(x)
        })
      );
    })
    return arr;
  }

  addRelease(control) {
    control.push(
      this.fb.group({
        releaseUserDefined: this.fb.array([])
      })
    )
  }

  deleteRelease(control, index) {
    control.removeAt(index);
  }

  // Release User Defined Form
  get releaseUserDefinedForm() : FormArray {
    return this.pipelines.get('release') as FormArray;
  }

  releaseUserDefined = this.fb.group({
    id: [''],
    stages: this.fb.array([])
  })

  setReleaseUser(x) {
    let arr = new FormArray([]);
    x.buildUserDefinedForm.forEach(y => {
      arr.push(
        this.fb.group({
          id: y.id,
          stages: this.setStage(x)
        })
      );
    })
    return arr;
  }

  addReleaseUser(control) {
    control.push(
      this.fb.group({
        id: [''],
        stages: this.fb.array([])
      })
    )
  }

  deleteReleaseUser(control, index) {
    control.removeAt(index);
  }

}