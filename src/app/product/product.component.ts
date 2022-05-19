import { Product } from './../shared/models/hack.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs/operators';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper/core';
import { CartService } from '../services/cart.service';
import { environment } from 'src/environments/environment';
// import { Product } from '../shared/models/hack.model';



// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
]);

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  id: number;
  product: any;
  quantity: number;
  showcaseImages: any[] = [];
  loading = false;
  qrResult: string;
  screenWidth:any;
  private sub;
  displayStyle = "none";
  closeResult = '';

  constructor(
    private _route: ActivatedRoute,
    private _product: ProductService,
    private _cart: CartService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.loading = true;
    // this._route.paramMap
    //   .pipe(
    //     map((param: any) => {
    //       return param.params._id;
    //     })
    //   )
    //   .subscribe((productId) => {
    //     console.log(productId)
    //     // returns string so convert it to number
    //     this.id = parseInt(productId);
    //     this._product.getSingleProduct(productId).subscribe((product) => {
    //       console.log(product);
    //       this.product = product;
    //       if (product.quantity === 0) this.quantity = 0;
    //       else this.quantity = 1;

    //       if (product.images) {
    //         this.showcaseImages = product.images.split(';');
    //       }
    //       this.loading = false;
    //     });
    //   });

    //Taking params from route 
      this._route.params
      .subscribe(res => {
        this.getProduct(res.industry, res._id);
        this.getQrCode(res.industry, res._id);
      }) 
      
  }
  getQrCode(industry, id) {
    this._product.getQrCode({"url": environment.apiUrl+'scanQrCode/'+industry+'/'+id}).subscribe(
                res=>{
                    this.qrResult = res.result;
                }
            )
  }

  getProduct = (industry, id) => {
    // this.sub = this.productService.getProducts('https://web-ar-middleware.azurewebsites.net/api/v1/Furniture/'+id)
    //     .subscribe(res => {
    //         this.product = res.Product;
    //         // console.log(res)
    //     })
    this.sub = this._product.getProducts(environment.apiUrl+industry+'/'+id).subscribe(
        res=>{
          this.product = res.Product
          this.loading = false
          // console.log(this.product)
        })
};

  addToCart(): void {
    this._cart.addProduct({
      _id: this.product._id,
      price: this.product.price,
      image: this.product.product_image_url,
      title: this.product.name,
    });
  }
  openPopup() {

    this.displayStyle = "block";

  }

  closePopup() {

    this.displayStyle = "none";

  }

  open(content) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
