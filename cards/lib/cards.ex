defmodule Cards do
  @moduledoc """
  Provides methods for creating and handling a deck of cards.
  """

  @doc """
  Determines whether a deck contains a given card.

  ## Examples

      iex> deck = Cards.create_deck()
      iex> Cards.contains?(deck, "Ace of Spades")
      true

  """
  def contains?(deck, hand) do
    Enum.member?(deck, hand)
  end

  @doc """
  Returns a list of string representing a deck of playing cards.
  """
  def create_deck do
    suits = ["Spades", "Clubs", "Hearts", "Diamonds"]
    values = ["Ace", "Two", "Three", "Four", "Five"]

    for suit <- suits, value <- values do
      "#{value} of #{suit}"
    end
  end

  def create_hand(hand_size) do
    create_deck() |> shuffle() |> deal(hand_size)
  end

  @doc """
  Divides a deck into a hand and a remainder of the dec.
  The `hand_size` argument indicates how many cards should be in the hand.

  ## Examples

      iex> deck = Cards.create_deck()
      iex> {hand, deck} = Cards.deal(deck, 1)
      iex> hand
      ["Ace of Spades"]

  """
  def deal(deck, hand_size) do
    Enum.split(deck, hand_size)
  end

  def load(filename) do
    case File.read(filename) do
      {:ok, binary} -> :erlang.binary_to_term(binary)
      {:error, _reason} -> "That file does not exist"
    end
  end

  def save(deck, filename) do
    binary = :erlang.term_to_binary(deck)
    File.write(filename, binary)
  end

  def shuffle(deck) do
    Enum.shuffle(deck)
  end
end
