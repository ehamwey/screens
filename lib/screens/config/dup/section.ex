defmodule Screens.Config.Dup.Section do
  @moduledoc false

  alias Screens.Util

  @type t :: %__MODULE__{
          stop_ids: list(stop_id()),
          route_ids: list(route_id()),
          pill: :bus | :red | :orange | :green | :blue | :cr | :mattapan | :silver | :ferry
        }

  @type stop_id :: String.t()
  @type route_id :: String.t()

  @enforce_keys [:pill]
  defstruct stop_ids: [],
            route_ids: [],
            pill: nil

  @spec from_json(map()) :: t()
  def from_json(%{} = json) do
    struct_map =
      json
      |> Map.take(Util.struct_keys(__MODULE__))
      |> Enum.into(%{}, fn {k, v} -> {String.to_existing_atom(k), value_from_json(k, v)} end)

    struct!(__MODULE__, struct_map)
  end

  @spec to_json(t()) :: map()
  def to_json(%__MODULE__{} = t) do
    t
    |> Map.from_struct()
    |> Enum.into(%{}, fn {k, v} -> {k, value_to_json(k, v)} end)
  end

  for pill <- ~w[bus red orange green blue cr mattapan silver ferry]a do
    pill_string = Atom.to_string(pill)

    defp value_from_json("pill", unquote(pill_string)) do
      unquote(pill)
    end
  end

  defp value_from_json(_, value), do: value

  defp value_to_json(_, value), do: value
end