import { Component, DoCheck, OnInit } from '@angular/core';
import { CartService } from '../../Service/cart.service';
import { Observable } from 'rxjs';
import { AbilityService } from '@casl/angular';
import { PureAbility } from '@casl/ability';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  quantity: number = 0;

  readonly ability$: Observable<PureAbility>;

  constructor(
    private cartService: CartService,
    private abilityService: AbilityService<PureAbility>
  ) {
    this.ability$ = abilityService.ability$;

  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.cartService.getQuantityCart().subscribe(
      quantity => {
        this.quantity = quantity;
      }
    )
  }



}
