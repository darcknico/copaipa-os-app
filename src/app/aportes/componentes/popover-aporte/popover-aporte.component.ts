import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/providers/loading.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-aporte',
  templateUrl: './popover-aporte.component.html',
  styleUrls: ['./popover-aporte.component.scss'],
})
export class PopoverAporteComponent implements OnInit {

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
