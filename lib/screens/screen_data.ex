defmodule Screens.ScreenData do
  @moduledoc false

  alias Screens.LogScreenData

  @modules_by_app_id %{
    "bus_eink" => Screens.BusScreenData,
    "gl_eink_single" => Screens.GLScreenData,
    "gl_eink_double" => Screens.GLScreenData,
    "solari" => Screens.SolariScreenData
  }

  def by_screen_id_with_override_and_version(screen_id, client_version, is_screen) do
    if Screens.Override.State.disabled?(String.to_integer(screen_id)) do
      LogScreenData.log_api_response(screen_id, client_version, is_screen, %{
        force_reload: false,
        success: false
      })
    else
      LogScreenData.log_api_response(
        screen_id,
        client_version,
        is_screen,
        by_screen_id_with_version(
          screen_id,
          client_version,
          is_screen
        )
      )
    end
  end

  defp by_screen_id_with_version(screen_id, client_version, is_screen) do
    api_version = Application.get_env(:screens, :api_version)

    if api_version == client_version do
      by_screen_id(screen_id, is_screen)
    else
      %{force_reload: true}
    end
  end

  defp by_screen_id(screen_id, is_screen) do
    %{app_id: app_id} =
      :screens
      |> Application.get_env(:screen_data)
      |> Map.get(screen_id)

    screen_data_module = Map.get(@modules_by_app_id, app_id)
    screen_data_module.by_screen_id(screen_id, is_screen)
  end
end