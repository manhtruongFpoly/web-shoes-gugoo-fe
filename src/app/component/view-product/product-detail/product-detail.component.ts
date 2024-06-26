import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/_service/cart-service/cart.service';
import { ProductService } from 'src/app/_service/product-service/product.service';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private cartSer: CartService,
    private tokenSer: TokenStorageService,
    private productService: ProductService,
    private toast: ToastrService,
    private localStore: TokenStorageService
  ) { }

  ngOnInit() {
    this.viewDetailProductId();
  }

  viewProduct;
  listSize:number[] = [];
  listColor:string[] = [];
  viewDetailProductId() {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.productService.getByProductId(id).subscribe(response => {
      this.viewProduct = response.data.data;
      console.log(this.viewProduct);

      this.listColor = JSON.parse(this.viewProduct.listColors);
      console.log(this.listColor);

      this.listSize = JSON.parse(this.viewProduct.listSizes);
      console.log(this.listSize);


    })
  }

  selectedColor;
  selectColorName: string;
  selectColor(item) {
    this.selectedColor = item.key;
    this.selectColorName = item.value;
  }

  selectedSize;
  selectSizeName: string;
  selectSize(item) {
    this.selectedSize = item.key;
    this.selectSizeName = item.value;
  }


  checkValidateSize = false;
  checkValidateColor = false;
  validateAddTocart(){
    console.log(this.selectColorName);
    if(this.selectColorName === null || this.selectColorName === undefined){
      this.toast.warning('Bạn chưa chọn màu cho sản phẩm',);
      this.checkValidateColor = true;
      return;
    }

    if(this.selectSizeName == null || this.selectSizeName == undefined){
      this.toast.warning('Bạn chưa chọn size sản phẩm',);
      this.checkValidateSize = true;
      return;
    }
  }

  addToCart(viewProduct: any) {

    const object = {
      productId: viewProduct.id,
      sizeName: this.selectSizeName,
      colorName: this.selectColorName
    }

    this.validateAddTocart();
      if(this.checkValidateColor){
        return
      }
      if(this.checkValidateSize){
        return
      }

    const user  = this.localStore.getUser()
    //todo: truong hop chua dang nhap
    if(user === null || user === '' || user === undefined){
      addObjectToArray(object);
      this.toast.success('Thêm sản phẩm ' + viewProduct.name + ' thành công!',);
    }else{
      this.cartSer.createCart(object).subscribe(
        (data) => {
          console.log(data);
          this.toast.success('Thêm sản phẩm ' + viewProduct.name + ' thành công!',);
        },
        (err) => {
          this.toast.error(err.error.message);
        }
      );
    }

   
  }

}

function getArrayFromSessionStorage() {
  const storedArray = sessionStorage.getItem('cart');
  return storedArray ? JSON.parse(storedArray) : [];
}

// Hàm lưu mảng vào sessionStorage
function saveArrayToSessionStorage(array) {
  sessionStorage.setItem('cart', JSON.stringify(array));
}

// Hàm thêm đối tượng vào mảng và lưu lại vào sessionStorage
function addObjectToArray(object) {
  const array = getArrayFromSessionStorage();
  array.push(object);
  saveArrayToSessionStorage(array);
}
