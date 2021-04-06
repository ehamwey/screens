defmodule Screens.V2.CandidateGenerator.GlEinkSingle do
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
         :footer
       ],
       full_takeover: [:full_screen]
     }}
  end

  @impl CandidateGenerator
  def candidate_instances(_config) do
    [
      %Placeholder{color: :blue, slot_names: [:header]},
      %Placeholder{color: :blue, slot_names: [:footer]},
      %Placeholder{color: :green, slot_names: [:main_content]}
    ]
  end
end