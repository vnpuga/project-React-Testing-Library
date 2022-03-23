import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente Pokemon', () => {
  const urlPikachu = '/pokemons/25';

  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(name).toHaveTextContent(/Pikachu/i);
    expect(type).toHaveTextContent(/Electric/i);
    expect(weight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(img).toHaveProperty('alt', 'Pikachu sprite');
    expect(img).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para'
    + 'exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id>'
    + 'é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails).toHaveAttribute('href', urlPikachu);
  });

  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
    + 'da aplicação para a página de detalhes de Pokémon.', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);
    const heading = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(heading).toBeInTheDocument();
  });

  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id>'
  + 'é o id do Pokémon cujos detalhes se deseja ver;', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe(urlPikachu);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);

    const starIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon).toHaveProperty('src', 'http://localhost/star-icon.svg');
    expect(starIcon.src).toContain('/star-icon.svg'); // aprendendo a usar .toContain.
    // o matcher .toHaveProperty, não aceita o src '/star-icon.svg', somente com o localhost.
  });
});
