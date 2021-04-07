import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {  faEnvelope, faHeart,  faUser } from '@fortawesome/free-regular-svg-icons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
  
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TabsModule.forRoot(),
    NgxGalleryModule,
    NgxSpinnerModule,
    
  ],
  exports:[
    BsDropdownModule,
    ToastrModule,
    FontAwesomeModule,
    TabsModule,
    NgxGalleryModule,
    NgxSpinnerModule
  ]
})
export class SharedModule { 
/**
 *
 */
constructor(private library: FaIconLibrary) {
  library.addIcons(faUser, faHeart, faEnvelope);
}

}
 
 

