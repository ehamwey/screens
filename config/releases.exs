# In this file, we load production configuration and secrets
# from environment variables. You can also hardcode secrets,
# although such is generally not recommended and you have to
# remember to add this file to your .gitignore.
import Config

# make sure ExAWS.SecretsManager and its dependencies are available
Application.ensure_all_started(:poison)
Application.ensure_all_started(:hackney)
Application.ensure_all_started(:ex_aws)
Application.ensure_all_started(:ex_aws_secretsmanager)

eb_env_name = System.get_env("ENVIRONMENT_NAME")

secret_key_base =
  (eb_env_name <> "-secret-key-base")
  |> ExAws.SecretsManager.get_secret_value()
  |> ExAws.request!()
  |> Map.fetch!("SecretString")

api_v3_key = System.get_env("API_V3_KEY")

gds_dms_password =
  "gds-dms-password"
  |> ExAws.SecretsManager.get_secret_value()
  |> ExAws.request!()
  |> Map.fetch!("SecretString")

mercury_api_key =
  "mercury-api-key"
  |> ExAws.SecretsManager.get_secret_value()
  |> ExAws.request!()
  |> Map.fetch!("SecretString")

cognito_client_secret =
  (eb_env_name <> "-cognito-client-secret")
  |> ExAws.SecretsManager.get_secret_value()
  |> ExAws.request!()
  |> Map.fetch!("SecretString")

screens_auth_secret =
  (eb_env_name <> "-screens-auth-secret")
  |> ExAws.SecretsManager.get_secret_value()
  |> ExAws.request!()
  |> Map.fetch!("SecretString")

config :screens, ScreensWeb.Endpoint,
  http: [:inet6, port: String.to_integer(System.get_env("PORT") || "4000")],
  secret_key_base: secret_key_base

config :screens,
  api_v3_key: api_v3_key,
  environment_name: eb_env_name,
  gds_dms_password: gds_dms_password,
  mercury_api_key: mercury_api_key

config :ueberauth, Ueberauth.Strategy.Cognito, client_secret: cognito_client_secret
config :screens, ScreensWeb.AuthManager, secret_key: screens_auth_secret

# ## Using releases (Elixir v1.9+)
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start each relevant endpoint:
#
#     config :screens, ScreensWeb.Endpoint, server: true
#
# Then you can assemble a release by calling `mix release`.
# See `mix help release` for more information.
