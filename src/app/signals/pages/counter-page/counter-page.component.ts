import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.scss',
})
export class CounterPageComponent {
  // las signals se pueden sobre escribir con los metodos set, update
  public counter = signal<number>(10);

  // el computed solo sirve para lectura
  public squareCouter = computed(() => this.counter() * this.counter());

  public resetCounter(): void {
    this.counter.set(0);
  }

  public increaseBy(value: number): void {
    this.counter.update((current) => current + value);
  }
}
