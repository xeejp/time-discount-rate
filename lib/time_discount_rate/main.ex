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
      basetime: [0,7,14,10],
      q_num: 3,
      rest_interval: 4,
      rest_time: 3,
      distance: 1,
      uplim: 150,
      lowlim: 80,
      money: 7500,
      unit: "円",
      results: %{},
    }
  end

  def new_participant(data) do
    %{
      ansed: false,
      rate: [],
      history: [],
      question: [],
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