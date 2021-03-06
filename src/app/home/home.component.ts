import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Products, Product } from '../shared/models/hack.model';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  product: Product;
  industry:string;
    category:string;
    private sub;
    showCategory:any = false;
  subCategories: any[]
  categories: any[] = [
    {
      name: 'Sports Merch',
      img: 'https://rndlabcdn.azureedge.net/mtc-release/webar-hack-sporjo/merch.png',
      industry: 'SportsMerch'
    },
    {
      name: 'Sports Equipment',
      img: 'https://rndlabcdn.azureedge.net/mtc-release/webar-hack-sporjo/equipment.png',
      industry: 'SportsEquipment'
    },
    {
      name: 'GOAT',
      img: 'https://rndlabcdn.azureedge.net/mtc-release/webar-hack-sporjo/goat.png',
      industry: 'GOAT'
    }
  
  ];

  subCategoriesSportsMerch: any[] = [
    {
      name: 'Jersey',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons/jersey.png'
    },
    {
      name: 'Logo',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons/logo-design.png'
    }
  ]

  subCategoriesSportsEquipment: any[] = [
    {
      name: 'Ball',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons/ball.png'
  },
  {
      name: 'Shoe',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons/shoe.png'
  },
  {
      name: 'Trophy',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons/trophy.png'
  },
  {
    name: 'Stump',
    img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons/stump.png'
},
{
  name: 'Bat',
  img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons/bat.png'
},
{
  name: 'Headwear',
  img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons/headwear.png'
}
  ]

  subCategoriesGOAT: any[] = [
    
      {
        name: 'Champions',
        img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons/goat.png'
      }
    
  ]

  
  loading = false;
  productPageCounter = 1;
  additionalLoading = false;


  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
  ) {}

  public screenWidth: any;
  public screenHeight: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.loading = true;
    
    setTimeout(() => {
      this.productService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = res;
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
    }, 500);

    //Hack Products API Call
    this.subCategories = this.subCategoriesSportsMerch 
    this.showCategory = false;
    this.getIndustry()
    this.getCategory()
    this.load() 
    
   
  }

  showMoreProducts(): void {
    this.additionalLoading = true;
    this.productPageCounter = this.productPageCounter + 1;
    setTimeout(() => {
      this.productService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = [...this.products, ...res];
          this.additionalLoading = false;
        },
        (err) => {
          console.log(err);
          this.additionalLoading = false;
        }
      );
    }, 500);
  }
  load = () => {
    //    this.sub = this.productService.getProducts('https://web-ar-middleware.azurewebsites.net/api/v1/Furniture/getAll')
    //         .subscribe(res => {
    //             this.products = res.Products;     
    //             console.log(this.products)    
    //         })
    if(this.category == "all")
{   
    console.log("inside if")
    this.sub = this.productService.getProducts(environment.apiUrl+this.industry+'/getAll').subscribe(
        res=>{
          this.products=res.Products;
          
        })}
        else{
            console.log("inside else")
            var query = environment.apiUrl+this.industry+'/'+this.category+'/getAll'
            console.log(query)
            this.sub = this.productService.getProducts(query).subscribe(
        res=>{
          this.products=res.Products;
          // console.log(this.products)
        })
        }
    };

  getIndustry(){
    if(this.route.params!==null){
        // console.log("inside if")
        this.route.params.subscribe(res => {
        if(res.industry != null){
            this.industry = res.industry
        }
        else{
          console.log("inside default merch")
            this.industry = "SportsMerch" 
        }
        console.log(this.industry)
    })
}
}
getCategory(){
    if(this.route.params!==null){
        this.route.params.subscribe(res => {
        if(res.category != null){
            console.log("setting category")
            this.category = res.category
        }
        else{
            this.category = "all" 
        }
        
    })
}
}
getCategoriesByIndustry(industry){
  console.log("industry", industry)
  if(industry == "SportsMerch"){
    console.log("inside merch")
      this.subCategories=this.subCategoriesSportsMerch;   
    }
    else if (industry == "SportsEquipment"){

      console.log("inside iequip")
      this.subCategories=this.subCategoriesSportsEquipment;
    }
    else if (industry =="GOAT"){
      console.log("inside goat")
      this.subCategories=this.subCategoriesGOAT;
    }
}
industrySelect(industry,category){
  this.showCategory = true;
  this.industry = industry;
  this.category = category;
  this.getCategoriesByIndustry(industry)
  this.load()
}
categorySelect(category){
  this.category = category;
  this.load()
}
}
