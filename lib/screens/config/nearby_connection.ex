defmodule Screens.Config.NearbyConnection do
  @moduledoc false

  @type t :: {stop_id, list(route_id)}
  @typep stop_id :: String.t()
  @typep route_id :: String.t()

  @spec from_json(map()) :: t()
  def from_json(%{"stop" => stop, "routes_at_stop" => routes_at_stop})
      when is_list(routes_at_stop) do
    {stop, routes_at_stop}
  end

  @spec to_json(t()) :: map()
  def to_json({stop, routes_at_stop}) do
    %{"stop" => stop, "routes_at_stop" => routes_at_stop}
  end
end
