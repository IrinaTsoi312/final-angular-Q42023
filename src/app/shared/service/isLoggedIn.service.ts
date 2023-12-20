import { Injectable } from "@angular/core";
import { ILogInData } from "../types/logIn";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export default class IsLogged {

  users = [
    { name: "Jane", email: "jane@mail.com", password: "1!Aqwerty" },
    { name: "John", email: "john@mail.com", password: "@2Aqwerty" },
    { name: "Math", email: "math@mail.com", password: "#3Aqwerty" },
    { name: "Lana", email: "lana@mail.com", password: "$4Aqwerty" },
    { name: "Lui", email: "lui@mail.com", password: "%5Aqwerty" }
  ];

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    const loggedIn = this.simulateUserLoginStatus();
    this.isLoggedInSubject.next(loggedIn);
  }

  logInApp(email: string, password: string): Observable<boolean> {
    const isLoggedIn = this.simulateUserAuthentication(email, password);
    this.isLoggedInSubject.next(isLoggedIn);
    return this.isLoggedInSubject.asObservable();
  }

  private simulateUserLoginStatus(): boolean {
    return Boolean(localStorage.getItem("token"));
  }

  private simulateUserAuthentication(email: string, password: string): boolean {
    const isRegged = this.users.find((user) => user.email === email && user.password === password);
    if (isRegged) {
      localStorage.setItem("userName", isRegged.name);
      localStorage.setItem("token", `123${isRegged.name}`);
    }
    return Boolean(isRegged);
  }
}