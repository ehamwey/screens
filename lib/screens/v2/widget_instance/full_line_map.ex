defmodule Screens.V2.WidgetInstance.FullLineMap do
  @moduledoc false

  alias Screens.Config.Screen
  alias Screens.V2.WidgetInstance

  defstruct screen: nil,
            asset_url: nil,
            slot_names: nil,
            priority: nil

  @type t :: %__MODULE__{
          screen: Screen.t(),
          asset_url: String.t(),
          slot_names: list(WidgetInstance.slot_id()),
          priority: WidgetInstance.priority()
        }

  def serialize(%__MODULE__{asset_url: asset_url}), do: %{asset_url: asset_url}

  def slot_names(_instance), do: [:main_content_left]

  def priority(_instance), do: [2]

  def widget_type(_instance), do: :full_line_map

  def valid_candidate?(_instance), do: true

  def audio_serialize(_instance), do: %{}

  def audio_sort_key(_instance), do: 0

  def audio_valid_candidate?(_instance), do: false

  def audio_view(_instance), do: ScreensWeb.V2.Audio.FullLineMapView

  defimpl Screens.V2.WidgetInstance do
    alias Screens.V2.WidgetInstance.FullLineMap

    def priority(instance), do: FullLineMap.priority(instance)
    def serialize(instance), do: FullLineMap.serialize(instance)
    def slot_names(instance), do: FullLineMap.slot_names(instance)
    def widget_type(instance), do: FullLineMap.widget_type(instance)
    def valid_candidate?(instance), do: FullLineMap.valid_candidate?(instance)
    def audio_serialize(instance), do: FullLineMap.audio_serialize(instance)
    @spec audio_sort_key(Screens.V2.WidgetInstance.FullLineMap.t()) :: 0
    def audio_sort_key(instance), do: FullLineMap.audio_sort_key(instance)
    def audio_valid_candidate?(instance), do: FullLineMap.audio_valid_candidate?(instance)
    def audio_view(instance), do: FullLineMap.audio_view(instance)
  end
end
