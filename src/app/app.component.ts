import {
  AfterViewInit,
  Component,
  PLATFORM_ID,
  TransferState,
  inject,
  ɵInitialRenderPendingTasks,
} from '@angular/core';
import { CommonModule, isPlatformServer } from '@angular/common';

import { CSP_NONCE_KEY } from './app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>Welcome to {{ title }}!</h1>
      <span style="display: block">{{ title }} app is running!</span>
      <img
        width="300"
        alt="Angular Logo"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="
      />
    </div>
    <h2>Here are some links to help you start:</h2>
    <ul>
      <li>
        <h2>
          <a target="_blank" rel="noopener" href="https://angular.io/tutorial"
            >Tour of Heroes</a
          >
        </h2>
      </li>
      <li>
        <h2>
          <a target="_blank" rel="noopener" href="https://angular.io/cli"
            >CLI Documentation</a
          >
        </h2>
      </li>
      <li>
        <h2>
          <a target="_blank" rel="noopener" href="https://blog.angular.io/"
            >Angular blog</a
          >
        </h2>
      </li>
    </ul>
  `,
  styles: [],
})
export class AppComponent implements AfterViewInit {
  title = 'bun-universal';

  private readonly _transferState = inject(TransferState);
  private readonly _isServer = isPlatformServer(inject(PLATFORM_ID));
  private readonly _pendingTasks = inject(ɵInitialRenderPendingTasks);

  async ngAfterViewInit(): Promise<void> {
    if (this._isServer) {
      const taskId = this._pendingTasks.add();

      const { cryptoRandomStringAsync } = await import('crypto-random-string');

      const nonce = await cryptoRandomStringAsync({
        length: 20,
        type: 'base64',
      });

      this._transferState.set(CSP_NONCE_KEY, nonce);

      this._pendingTasks.remove(taskId);
    }
  }
}
