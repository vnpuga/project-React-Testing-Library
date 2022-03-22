import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente App', () => {
  it('Testa se a aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  it('Teste se ao clicar no link Home, é redirecionada para URL /', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);

    expect(history.location.pathname).toBe('/');
  });

  it('Teste se ao clicar no link About, é redirecionada para URL /about', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);

    expect(history.location.pathname).toBe('/about');
  });

  it('Teste se ao clicar no link Favorite Pokémons, é redirecionada para URL /favorites',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
      userEvent.click(linkFavorite);

      expect(history.location.pathname).toBe('/favorites');
    });

  it('Teste se digitando uma URL desconhecida, é redirecionada para a página Not Found ',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/xablau');

      const imgNotFound = screen.getByRole('img',
        { name: 'Pikachu crying because the page requested was not found' });

      expect(imgNotFound).toBeInTheDocument();
    });
});
