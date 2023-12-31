import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Iproduct } from 'src/app/Models/iproduct';
import { IRegist } from 'src/app/Models/iregist';
import { LogIn } from 'src/app/Models/log-in';
import { ProductBrandDTO } from 'src/app/Models/product-brand-dto';
import { ProductCategoryDetailsDTO } from 'src/app/Models/product-category-details-dto';
import { ProductCategoryDTO } from 'src/app/Models/product-category-dto';
import { UserAddressDTO } from 'src/app/Models/user-address-dto';
import { UserDTO } from 'src/app/Models/user-dto';
import { AccountService } from 'src/app/Services/account.service';
import { BrandsService } from 'src/app/Services/brands.service';
import { CatogriesService } from 'src/app/Services/catogries.service';
import { ProductService } from 'src/app/Services/product.service';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  searchTerm:string='';
  catogries: any[] = [];
  signInForm!: FormGroup;
  login!: LogIn;
  user : UserDTO | undefined;
  registrationForm ! : FormGroup  ;
  register :IRegist ={DisplayName:'',FirstName:'',LastName:'',Email:'',Password:'',PhoneNumber:''} ;
  childrenCategories  ?: ProductCategoryDTO[] | null;
  isLogIn: boolean;
  catId: number = 0;
  products: Iproduct[] | undefined = undefined;
  counter:string|null;

  // constructor(private router:Router, private catogriesService: CatogriesService, private formBuilder: FormBuilder, private accountService: AccountService, private productsevice:ProductService ,private http :HttpClient) {



  brands: ProductBrandDTO[] = [];
  userAddress!: UserAddressDTO;
  userId:string= "f7caa6d4-d3e9-4a95-8796-921ae79d8775";

  constructor(private userServices:UserService,private productBrandService: BrandsService,private router:Router, private catogriesService: CatogriesService, private formBuilder: FormBuilder, private accountService: AccountService,
    private product:ProductService ,private http :HttpClient) {
    this.registrationForm = this.formBuilder.group({
      DisplayName: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: [''],
      Password: ['', [Validators.required, Validators.minLength(6)]],

    });


    this.isLogIn = false;
    this.counter= localStorage.getItem('counter');
setInterval(()=>
{
  this.counter= localStorage.getItem('counter');
},5000)
   }

   selectedParentCategory: ProductCategoryDetailsDTO | null = null;

  ngOnInit():void {
    this.catogriesService.getAllCatogries().subscribe({
      next: (data: ProductCategoryDetailsDTO[]) => {
        this.catogries = data.filter((category) => category.parentCategoryId === null);
        console.log(this.catogries);
      },
      error: (error: any) => {
        console.error('Error fetching brands:', error);
      },
      complete: () => {
        console.log('Fetching brands completed.');
      }
    });
    this.catogriesService.getAllCatogries().subscribe({
      next: (data) => {
        this.childrenCategories = data.filter((category) => category.parentCategoryId != null);
        console.log(this.catogries);
      },
      error: (error: any) => {
        console.error('Error fetching brands:', error);
      },
      complete: () => {
        console.log('Fetching brands completed.');
      }
    });

    this.productBrandService.getAllBrands().subscribe({
      next: (data: ProductBrandDTO[]) => {
        this.brands = data;
        console.log("brand:", this.brands);
      },
      error: (error: any) => {
        console.error('Error fetching brands:', error);
      },
      complete: () => {
        console.log('Fetching brands completed.');
      }
    });



    //sign in
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });



  }

  brandNavigate(brdId: number) {


    this.router.navigate(['brd', brdId]);
    console.log( 'brdId:', brdId)
 }


  categoryNavigate(catId: number) {


     this.router.navigate(['cat', catId]);
     console.log( 'catId:', catId)
  }

  //sign in
  log() {
    this.login.Email = this.signInForm.value.email;
    this.login.Password = this.signInForm.value.password;
    console.log('Email:', this.login.Email);
    console.log('Password:', this.login.Password);
    console.log("nnnnnnnnnn")

    this.accountService.logIn(this.login).subscribe(
      {
        next: (data: UserDTO) => {
          this.user = data;
          console.log(this.user);          
          localStorage.setItem("token",this.user.token);
          localStorage.setItem("email", this.user.Email);
          localStorage.setItem("username", this.user.DisplayName);
        },
        error: (error: any) => {
          console.error('Error LogIn:', error);
        },
        complete: () => {
          console.log('Fetching brands completed.');
          this.isLogIn = true;

        }
      }
    );


    this.userServices.allAddressForUser(this.userId).subscribe(data =>{
      this.userAddress = data;
      localStorage.setItem('userAddress', JSON.stringify(this.userAddress));
    })

    if (this.signInForm.invalid) {
      return;
  }  //hestucaspo@gufum.com
  var p : string ="Huj3#jiS";
    // Perform the sign-in logic here


    // For demonstration purposes, you can log the email and password
    console.log('Email:', this.login.Email);
    console.log('Password:', this.login.Password);
  }




  /////////////////register /////////////////

  get fullname(){
    return this.registrationForm.get('DisplayName');
  }
  get firstname(){
    return this.registrationForm.get('FirstName');
  }
  get lastname(){
    return this.registrationForm.get('LastName');
  }
  get email(){
    return this.registrationForm.get('Email');
  }
  get phonenumber(){
    return this.registrationForm.get('PhoneNumber')
  }
  get password(){
    return this.registrationForm.get('Password')
  }


  onSubmit() {
    this.register.DisplayName= this.registrationForm.value.DisplayName;
    console.log(this.registrationForm.value.DisplayName);
    this.register.FirstName= this.registrationForm.value.FirstName;
    console.log(this.register);

    this.register.LastName= this.registrationForm.value.LastName;
    this.register.Email = this.registrationForm.value.Email;
    this.register.PhoneNumber = this.registrationForm.value.PhoneNumber
    this.register.Password = this.registrationForm.value.Password;

    this.accountService.regist(this.register).subscribe({
      next:(response:any)=>{
        //this.router.navigate(['/home']);
        console.log(response);
        localStorage.setItem("token",response.token);
        localStorage.setItem("email", response.email);
        localStorage.setItem("username", response.displayName);

      },
      error:(err)=>{
        console.log(err);
      }
    })

  }

SignUpUser: any = {

  DisplayName:"",
  FirstName: "",
  LastName: "",
  Password: "",
  Email: "",
  PhoneNumber: ""
};
LoginInUser:any= {
  Email: "",
  Password: "",
}

OnSignUp(){

  this.SignUpUser.DisplayName = this.SignUpUser.FirstName + " " + this.SignUpUser.LastName;
  this.http.post("http://localhost:5216/api/Account/register", this.SignUpUser).subscribe(res=>{

})
}

OnLogIn(){
  debugger;
  this.http.post("http://localhost:5216/api/Account/login", this.LoginInUser).subscribe((response: any)=>{
    debugger;
    console.log(this.LoginInUser.Email);
    console.log(this.LoginInUser.Password);
    localStorage.setItem("token",response.token);
    localStorage.setItem("email", response.email);
    localStorage.setItem("username", response.displayName);
    if(response.result) {
      console.log(response);
      localStorage.setItem("token",response.token);
      localStorage.setItem("email", response.email);
      localStorage.setItem("username", response.displayName);
      alert(response.message)
    } else {
      alert(response.message)
    }
  })

  }
  addressgo(){
    this.router.navigate(['/userAddress']);
  }
}
