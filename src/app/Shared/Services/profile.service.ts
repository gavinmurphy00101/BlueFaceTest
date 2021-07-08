import { Injectable } from '@angular/core';
import { ​IProfile } from '../Modals/iProfile.modal'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public declare user : IProfile;

  constructor() { }

  getProfileUser​(): Promise<IProfile> {
    ​return new ​Promise​((resolve​, ​reject) => {​
      setTimeout​(() => {​
        if ​(​Math​.​round​(​Math​.​random​())) {

        ​this​.​user ​= {
        ​firstName ​: ​'Michael'​,
        ​lastName  ​: ​'Collins'​,
        ​username  ​: ​'michael.collins'​,
        ​age       ​: ​30,
        email     : ''
      }​;
        ​resolve(​this​.​user​)​;
        
        ​} ​else ​{         
          reject({ ​error​: ​'Profile not found' ​})​;​}
        }​, ​Math​.​random​() * ​5000​)​;
      
      ​})​;​
    }​
             
  setName​(firstName: ​string​, lastName: string) {​

      return new ​Promise​((resolve​, ​reject) => {​
      setTimeout​(() => {

        ​if ​(​Math​.​round​(​Math​.​random​())) {
          ​this​.​user​.​firstName ​= firstName​;
          ​this​.​user​.lastName ​= lastName​;
          ​this.setUserEmail(firstName​, lastName​)
          .then(res =>{
            this​.​user​.​email ​= res;
            resolve(​this​.​user​)​;
          })
          .catch(err => {
            ​reject({ ​error​: ​'Error on email generation' ​})​;
          })
        ​} ​else ​{         
          reject({ ​error​: ​'Invalid name' ​})​;​
        }    

      }​, ​Math​.​random() * 5000);

    });   
  }

  setUserEmail(firstName​: string, lastName​​: string) : Promise<string> {​
    return new ​Promise​((resolve​, ​reject) => {​
      setTimeout​(() => {
        ​if ​(​Math​.​round​(​Math​.​random​())) {
         let email: string = firstName​.trim().toLowerCase() + lastName.trim().toLowerCase() + '@blueface.com';
          ​return resolve(email)
        ​} ​else ​{         
          reject({ ​error​: ​'Invalid name' ​})​;​
        }     
      }​, ​Math​.​random() * 5000);
    });       
  }
}
