defmodule TimeDiscountRate.Host do
  alias TimeDiscountRate.Main
  alias TimeDiscountRate.Actions

  require Logger

  # Actions
  def fetch_contents(data) do
    data
    |> Actions.update_host_contents()
  end

  def change_page(data, page) do
    if page in Main.pages do
      %{data | page: page}
      |> Actions.change_page(page)
    else
      data
    end
  end

  def updata_config(data,options) do 
    data = data
            |> put_in([:basetime],options["basetime"])
            |> put_in([:distance],options["distance"])
            |> put_in([:lowlim],options["lowlim"])
            |> put_in([:uplim],options["uplim"])
            |> put_in([:q_num],options["q_num"])
            |> put_in([:rest_interval],options["rest_interval"])
            |> put_in([:rest_time],options["rest_time"])
            |> put_in([:unit],options["unit"])
    data |> Actions.updata_option()
  end

  def all_reset(data) do
    
    data = data |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, _ } ->
      {
        id,
        Main.new_participant(data),
      }
    end), %{}))
    data = data
           |>put_in([:anses],0)
           |>put_in([:results],%{})
    Actions.all_reset(data)
  end

  # Utilities
  def format_contents(data) do
    data
  end
end