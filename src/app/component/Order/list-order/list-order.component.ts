import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_service/order-service/order.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatDialog } from '@angular/material/dialog';
import { PopupCancelOrderComponent } from './popup-cancel-order/popup-cancel-order.component';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  validForm!: FormGroup;
  orders: any[] = [];
  count1: any;
  count2: any;
  count3: any;
  count4: any;
  count5: any;
  count7: any;
  reason: any;

  userId:any;

  constructor(
    private orderSer: OrderService, 
    private toast: ToastrService,
    private matDialog: MatDialog,
    private tokenStorage: TokenStorageService
  ) { 
  }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUserId();
    this.getListOrderByStatus();
    this.getCountOrder1();
    this.getCountOrder2();
    this.getCountOrder3();
    this.getCountOrder4();
    this.getCountOrder5();
    this.getCountOrder7();
  }

  getListOrderByStatus() {
    this.orderSer.getOrderByStatusandAccount("CHOXACNHAN",this.userId)
      .subscribe(data => {
        this.orders = data.data;
        console.log(data.data);
      });
  }

  getCountOrder1() {
    this.orderSer.getCountOrderByStatus(0,this.userId)
      .subscribe(data => {
        this.count1 = data.data;
        console.log(data);
      });
  }

  getCountOrder2() {
    this.orderSer.getCountOrderByStatus(1,this.userId)
      .subscribe(data => {
        this.count2 = data.data;
        console.log(data);
      });
  }

  getCountOrder3() {
    this.orderSer.getCountOrderByStatus(2,this.userId)
      .subscribe(data => {
        this.count3 = data.data;
        console.log(data);
      });
  }

  getCountOrder4() {
    this.orderSer.getCountOrderByStatus(3,this.userId)
      .subscribe(data => {
        this.count4 = data.data;
        console.log(data);
      });
  }

  getCountOrder5() {
    this.orderSer.getCountOrderByStatus(4,this.userId)
      .subscribe(data => {
        this.count5 = data.data;
        console.log(data);
      });
  }

  getCountOrder7() {
    this.orderSer.getCountOrderByStatus(7,this.userId)
      .subscribe(data => {
        this.count7 = data.data;
        console.log(data);
      });
  }

  cancelOrder(id: number) {
    this.orderSer.canceledOrder(id, this.reason)
      .subscribe(data => {
        this.toast.success('Hủy đơn hàng thành công!');
        this.ngOnInit();
      });
  }
}
