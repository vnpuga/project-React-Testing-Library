import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente FavoritePokemons', () => {
  it('Teste se é exibido na tela a mensagem "No favorite pokemon found",se a pessoa não'
    + 'tiver pokémons favoritos', () => {
    renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavorite);

    const paragrah = screen.getByText(/No favorite pokemon found/i);
    expect(paragrah).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);

    history.push('/favorites');

    const imgFavoriteCard = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(imgFavoriteCard).toBeInTheDocument();
  });
});
