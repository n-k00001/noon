import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { GeoJSON } from 'geojson';
import { Control } from 'leaflet';
import { Observable, of, tap } from 'rxjs';
import { AddressDTO } from 'src/app/Models/address-dto';
import { City } from 'src/app/Models/city';
import { ProfileDTO } from 'src/app/Models/profile-dto';
import { UserAddressDTO } from 'src/app/Models/user-address-dto';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment.development';
import { v4 as uuidv4 } from 'uuid';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {


  user:ProfileDTO;
  countries:any[]=[]
  cities:any[]= [];
  cities_en:any[]=[];
  cities_ar:any[]=[];
  governorates:any[]=[]
  governorates_en:any[]=[]
  governorates_ar:any[]=[]
  userId:string|null=localStorage.getItem('userId');
  fullAddress:any;
  Address:AddressDTO ;
  UserAddress:UserAddressDTO ;


  constructor( private httpclient: HttpClient, private userService: UserService
    ) {
      this.fullAddress={

        fullAddress:'',
        selectedCountry:'Egypt',
        selectedGovernorate:'',
        selectedCity:'',
        street:'',
        location:'',
        building:'',
        near:'',
        deliverPhone:''
    
      }


      this.Address = {} as AddressDTO;
      this.UserAddress = {} as UserAddressDTO;
      this.user={} as ProfileDTO;

      this.userService.getUserProfile(this.email).subscribe(response=>
        {
          this.userId = response.id;
          this.UserAddress.userId= response.id;
          console.log(this.userId);
          console.log( this.UserAddress.userId);
        console.log(response);

        });



  }

 

  address: AddressDTO = {
    id:uuidv4(),
    firstName: '',
    lastName: '',
    fullAddress: ''  ,
    phoneNumber: '',
  };
  userAddress: UserAddressDTO = {
    id: uuidv4(),
    isDefault: false,
    addressId:  this.address.id,
    userId: this.userId,
  };
     
  onSubmit() {
    // Submit the form data
    console.log(this.address, this.userAddress);
  }



  email:string|null =  localStorage.getItem('email');

  ngOnInit(){


    this.userService.getCurrentUser().pipe(
      tap((response: ProfileDTO) => {
        this.user = response;

        console.log(this.user);
      })
    ).subscribe();



        // get countries
        const objs = this.getCountries().subscribe(response=>
          {
            const names = response.map((obj: { name: { common: any; }; }) => obj.name.common);
          //  console.log(names);
            this.countries= names;
            // console.log("get countries",this.countries)
           });
           // get cities
        this.httpclient.get<any>('./assets/cities.json').subscribe(data => {
          this.cities = data;
          this.cities_en = this.cities.map(city => city.city_name_en);
          this.cities_ar = this.cities.map(city => city.city_name_ar);
          // console.log(this.cities_ar);
          // console.log(this.cities_en);
        });

          // get governorates
        this.httpclient.get<any>('./assets/governorates.json').subscribe(data => {
          this.governorates = data;
          this.governorates_en = this.governorates.map(governorates => governorates.governorate_name_en);
          this.governorates_ar = this.governorates.map(governorates => governorates.governorate_name_ar);
          // console.log(this.governorates_ar);
          // console.log(this.governorates_en);
        });







      }



      getFullAddress():string{
    let fullAddress= this.fullAddress.selectedCountry + ' - ' + this.fullAddress.selectedGovernorate + ' - ' + this.fullAddress.selectedCity + ' - ' + this.fullAddress.street
    + ' - ' + this.fullAddress.near + 'bulding no:' + this.fullAddress.building +  ' - ' +' - Location type: ' + this.fullAddress.location
    console.log(this.fullAddress);
    return fullAddress
    }
      test(){
        console.log(this.fullAddress.selectedCountry)
      }
      testCity(){
        console.log(this.fullAddress.selectedCity)
      }
      testGov(){
        console.log(this.fullAddress.selectedGovernorate)
      }
getCountries():Observable<any>{

  return this.httpclient.get<any>('https://restcountries.com/v3.1/all')
}

CreateAddress(){
  let fullAddress= this.fullAddress.selectedCountry + ' - ' + this.fullAddress.selectedGovernorate + ' - ' + this.fullAddress.selectedCity + ' - ' + this.fullAddress.street
  + ' - ' + this.fullAddress.near + 'bulding no:' + this.fullAddress.building +  ' - ' +' - Location type: ' + this.fullAddress.location
  console.log(this.fullAddress);
this.Address.fullAddress= fullAddress;
console.log(this.Address.fullAddress);

  console.log( this.UserAddress.userId);

this.userService.createAddress(this.Address).subscribe({
  next:(data:AddressDTO)=>{
    console.log(data);
    this.CreateUserAddress()
  },
  error:( error:any)=>{
    console.error('failed to create address',error);
  },
  complete: () => {
    window.location.reload();
    }
});

}

CreateUserAddress(){
  this.userService.createUserAddress(this.UserAddress).subscribe({
    next:(data:UserAddressDTO)=>{
      console.log(data);
    },
    error:( error:any)=>{
      console.error('failed to create userAddress',error);
    }
  });
}



}
