defmodule TimeDiscountRate do
  use XeeThemeScript
  require Logger
  alias TimeDiscountRate.Main
  alias TimeDiscountRate.Actions
  alias TimeDiscountRate.Host
  alias TimeDiscountRate.Participant

  # Callbacks
  def script_type do
    :message
  end
  def install, do: nil
  def init do
    {:ok, %{data: Main.init()}}
  end
  def join(data, id) do
    wrap_result(data, Main.join(data, id))
  end

  # Host router
  def handle_received(data, %{"action" => action, "params" => params}) do
    result = case {action, params} do
      {"fetch contents", _} -> Actions.update_host_contents(data)
      {"change page", page} -> Host.change_page(data, page)
      {"update config", config} -> Host.update_config(data, config)
      {"update question", text} -> Host.update_question(data, text)
      {"update unit", unit} -> Host.update_unit(data, unit)
      {"visit", _} -> Host.visit(data)
      _ -> {:ok, %{data: data}}
    end
    wrap_result(data, result)
  end
  # Participant router
  def handle_received(data, %{"action" => action, "params" => params}, id) do
    result = case {action, params} do
      {"fetch contents", _} -> Actions.update_participant_contents(data, id)
      {"start", option} -> Participant.start(data, id, option)
      {"next", rate} -> Participant.next(data, id, rate)
      {"finish", _} -> Participant.finish(data, id)
      _ -> {:ok, %{data: data}}
    end
    wrap_result(data, result)
  end

  # Utilities
  def wrap_result(old, {:ok, result}) do
    {:ok, Main.compute_diff(old, result)}
  end

  def wrap_result(old, new) do
    {:ok, Main.compute_diff(old, %{data: new})}
  end
end
