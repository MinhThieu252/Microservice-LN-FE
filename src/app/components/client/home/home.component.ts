import { Component, OnInit } from '@angular/core';
import { faBars, faHeart, faPhone, faRetweet, faShoppingBag ,faEye} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_service/cart.service';
import { ProductService } from 'src/app/_service/product.service';
import { WishlistService } from 'src/app/_service/wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]

})

export class HomeComponent implements OnInit {

  heart = faHeart;
  bag = faShoppingBag;
  retweet = faRetweet;
  eye=faEye;

  listProductNewest : any;
  listProductPrice: any;

  showDepartment = true;


  category_items_response= [

    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
  },
  {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
  },
  {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
  }

]

category_items = [
  {
    id: 1,
    src: 'assets/image/cat-1.jpg',
    alt: '',
    title: 'NEW'
  },
  {
    id: 2,
    src: 'assets/image/cat-2.jpg',
    alt: '',
    title: 'HOT'
  },
  {
    id: 3,
    src: 'assets/image/cat-3.jpg',
    alt: '',
    title: 'NEW'
  },
  {
    id: 4,
    src: 'assets/image/cat-4.jpg',
    alt: '',
    title: 'HOT'
  },
  {
    id: 5,
    src: 'assets/image/cat-3.jpg',
    alt: '',
    title: 'NEW'
  }
] ;

constructor(private router: Router, private productSerive:ProductService,private cartService: CartService, private wishlistService: WishlistService,private messageService: MessageService){}

ngOnInit(): void {
  this.getListProduct();
}


getListProduct(){
  this.productSerive.getListProductNewest(8).subscribe({
    next: res =>{
      this.listProductNewest = res;
    },error: err =>{
      console.log(err);
    }
  })
  this.productSerive.getListProductByPrice().subscribe({
    next:res =>{
      this.listProductPrice =res;
    },error: err=>{
      console.log(err);
    }
  })
}

addToCart(event: Event, item: any){
  this.cartService.getItems();
  this.showSuccess("Thêm giỏ hàng thành công!")
  this.cartService.addToCart(item,1);
  event.stopPropagation();
}

addToWishList(event: Event, item: any){
  if(!this.wishlistService.productInWishList(item)){
    this.showSuccess("Thêm yêu thích thành công!")
    this.wishlistService.addToWishList(item);
    event.stopPropagation();
  }
  
}
goToProduct(item: any): void {
  this.router.navigate(['/product', item.id]);
}

showSuccess(text: string) {
  this.messageService.add({severity:'success', summary: 'Thông Báo', detail: text});
}
showError(text: string) {
  this.messageService.add({severity:'error', summary: 'Error', detail: text});
}

showWarn(text: string) {
  this.messageService.add({severity:'warn', summary: 'Cảnh Báo', detail: text});
}


scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
}
}