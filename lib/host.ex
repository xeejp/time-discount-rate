defmodule TimeDiscountRate.Host do
  alias TimeDiscountRate.Main

  defp ensure_integer(integer) when is_integer(integer), do: integer
  defp ensure_integer(str), do: Integer.parse(str) |> elem(0)
  defp ensure_float(float) when is_float(float), do: float
  defp ensure_float(str), do: Float.parse(str) |> elem(0)

  def update_config(data, config) do
    data = Map.put(data, :uplim  ,ensure_float(config["uplim"]))
            |>Map.put(:lowlim ,ensure_float(config["lowlim"]))
            |>Map.put(:rest_time ,ensure_float(config["rest_time"]))
            |>Map.put(:distace ,ensure_integer(config["distance"]))
            |>Map.put(:money ,ensure_integer(config["money"]))
            |>Map.put(:q_num ,ensure_integer(config["q_num"]))
            |>Map.put(:rest_interval ,ensure_integer(config["rest_interval"]))
            |>Map.put(:unit ,config["unit"])
            |>Map.put(:basetime ,config["basetime"])
  end

  def update_description(data, description) do
    data = Map.put(data, :description, description)
  end

  def change_page(data, page) do
    if data.page == "waiting" do
      data = data
            |> Map.put(:history, [])
    end
    data = Map.update!(data, :page, fn _ -> page end)
    data
  end

  def visit(data) do
    Map.put(data, :is_first_visit, false)    
  end

  def get_filter(data) do
    map = %{
      _default: true,
      is_first_visit: "isFirstVisit",
      participants_number: "participantsNumber",
      finish_description_number: "finishDescriptionNumber"
    }
  end

  def filter_data(data) do
    Transmap.transform(data, get_filter(data), diff: false)
  end
end
