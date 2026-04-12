import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Footer } from './footer/footer';
import { Products } from './services/products';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [Products]
})
export class App {
  protected title = 'Student_MS';
  constructor(private products: Products) { }
  ngOnInit() {
    this.products.getProducts().subscribe((data: any) => {
    console.log(data);
    } )
  }
}

