import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }

  // Conectar o frontend com o backend
  apiUrl = 'http://localhost:3000/usuario/';

  // Função para buscar todos os dados do backend
  getAllData():Observable<any>
  {
    return this._http.get(this.apiUrl);  }

// Função para inserir novos dados no backend
createData(data:any):Observable<any>
{
  console.log(data,"createapi=>");

  return this._http.post(this.apiUrl,data);}

  // Função para deletar dados no backend
  deleteData(id:any):Observable<any>
  {
    return this._http.delete(this.apiUrl+id);
  }

  //Função para atualizar dados no backend
  updateData(data:any,id:any):Observable<any>
  {

    return this._http.put(this.apiUrl+id,data);

}

// Função para atualizar dados simples no backend
getSingleData(id:any):Observable<any>
{

return this._http.get(this.apiUrl+id);
}

}



