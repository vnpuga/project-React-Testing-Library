import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente PokemonDetails', () => {
  const urlPikachu = '/pokemons/25';
  it('Teste se as informações detalhadas do Pokémon selecionado estão na tela', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /More details/i });
    history.push(urlPikachu);
    const title = screen.getByRole('heading', { name: /pikachu details/i });
    const summary = screen.getByRole('heading', { name: /summary/i });
    const paragraph = screen.getByText(/this intelligent pokémon roasts hard berries/i);

    expect(title).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
});
