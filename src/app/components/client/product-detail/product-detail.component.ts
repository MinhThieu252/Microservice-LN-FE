import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBars, faHeart, faPhone, faRetweet, faShoppingBag, faStar, faStarHalf,faEye} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_service/cart.service';
import { ProductService } from 'src/app/_service/product.service';
import { WishlistService } from 'src/app/_service/wishlist.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [MessageService]

})
export class ProductDetailComponent implements OnInit {
  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  bars = faBars;
  star = faStar;
  star_half = faStarHalf;
  retweet = faRetweet;
  eye = faEye;

  showDepartment = false;

  id: number = 0;
  product : any;
  listRelatedProduct: any[] =[];
  quantity : number = 1;

  constructor(private productService: ProductService,private router: Router,private route: ActivatedRoute,public cartService: CartService,public wishlistService: WishlistService,private messageService: MessageService){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getProduct();
  }

  showDepartmentClick(){
    this.showDepartment = !this.showDepartment;
  }


  getProduct(){
    this.productService.getProdct(this.id).subscribe({
      next: res =>{
        this.product = res;
        this.getListRelatedProduct();
      },error: err=>{
        console.log(err);
      }
    })
  
    
  }

  getListRelatedProduct(){
    this.productService.getListRelatedProduct(this.product.category.id).subscribe({
      next: res =>{
        this.listRelatedProduct= res;
      },error: err=>{
        console.log(err);
      }
    })
  }

  addToCart(event: Event, item: any){
    this.cartService.getItems();
    this.cartService.addToCart(item,1);
    this.showSuccess("Thêm giỏ hàng thành công!")
    event.stopPropagation();

  }

  addCart(item:any){
    this.cartService.getItems();
    this.cartService.addToCart(item,this.quantity);
    this.showSuccess("Thêm giỏ hàng thành công!");
  }

  addToWishList(event: Event, item: any){
    if(!this.wishlistService.productInWishList(item)){
      this.wishlistService.addToWishList(item);
      this.showSuccess("Thêm yêu thích thành công!")
      event.stopPropagation();
    }
  }

  plusQuantity(){
    this.quantity += 1;
  }
  subtractQuantity(){
    if(this.quantity > 1){
      this.quantity -= 1;
    }
  }

  showSuccess(text: string) {
    this.messageService.add({severity:'success', summary: 'Thông báo', detail: text});
  }
  showError(text: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: text});
  }

  showWarn(text: string) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
  }

  scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  }
}
