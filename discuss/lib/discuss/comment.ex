defmodule Discuss.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:content]}

  schema "comments" do
    field :content, :string
    belongs_to :topic, Discuss.Topic
    belongs_to :user, Discuss.User

    timestamps()
  end

  def changeset(comment, params \\ %{}) do
    comment
    |> cast(params, [:content])
    |> validate_required([:content])
  end
end
