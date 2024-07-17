import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'angular-reactive-forms';

  reactiveForm: FormGroup;
  

  ngOnInit(): void {
      this.reactiveForm = new FormGroup({
        firstname: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
        email: new FormControl(null,[Validators.required, Validators.email]),
        username: new FormControl(null),
        dob: new FormControl(null),
        gender: new FormControl('male'),
        address: new FormGroup({
           street: new FormControl(null),
           country: new FormControl('India'),
           city: new FormControl(null),
           region: new FormControl(null),
           postal : new FormControl(null)
        }),

        skills: new FormArray([
          new FormControl(null, Validators.required),
        ]),
        experience: new FormArray([
          
        ])
       
        
      })
  }

  onFormSubmitted() {
    console.log(this.reactiveForm);
  }

  addSkills() {
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required))
  }
  deleteSkill(i:number) {
  //  const controls = (<FormArray>this.reactiveForm.get('skills'))
  //  controls.removeAt(i)

  (<FormArray>this.reactiveForm.get('skills')).removeAt(i);
  }

  addExperience(){
    const frmGroup = new FormGroup({
      compoany: new FormControl(null),
      position: new FormControl(null),
      totalExp: new FormControl(null),
      start   : new FormControl(null),
      end     : new FormControl(null)
    });
    (<FormArray>this.reactiveForm.get('experience')).push(frmGroup);

  }

  deleteExperience(index:number){
    const frmGroupArr = (<FormArray>this.reactiveForm.get('experience'));
    frmGroupArr.removeAt(index);
  }
}
