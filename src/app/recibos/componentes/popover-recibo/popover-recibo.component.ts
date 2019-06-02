import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LoadingService } from 'src/app/providers/loading.service';

@Component({
  selector: 'app-popover-recibo',
  templateUrl: './popover-recibo.component.html',
  styleUrls: ['./popover-recibo.component.scss'],
})
export class PopoverReciboComponent implements OnInit {

  loading:boolean=false;

  constructor(
    public loadingService: LoadingService,
    public popoverController: PopoverController,
  ) { }

  ngOnInit() {
    this.loadingService.loading$.subscribe(estado=>{
      this.loading = estado;
    });
  }

  close(opcion:number=0){
    this.popoverController.dismiss(opcion);
  }
}
