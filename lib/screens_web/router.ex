defmodule ScreensWeb.Router do
  use ScreensWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :redirect_prod_http do
    if Application.get_env(:screens, :redirect_http?) do
      plug(Plug.SSL, rewrite_on: [:x_forwarded_proto])
    end
  end

  scope "/", ScreensWeb do
    get "/_health", HealthController, :index
  end

  scope "/screen", ScreensWeb do
    pipe_through [:redirect_prod_http, :browser]

    get "/", ScreenController, :index
    get "/:id", ScreenController, :index
  end

  scope "/api/screen", ScreensWeb do
    pipe_through [:redirect_prod_http, :api, :browser]

    get "/:id", ScreenApiController, :show
  end

  scope "/alert_priority", ScreensWeb do
    pipe_through [:redirect_prod_http, :api, :browser]

    get "/:id", AlertPriorityController, :show
  end
end
