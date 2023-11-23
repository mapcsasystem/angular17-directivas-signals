import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-properties-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.scss',
})
export class PropertiesPageComponent implements OnInit, OnDestroy {
  public counter = signal(10);

  public user = signal<User>({
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
  });

  public fullName = computed(
    () => `${this.user().first_name} ${this.user().last_name}`
  );

  public userChangedEffect = effect(() => {
    // Todo: Descomentar esta línea
    console.log(`${this.user().first_name} - ${this.counter()} `);
  });

  ngOnInit(): void {
    setInterval(() => {
      this.counter.update((current) => current + 1);
    }, 1000);
  }

  increaseBy(value: number) {
    this.counter.update((current) => current + value);
  }

  onFieldUpdated(field: keyof User, value: string) {
    this.user.update((current) => {
      switch (field) {
        case 'email':
          current.email = value;
          break;

        case 'avatar':
          current.avatar = value;
          break;

        case 'first_name':
          current.first_name = value;
          break;

        case 'last_name':
          current.last_name = value;
          break;

        case 'id':
          current.id = Number(value);
          break;
      }

      return current;
    });
  }

  ngOnDestroy(): void {
    // this.userChangedEffect.destroy();
  }
}
