defmodule Screens.V2.CandidateGenerator.BusEink do
  @moduledoc false

  alias Screens.V2.CandidateGenerator
  alias Screens.V2.WidgetInstance.Placeholder

  @behaviour CandidateGenerator

  @impl CandidateGenerator
  def screen_template do
    {:screen,
     %{
       normal: [
         :header,
         :main_content,
         :medium_flex,
         :footer
       ],
       bottom_takeover: [
         :header,
         :main_content,
         :bottom_screen
       ],
       full_takeover: [:full_screen]
     }}
  end

  @impl CandidateGenerator
  def candidate_instances(_config) do
    [
      %Placeholder{color: :blue, slot_names: [:header]},
      %Placeholder{color: :blue, slot_names: [:footer]},
      %Placeholder{color: :green, slot_names: [:main_content]},
      %Placeholder{color: :red, slot_names: [:medium_flex]}
    ]
  end
end