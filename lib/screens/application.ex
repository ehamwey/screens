defmodule Screens.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    load_runtime_config()

    # List all child processes to be supervised
    children = [
      # Start the endpoint when the application starts
      ScreensWeb.Endpoint,
      # Starts a worker by calling: Screens.Worker.start_link(arg)
      # {Screens.Worker, arg},
      Screens.Override.Supervisor
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Screens.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    ScreensWeb.Endpoint.config_change(changed, removed)
    :ok
  end

  def load_runtime_config do
    Application.put_env(
      :screens,
      :environment_name,
      runtime_config(Application.get_env(:screens, :environment_name))
    )
  end

  defp runtime_config({:system, environment_variable}) do
    System.get_env(environment_variable)
  end

  defp runtime_config(value) do
    value
  end
end
