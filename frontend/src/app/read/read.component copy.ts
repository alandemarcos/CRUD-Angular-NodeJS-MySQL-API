import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

readData:any;
successmsg:any;

// Função para buscar todos os dados do backend
  ngOnInit(): void {
    this.service.getAllData().subscribe((res) => {
  console.log(res,"res==>");
this.readData = res.data;

    });

}

// Função para deletar dados no backend
deleteID(id:any)
{

  console.log(id,"deleteid==>");
  this.service.deleteData(id).subscribe((res) => {
    console.log(res,"deleteres==>");
    this.ngOnInit();
    this.successmsg = res.message;

  });

}

}
