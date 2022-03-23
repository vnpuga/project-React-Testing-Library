import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se exibe o próximo Pokémon, quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    // O botão deve conter o texto Próximo pokémon.
    const btn = screen.getByTestId('next-pokemon');
    expect(btn).toBeInTheDocument();

    // ajuda do Douglas (summer de instrução) - mostrar pokemons um a um.
    pokemons.forEach((pokemon) => {
      const element = screen.getByText(pokemon.name);
      expect(element).toBeInTheDocument();
      userEvent.click(btn);
    });

    // estando no último elemento do array, após clicar no botão deve renderizar o 1o pokemon novamente.
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const NUMBER = 7;
    const btnType = screen.getAllByTestId('pokemon-type-button');
    expect(btnType).toHaveLength(NUMBER);

    // Clicando em um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo
    const btnTypeEletric = screen.getByRole('button', { name: /electric/i });
    userEvent.click(btnTypeEletric);
    const eletricPokemons = screen.getAllByTestId('pokemon-name');
    expect(eletricPokemons).toHaveLength(1);

    // O texto do botão deve corresponder ao nome do tipo.
    pokemons.forEach((pokemon) => {
      const btnTypeName = screen.getByRole('button', { name: pokemon.type });
      expect(btnTypeName).toBeInTheDocument();
      expect(btnTypeName).toHaveTextContent(pokemon.type);
    });

    // O botão All precisa estar sempre visível.
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    // O texto do botão deve ser All.
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toHaveTextContent('All');

    const btnPoison = screen.getByRole('button', { name: /poison/i });
    userEvent.click(btnPoison);
    const poison = screen.getByText(/ekans/i);
    expect(poison).toBeInTheDocument();

    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado.
    // Ao carregar a página, o filtro selecionado deverá ser All
    userEvent.click(btnAll);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
