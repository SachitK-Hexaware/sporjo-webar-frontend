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
      name: 'Furniture',
      img: 'https://arasset.azureedge.net/webar/icons/furniture_industry.jpg',
      industry: 'furniture'
    },
    {
      name: 'Fashion',
      img: 'https://arasset.azureedge.net/webar/icons/fashion_industry.jpg',
      industry: 'fashion'
    },
    {
      name: 'Machinery',
      img: 'https://arasset.azureedge.net/webar/icons/machinery_industry.jpg',
      industry: 'machinery'
    },
    {
      name: 'Food',
      img: 'https://webarmodels.blob.core.windows.net/webar/food_industry.jpg'
    }
    
  ];

  subCategoriesFashion: any[] = [
    {
      name: 'Footwear',
      img: 'https://arasset.azureedge.net/webar/icons/footwear.png'
    },
    {
      name: 'Handbags',
      img: 'https://arasset.azureedge.net/webar/icons/handbags.png'
    },
    {
      name: 'Menswear',
      img: 'https://arasset.azureedge.net/webar/icons/menswear.png'
    },
    {
      name: 'Womenswear',
      img: 'https://arasset.azureedge.net/webar/icons/womenswear.png'
    }
  ]

  subCategoriesFurniture: any[] = [
    {
      name: 'Rack',
      img: 'https://arasset.azureedge.net/webar/icons/rack.png'
  },
  {
      name: 'Sofa',
      img: 'https://arasset.azureedge.net/webar/icons/sofa.png'
  },
  {
      name: 'Set',
      img: 'https://arasset.azureedge.net/webar/icons/set.png'
  },
  {
      name: 'Cubicle',
      img: 'https://arasset.azureedge.net/webar/icons/cubicle.png'
  },
  {
      name: 'Table',
      img: 'https://arasset.azureedge.net/webar/icons/table.png'
  },
  {
      name: 'Chair',
      img: 'https://arasset.azureedge.net/webar/icons/chair.png'
  },
  {
      name: 'Lounge',
      img: 'https://arasset.azureedge.net/webar/icons/lounge.png'
  },
  {
      name: 'Large Seater',
      img: 'https://arasset.azureedge.net/webar/icons/large-seater.png'
  },
  {
      name: 'Lamp',
      img: 'https://arasset.azureedge.net/webar/icons/lamp.png'
  },
  {
      name: 'Hearth',
      img: 'https://arasset.azureedge.net/webar/icons/hearth.png'
  }
  ]

  subCategoriesMachinery: any[] = [
    
      {
        name: 'Printer',
        img: 'https://arasset.azureedge.net/webar/icons/printer.png'
      }
    
  ]
  subCategoriesFood: any[] = [
    
    {
      name: 'Meal',
      img: 'https://arasset.azureedge.net/webar/icons/meal.png'
    },
    {
      name: 'Bakery',
      img: 'https://arasset.azureedge.net/webar/icons/bakery.png'
    },
    {
      name: 'Barbeque',
      img: 'https://arasset.azureedge.net/webar/icons/barbeque.png'
    },
    {
      name: 'Pizza',
      img: 'https://arasset.azureedge.net/webar/icons/pizza.png'
    },
    {
      name: 'Ramen',
      img: 'https://arasset.azureedge.net/webar/icons/ramen.png'
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
    this.subCategories = this.subCategoriesFurniture 
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
    this.sub = this.productService.getProducts('https://web-ar-middleware.azurewebsites.net/api/v1/'+this.industry+'/getAll').subscribe(
        res=>{
          this.products=res.Products;
          
        })}
        else{
            console.log("inside else")
            var query = 'https://web-ar-middleware.azurewebsites.net/api/v1/'+this.industry+'/'+this.category+'/getAll'
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
            this.industry = "Furniture" 
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
  if(industry == "Fashion"){
      this.subCategories=this.subCategoriesFashion;   
    }
    else if (industry =="Furniture"){
      this.subCategories=this.subCategoriesFurniture;
    }
    else if (industry =="Machinery"){
      this.subCategories=this.subCategoriesMachinery;
    }
    else if (industry =="Food"){
      this.subCategories=this.subCategoriesFood;
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
