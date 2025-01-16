import { Pipe, PipeTransform } from '@angular/core';
import { Ability } from '@casl/ability';

@Pipe({
  name: 'able'
})
export class AblePipe implements PipeTransform {
  constructor(private ability: Ability) {}

  transform(value: any, action: string, subject: string): boolean {
    return this.ability.can(action, subject);
  }
}