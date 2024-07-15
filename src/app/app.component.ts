import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
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
        firstname: new FormControl(null),
        lastname: new FormControl(null),
        email: new FormControl(null),
        username: new FormControl(null),
        dob: new FormControl(null),
        gender: new FormControl(null),
        street: new FormControl(null),
        country: new FormControl(null),
        city: new FormControl(null),
        region: new FormControl(null),
        postal : new FormControl(null)
        
      })
  }


}
