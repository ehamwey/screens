defmodule Screens.Config.Bus do
  @moduledoc false

  alias Screens.Config.NearbyConnections
  alias Screens.Config.PsaConfig
  alias Screens.Util

  @type t :: %__MODULE__{
          stop_id: String.t(),
          service_level: pos_integer(),
          psa_config: PsaConfig.t(),
          nearby_connections: NearbyConnections.t()
        }

  @enforce_keys [:stop_id]
  defstruct stop_id: nil,
            service_level: 1,
            psa_config: PsaConfig.from_json(:default),
            nearby_connections: NearbyConnections.from_json(:default)

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

  defp value_from_json("psa_config", psa_config) do
    PsaConfig.from_json(psa_config)
  end

  defp value_from_json("nearby_connections", nearby_connections) do
    NearbyConnections.from_json(nearby_connections)
  end

  defp value_from_json(_, value), do: value

  defp value_to_json(:psa_config, psa_config) do
    PsaConfig.to_json(psa_config)
  end

  defp value_to_json(:nearby_connections, nearby_connections) do
    NearbyConnections.to_json(nearby_connections)
  end

  defp value_to_json(_, value), do: value
end