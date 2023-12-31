import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrandsComponent } from './Component/brands/brands.component';
import { CategoryComponent } from './Component/category/category.component';
import { FooterComponent } from './Component/footer/footer.component';
import { HomeComponent } from './Component/home/home.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { ProducdDetailesComponent } from './Component/producd-detailes/producd-detailes.component';
import { ProductComponent } from './Component/product/product.component';
import { SliderBackgroundComponent } from './Component/slider-background/slider-background.component';
import { SliderMinComponent } from './Component/slider-min/slider-min.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrandsService } from './Services/brands.service';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule,FormGroup } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './Component/sign-up/sign-up.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { OrdersComponent } from './Component/orders/orders.component';
import { UserProfileComponent } from './Component/user-profile/user-profile.component';
import { WhishListComponent } from './Component/whish-list/whish-list.component';
import { AddressComponent } from './Component/address/address.component';
import { ImgeNavComponent } from './imge-nav/imge-nav.component';
import { CountProductComponent } from './Component/count-product/count-product.component';
import { PaymentComponent } from './Component/payment/payment.component';
import { InterceptorService } from './Services/interceptor.service';
import { Interceptor } from './Services/interceptor';
import { CartComponent } from './Component/cart/cart.component';
import { FooteDescrbtionComponent } from './foote-descrbtion/foote-descrbtion.component';
import { SearchPrductPipe } from './search-prduct.pipe';
import { MakeOrderComponent } from './Component/make-order/make-order.component';
import { AllAddressComponent } from './Component/all-address/all-address.component';
import { CheckoutComponent } from './Component/checkout/checkout.component';
//import { NgxPayPalModule } from 'ngx-paypal';
//import {GooglePayButtonModule} from '@google-pay/button-angular';
//import { PaypalComponent } from './Component/paypal/paypal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductComponent,
    SliderBackgroundComponent,
    SliderMinComponent,
    FooterComponent,
    CategoryComponent,
    ProducdDetailesComponent,
    BrandsComponent,
    SignUpComponent,
    ProfileComponent,
    OrdersComponent,
    UserProfileComponent,
    WhishListComponent,
    AddressComponent,
    PaymentComponent,
    ImgeNavComponent,
    CountProductComponent,
    MakeOrderComponent,
    CartComponent,
    FooteDescrbtionComponent,
    AllAddressComponent,
    SearchPrductPipe,
    CheckoutComponent,
    AddressComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi : true
  },
  BrandsService],
  bootstrap: [AppComponent],
})
export class AppModule { }
