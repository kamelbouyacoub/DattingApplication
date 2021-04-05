import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {  faEnvelope, faHeart,  faUser } from '@fortawesome/free-regular-svg-icons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
 
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TabsModule.forRoot(),
    NgxGalleryModule
  ],
  exports:[
    BsDropdownModule,
    ToastrModule,
    FontAwesomeModule,
    TabsModule,
    NgxGalleryModule 
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
 
 

