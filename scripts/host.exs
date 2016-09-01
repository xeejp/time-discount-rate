defmodule TimeRate.Host do
  alias TimeRate.Main
  alias TimeRate.Actions

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

  def all_reset(data) do
    
    data = data |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, _ } ->
      {id,
        %{
          ansed: false,
          rate: [[0.8,1.4,2],[0.8,1.4,2],[0.8,1.4,2]],
          question: [0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2],
          state: 0, 
          slideIndex: 0,
        }
      }
    end), %{}))
    data = data
           |>put_in([:anses],0)
    Actions.all_reset(data)
  end

  # Utilities
  def format_contents(data) do
    data
  end
end