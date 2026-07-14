import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../tests/render";
import { FilmDetails } from "../FilmDetails";

const data = {
  title: "The Empire Strikes Back",
  opening_crawl: "It is a dark time for the Rebellion.",
  characters: ["https://swapi.dev/api/people/1/"],
};

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../hooks/swapi", () => ({
  useGetItems: vi.fn(),
}));

import * as swapi from "../../hooks/swapi";

describe("FilmDetails", () => {
  beforeEach(() => {
    vi.mocked(swapi.useGetItems).mockReturnValue({
      data: [{ name: "Luke", url: "https://swapi.dev/api/people/1/" }],
      isFetching: false,
    } as ReturnType<typeof swapi.useGetItems>);
  });

  it("must show all film details", async () => {
    renderWithProviders(<FilmDetails data={data} />);

    expect(screen.getByText(data.title)).toBeInTheDocument();

    expect(screen.getByText(data.opening_crawl)).toBeInTheDocument();

    expect(screen.getByText("Luke")).toBeInTheDocument();
  });

  it("must redirect to character details page", async () => {
    renderWithProviders(<FilmDetails data={data} />);

    await userEvent.click(screen.getByText("Luke"));

    expect(mockNavigate).toHaveBeenCalledWith("/details/people/1/");
  });

  it("must redirect to main page", async () => {
    renderWithProviders(<FilmDetails data={data} />);

    await userEvent.click(screen.getByText("BACK TO SEARCH"));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("must show loading message when get items is fetching", async () => {
    vi.mocked(swapi.useGetItems).mockReturnValue({
      data: [{ name: "", url: "" }],
      isFetching: true,
    } as ReturnType<typeof swapi.useGetItems>);

    renderWithProviders(<FilmDetails data={data} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
