import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CustomValidators } from './validators/noSpaceAllowed.validators';
import { CustomAsyncValidator } from './validators/AsyncCustom.validators';

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
  
  formStatus: string = '';

  formdata:any = '';

  ngOnInit(): void {
      this.reactiveForm = new FormGroup({
        firstname: new FormControl(null,[Validators.required, CustomValidators.noSpaceAllowed]),
        lastname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
        email: new FormControl(null,[Validators.required, Validators.email]),
        username: new FormControl(null, Validators.required, CustomAsyncValidator.checkUsername),
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
      
      // this.reactiveForm.get('firstname').valueChanges.subscribe((value)=> {
      //   console.log(value)
      // })

      // this.reactiveForm.valueChanges.subscribe((data)=> {
      //   console.log(data.lastname)
      // })

      // this.reactiveForm.get('email').statusChanges.subscribe((statusData) => {
      //   console.log(statusData)
      // })

      // this.reactiveForm.get('username').statusChanges.subscribe((statusData) => {
      //   console.log('username ',statusData)
      // })

      this.reactiveForm.statusChanges.subscribe((status) => {
        console.log('form status ', status)
        this.formStatus = status
      })
  }

  onFormSubmitted() {
    console.log(this.reactiveForm.value);
    this.formdata = this.reactiveForm.value;
    this.reactiveForm.reset({
      firstname: null,
      lastname: null,
      email: null,
      username: null,
      dob: null,
      gender: 'male',
      address:{
         street: null,
         country: 'America',
         city:null,
         region: null,
         postal :null
      },

      skills: [],
      experience: []
    });
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

  generateUsername(){
    let username = '';
    const fName = this.reactiveForm.get('firstname').value;
    const lName = this.reactiveForm.get('lastname').value;
    const dob = this.reactiveForm.get('dob').value;

    if(fName.length >=3) username+= fName.slice(0,3);
    else username += fName;
    if(lName.length >=3) username +=lName.slice(0,3);
    else username += lName;
    
    let dateTime = new Date(dob);
    username += dateTime.getFullYear();

    username = username.toLowerCase();
    // console.log(username);

    // this.reactiveForm.setValue({
    //   firstname: this.reactiveForm.get('firstname').value,
    //   lastname:this.reactiveForm.get('lastname').value,
    //   email: this.reactiveForm.get('email').value,
    //   username: username,
    //   dob: this.reactiveForm.get('dob').value,
    //   gender: this.reactiveForm.get('gender').value,
    //   address:{
    //      street: this.reactiveForm.get('address.street').value,
    //      country: this.reactiveForm.get('address.country').value,
    //      city: this.reactiveForm.get('address.city').value,
    //      region:this.reactiveForm.get('address.region').value,
    //      postal :this.reactiveForm.get('address.postal').value
    // },
    //   skills:this.reactiveForm.get('skills').value,
    //   experience:this.reactiveForm.get('experience').value
    // })

    // this.reactiveForm.get('username').setValue(username);

    this.reactiveForm.patchValue({
      username : username,
      address: {
        city:'Delaware'
      }
    })
  }
}
