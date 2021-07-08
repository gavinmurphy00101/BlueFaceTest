import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ​IProfile } from '../../Modals/iProfile.modal'
import { ProfileService } from '../../Services/profile.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit{

  private max = 20
  public displayLoading : boolean = false;
  public displaySaving : boolean = false;
  public displayError : boolean = false;
  public ​title ​= ​'Profile'​; 
  declare public ​user​: IProfile​; 
  public myGroup: FormGroup;
  public errorMessage: any;
  
  constructor​(​
    private ​profile​: ProfileService,


  ) { 
    this.myGroup = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl()
   });
  }​

  private rejectDelay(reason: any) : Promise<any>{
    return new Promise(function(resolve, reject) {

        setInterval(() => {
          reject.bind(null, reason);
        },300)  
      });
  }

  private callService() : void{
    for(let i = 0; i < this.max; i++){

      this.profile.getProfileUser()
        .then(res =>{
          this.updateUserForm(res);
          return this.user = res;
          
      })
        .catch(err => {
          this.rejectDelay(err);
      })
      .finally(() => {
        this.displayLoading = false
      })
    }
  }

  private updateUserForm(data​: any) : void{
    this.myGroup.controls['firstName'].setValue(data.firstName);
    this.myGroup.controls['lastName'].setValue(data.lastName);
    data.email ? this.myGroup.controls['email'].setValue(data.email) : null
  }

  public clearError() : void{
    this.displayError = false;
  }

  public saveProfile​() : void{
    this.displaySaving = true;
    this.clearError();

   this.profile.setName(this.myGroup.value.firstName, this.myGroup.value.lastName)
     .then(res => {
       this.displaySaving = false;
       this.updateUserForm(res);
       return;
     })
     .catch(err => {
       if(err.error === "Error on email generation"){
         this.profile.getProfileUser();
       }
       
       this.errorMessage = err.error;
       this.displayError = true;
       
     })
     .finally(()=> this.displaySaving = false);
 }
 
  ngOnInit​() {
    this.displayLoading = true
    this.callService(); 
  }​ 
}
