defmodule TimeDiscountRate.Main do
  alias TimeDiscountRate.Actions

  @pages ["waiting", "experiment", "result"]
  @sequence ["question1", "question2", "answered"]

  def pages, do: @pages
  def sequence, do: @sequence

  def init do
    %{
      page: "waiting",
      participants: %{},
      anses: 0,
      money: 7500,
      unit: "円",
      results: %{},
    }
  end

  def new_participant(data) do
    %{
      ansed: false,
      rate: [[80,140,200],[80,140,200],[80,140,200]], #rate[0] -> 1month,rate[1] -> 6month,rate[2] -> 1year
      question: [0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2],
      state: 0, # 0->waitng,1->answering,2->answered
      slideIndex: 0,
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant(data)
      put_in(data, [:participants, id], new)
      |> Actions.join(id, new)
    else
      data
    end
  end

  def wrap(data) do
    {:ok, %{"data" => data}}
  end
end