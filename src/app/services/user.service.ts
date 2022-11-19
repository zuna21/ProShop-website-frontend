import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {}

  loginUser(username:string, password: string) {
    return this.http.post<any>('http://127.0.0.1:8000/api/users/login/',
    {
      username: username,
      password: password
    },
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  registerUser(name: string, email: string, password: string) {
    return this.http.post<any>('http://127.0.0.1:8000/api/users/register/',
    {
      name: name,
      email: email,
      password: password
    },
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateUser(name: string, email: string, password: string, token: string) {
    return this.http.put<any>('http://127.0.0.1:8000/api/users/profile/update/',
    {
      name: name,
      email: email,
      password: password
    },
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    });
  }
}
