import { AbstractControl } from "@angular/forms";

export class CustomAsyncValidator {
    static checkUsername (control:AbstractControl): Promise<any> {
        return userNameNotAllowed(control.value);
    }
}


    function userNameNotAllowed(username:string) {
        const takenUsernames =['johnsmith', 'manojjha','sarahking'];
        return new Promise((resolve, reject)=> {
          setTimeout(()=> {
            if(takenUsernames.includes(username)) {
                resolve({checkUsername: true})
            } else {
                resolve(null);
            }
          },5000)  
        });
    

    }
