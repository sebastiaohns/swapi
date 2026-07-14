import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../tests/render";
import { DetailsPage } from "../details";

vi.mock("../../hooks/swapi", () => ({
  useGetItem: vi.fn(),
  useGetItems: vi.fn(),
}));

import * as swapi from "../../hooks/swapi";
import { SAMPLE_PEOPLE } from "../../schemas/people";
import { SAMPLE_FILMS } from "../../schemas/films";
import { MemoryRouter, Routes, Route } from "react-router-dom";

describe("DeatilsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("must show loading", async () => {
    vi.mocked(swapi.useGetItem).mockReturnValue({
      data: {},
      isFetching: true,
      isFetched: false,
    } as ReturnType<typeof swapi.useGetItem>);

    renderWithProviders(<DetailsPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("must show all character details", async () => {
    vi.mocked(swapi.useGetItem).mockReturnValue({
      data: SAMPLE_PEOPLE[0].properties,
      isFetching: false,
      isFetched: true,
    } as ReturnType<typeof swapi.useGetItem>);

    vi.mocked(swapi.useGetItems).mockReturnValue({
      data: [{ title: "A New Hope", url: "https://swapi.dev/api/films/1/" }],
      isFetching: false,
    } as ReturnType<typeof swapi.useGetItems>);

    render(
      <MemoryRouter initialEntries={["/details/people/1"]}>
        <Routes>
          <Route path="/details/:type/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByText(SAMPLE_PEOPLE[0].properties.name),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Birth year: " + SAMPLE_PEOPLE[0].properties.birth_year),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Gender: " + SAMPLE_PEOPLE[0].properties.gender),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Eye color: " + SAMPLE_PEOPLE[0].properties.eye_color),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Hair color: " + SAMPLE_PEOPLE[0].properties.hair_color),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Height: " + SAMPLE_PEOPLE[0].properties.height),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Mass: " + SAMPLE_PEOPLE[0].properties.mass),
    ).toBeInTheDocument();

    expect(screen.getByText("A New Hope")).toBeInTheDocument();
  });

  it("must show all film details", async () => {
    vi.mocked(swapi.useGetItem).mockReturnValue({
      data: SAMPLE_FILMS[0].properties,
      isFetching: false,
      isFetched: true,
    } as ReturnType<typeof swapi.useGetItem>);

    vi.mocked(swapi.useGetItems).mockReturnValue({
      data: [{ name: "Luke", url: "https://swapi.dev/api/people/1/" }],
      isFetching: false,
    } as ReturnType<typeof swapi.useGetItems>);

    render(
      <MemoryRouter initialEntries={["/details/films/1"]}>
        <Routes>
          <Route path="/details/:type/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByText(SAMPLE_FILMS[0].properties.title),
    ).toBeInTheDocument();

    expect(
      screen.getByText(SAMPLE_FILMS[0].properties.opening_crawl),
    ).toBeInTheDocument();

    expect(screen.getByText("Luke")).toBeInTheDocument();
  });
});
