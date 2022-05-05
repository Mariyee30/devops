import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

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

  constructor(private fb : FormBuilder, private clipboard: Clipboard){
    this.form = this.fb.group({
      server: '',
      organization: '',
      pat_username: '',
      products: this.fb.array([])
    });
  }

  public copy() {
    // replace this object with your data
    const object = this.form.value;

    // Note the parameters
    this.clipboard.copy(JSON.stringify(object, null, 2));
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
  // *TODO : Pipelines is supposed to only be a group of objects, could not get to work without implementing array.
  // Reference working config.json in repo for format.
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
          buildUserDefined: this.setBuildUser(x)
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
  // *TODO : Build User Defined Form is supposed to only be a group of objects, could not get to work without implementing array.
  // Reference working config.json in repo for format.
  // User shoud also be able to rename this key to whatever they want.
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
          stages: this.setBuildStage(x)
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
  get buildStagesForm() : FormArray {
    return this.buildUserDefined.get('stages') as FormArray;
  }

  buildStages = this.fb.group({
    id: [''],
    stages: this.fb.array([])
  })

  setBuildStage(x) {
    let arr = new FormArray([]);
    x.buildStagesForm.forEach(y => {
      arr.push(
        this.fb.group({
          name: y.name,
          alias: y.alias
        })
      );
    })
    return arr;
  }

  addBuildStage(control) {
    control.push(
      this.fb.group({
        name: [''],
        alias: ['']
      })
    )
  }

  deleteBuildStage(control, index) {
    control.removeAt(index);
  }

  // RELEASE
  get releasesForm() : FormArray {
    return this.pipelines.get('release') as FormArray;
  }

  releases = this.fb.group({
    releaseUserDefined: this.fb.array([])
  })

  setRelease(x) {
    let arr = new FormArray([]);
    x.releasesForm.forEach(y => {
      arr.push(
        this.fb.group({
          releaseUserDefined: this.setReleaseUser(x)
        })
      );
    })
    return arr;
  }

  addRelease(control) {
    control.push(
      this.fb.group({
        releaseUserDefined: this.fb.array([
          this.fb.group({
            id: [''],
            stages: this.fb.array([])
          }) 
        ])
      })
    )
  }

  deleteRelease(control, index) {
    control.removeAt(index);
  }

  // Release User Defined Form
  // *TODO : Release User Defined Form is supposed to only be a group of objects, could not get to work without implementing array.
  // Reference working config.json in repo for format.
  // User shoud also be able to rename this key to whatever they want.
  get releaseUserDefinedForm() : FormArray {
    return this.pipelines.get('release') as FormArray;
  }

  releaseUserDefined = this.fb.group({
    id: [''],
    stages: this.fb.array([])
  })

  setReleaseUser(x) {
    let arr = new FormArray([]);
    x.releaseUserDefinedForm.forEach(y => {
      arr.push(
        this.fb.group({
          id: y.id,
          stages: this.setReleaseStage(x)
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

  // RELEASE STAGES
  get releaseStagesForm() : FormArray {
    return this.releaseUserDefined.get('stages') as FormArray;
  }

  releaseStages = this.fb.group({
    id: [''],
    stages: this.fb.array([])
  })

  setReleaseStage(x) {
    let arr = new FormArray([]);
    x.releaseStagesForm.forEach(y => {
      arr.push(
        this.fb.group({
          name: y.name,
          alias: y.alias
        })
      );
    })
    return arr;
  }

  addReleaseStage(control) {
    control.push(
      this.fb.group({
        name: [''],
        alias: ['']
      })
    )
  }

  deleteReleaseStage(control, index) {
    control.removeAt(index);
  }
  
}