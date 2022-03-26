import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { PokemonDetails } from '../components';

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

  it('Teste se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);

    history.push(urlPikachu);
    const titleLocation = screen.getByRole('heading', {
      name: /game locations of pikachu/i });
    const imgsLocation = screen.getAllByAltText(/pikachu location/i);
    const nameLocation1 = screen.getByText(/kanto viridian forest/i);
    const nameLocation2 = screen.getByText(/kanto power plant/i);

    expect(titleLocation).toBeInTheDocument();
    expect(imgsLocation.length).toBe(2);
    expect(nameLocation1).toBeInTheDocument();
    expect(nameLocation2).toBeInTheDocument();
    expect(imgsLocation[0]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgsLocation[1]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imgsLocation[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(imgsLocation[1]).toHaveAttribute('alt', 'Pikachu location');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    history.push(urlPikachu);
    const labelFavorito = screen.getByLabelText('Pokémon favoritado?');
    expect(labelFavorito).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);
    const checked = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(checked).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(checked).not.toBeInTheDocument();
  });
});
