defmodule ScreensWeb.UnauthorizedController do
  use ScreensWeb, :controller

  def index(conn, _params) do
    conn
    |> put_status(403)
    |> put_layout("admin.html")
    |> render("index.html")
  end
end
