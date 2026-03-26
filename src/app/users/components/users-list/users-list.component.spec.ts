import { render, screen, fireEvent } from '@testing-library/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  const mockUsers = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    family: `Family ${i + 1}`
  }));

  const initialState = {
    users: {
      users: mockUsers,
      loading: false,
      error: null
    }
  };

  let lastNavigatedUrl: any = null;

  const setup = async () => {
    return await render(UsersListComponent, {
      providers: [
        provideNoopAnimations(),
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: {} }
        },
        {
          provide: Router,
          useValue: {
            navigate: (url: any) => { lastNavigatedUrl = url; }
          }
        }
      ]
    });
  };

  // it('should render the table and respond to clicks', async () => {
  // const {container,debugElement}=  await setup();

  //   console.log(container.innerHTML)

  //   // Проверка на първоначално рендиране
  //   expect(screen.findByText('User 1')).toBeTruthy();

  //   // Тест на навигацията чрез клик на бутон (ако имате текст/икона в бутона)
  //   const actionButtons = screen.getAllByRole('button');
  //   fireEvent.click(actionButtons[0]); // Кликаме първия бутон в таблицата

  //   expect(lastNavigatedUrl).toEqual(['details/1']);
  // });

  it('should change page when paginator is clicked', async () => {
    await setup();

    const nextBtn = screen.getByLabelText(/Next page/i);
    fireEvent.click(nextBtn);
    const userSix = await screen.findByText('User 6');
    expect(userSix).toBeTruthy();
  });
});


