defmodule Screens.LineMap do
  @moduledoc false

  alias Screens.RoutePatterns.RoutePattern
  alias Screens.Vehicles.Vehicle

  def by_stop_id(stop_id, route_id, direction_id, predictions) do
    vehicles = Vehicle.by_route_and_direction(route_id, direction_id)
    route_stops = RoutePattern.stops_by_route_and_direction(route_id, direction_id)

    current_stop_index =
      Enum.find_index(route_stops, fn %{id: route_stop_id} -> route_stop_id == stop_id end)

    %{id: origin_stop_id} = Enum.at(route_stops, 0)
    schedule = next_scheduled_departure(origin_stop_id, route_id)

    %{
      stops: format_stops(route_stops, current_stop_index),
      vehicles: format_vehicles(vehicles, route_stops, current_stop_index, predictions),
      schedule: format_schedule(schedule)
    }
  end

  defp next_scheduled_departure(origin_stop_id, route_id) do
    case Screens.Schedules.Schedule.next_departure(origin_stop_id, route_id) do
      {:ok, t} -> t
      :error -> nil
    end
  end

  defp format_schedule(%{time: t}) do
    %{time: t}
  end

  defp format_stops(route_stops, current_stop_index) do
    %{name: current_stop_name} = Enum.at(route_stops, current_stop_index)
    %{name: next_stop_name} = Enum.at(route_stops, current_stop_index + 1)
    %{name: following_stop_name} = Enum.at(route_stops, current_stop_index + 2)
    %{name: origin_stop_name} = Enum.at(route_stops, 0)

    %{
      current: current_stop_name,
      next: next_stop_name,
      following: following_stop_name,
      origin: origin_stop_name,
      count_before: current_stop_index
    }
  end

  defp format_vehicles(vehicles, route_stops, current_stop_index, predictions) do
    trip_id_to_time =
      predictions
      |> Enum.reject(&is_nil(&1.trip))
      |> Enum.map(fn %{trip: %{id: trip_id}, time: time} -> {trip_id, time} end)
      |> Enum.into(%{})

    vehicles
    |> Enum.map(&format_vehicle(&1, route_stops, current_stop_index, trip_id_to_time))
    |> Enum.reject(&is_nil/1)
    |> Enum.reject(fn %{index: index} -> index < 0 end)
    |> maybe_strip_time()
  end

  defp maybe_strip_time(vehicles) do
    if Enum.any?(vehicles, fn v -> v.index > 2 and is_nil(v.time) end) do
      Enum.map(vehicles, &strip_time/1)
    else
      vehicles
    end
  end

  defp strip_time(vehicle) do
    %{vehicle | time: nil}
  end

  defp format_vehicle(
         %{id: id, stop_id: vehicle_stop_id, trip_id: vehicle_trip_id, current_status: status},
         route_stops,
         current_stop_index,
         trip_id_to_time
       ) do
    vehicle_stop_index =
      Enum.find_index(route_stops, fn %{id: route_stop_id} -> route_stop_id == vehicle_stop_id end)

    case vehicle_stop_index do
      nil ->
        nil

      _ ->
        index =
          2 + current_stop_index - vehicle_stop_index +
            status_adjustment(vehicle_stop_index, status)

        time = Map.get(trip_id_to_time, vehicle_trip_id)
        %{id: id, index: index, time: time}
    end
  end

  defp status_adjustment(0, _), do: 0.0
  defp status_adjustment(_, :stopped_at), do: 0.0
  defp status_adjustment(_, :in_transit_to), do: 0.7
  defp status_adjustment(_, :incoming_at), do: 0.3
end
