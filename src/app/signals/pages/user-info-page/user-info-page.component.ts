import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user-request.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-info-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.scss',
  providers: [UserService],
})
export class UserInfoPageComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);

  public userId = signal<number>(1);

  public currentUser = signal<User | undefined>(undefined);

  public userWasFound = signal<boolean>(true);

  private sub = new Subscription();

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(id: number) {
    if (id <= 0) return;
    this.userId.set(id);
    this.currentUser.set(undefined);
    this.sub.add(
      this.userService.getUserById(id).subscribe({
        next: (user) => {
          this.currentUser.set(user);
          this.userWasFound.set(true);
        },
        error: (err) => {
          this.userWasFound.set(false);
          this.currentUser.set(undefined);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
