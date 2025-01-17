defmodule Screens.Config.PsaConfig do
  @moduledoc false

  alias Screens.Config.PsaConfig.{OverrideList, PsaList}
  alias Screens.Util

  @type t :: %__MODULE__{
          default_list: PsaList.t(),
          override_list: OverrideList.t() | nil
        }

  defstruct default_list: PsaList.from_json(:default),
            override_list: nil

  @spec from_json(map() | :default) :: t()
  def from_json(%{} = json) do
    struct_map =
      json
      |> Map.take(Util.struct_keys(__MODULE__))
      |> Enum.into(%{}, fn {k, v} -> {String.to_existing_atom(k), value_from_json(k, v)} end)

    struct!(__MODULE__, struct_map)
  end

  def from_json(:default) do
    %__MODULE__{}
  end

  @spec to_json(t()) :: map()
  def to_json(%__MODULE__{} = t) do
    t
    |> Map.from_struct()
    |> Enum.into(%{}, fn {k, v} -> {k, value_to_json(k, v)} end)
  end

  defp value_from_json("default_list", default_list) do
    PsaList.from_json(default_list)
  end

  defp value_from_json("override_list", nil), do: nil

  defp value_from_json("override_list", override_list) do
    OverrideList.from_json(override_list)
  end

  defp value_from_json(_, value), do: value

  defp value_to_json(:default_list, default_list) do
    PsaList.to_json(default_list)
  end

  defp value_to_json(:override_list, nil), do: nil

  defp value_to_json(:override_list, override_list) do
    OverrideList.to_json(override_list)
  end

  defp value_to_json(_, value), do: value
end
