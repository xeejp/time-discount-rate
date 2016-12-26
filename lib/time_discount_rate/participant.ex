defmodule TimeDiscountRate.Participant do
  alias TimeDiscountRate.Actions
  require Logger 
  # Actions
  def fetch_contents(data, id) do
    Actions.update_participant_contents(data, id)
  end

  def set(data,id,option) do
    data = data
           |>put_in([:participants,id,:question],option["question"])
           |>put_in([:participants,id,:rate],option["rate"])
           |>put_in([:participants,id,:history],option["history"])
           |>put_in([:participants,id,:state],1)
    Actions.set(data,id,option["question"],option["rate"])
  end

  def send_result(data) do
    results = %{
      participants: data.participants
    }
    data = data
           |>put_in([:results],results)
    Actions.send_result(data)
  end

  def next(data,id,next_data) do
    slideIndex = get_in(data,[:participants,id,:slideIndex])
    slideIndex = slideIndex + 1
    data = data
           |>put_in([:participants,id,:slideIndex],slideIndex)
           |>put_in([:participants,id,:rate],next_data["next_rate"])
           |>put_in([:participants,id,:history],next_data["history"])
    Actions.update_participant_contents(data,id)
  end

  def finish(data,id) do
    data = data
           |>put_in([:participants,id,:state],2)
           |>put_in([:anses],data.anses+1)
    Actions.finish(data,id)
  end

  # Utilities
  def format_participant(participant), do: participant

  def format_data(data) do
    %{
      page: data.page,
      money: data.money,
      basetime: data.basetime,
      q_num: data.q_num,
      rest_interval: data.rest_interval,
      rest_time: data.rest_time,
      uplim: data.uplim,
      lowlim: data.lowlim,
      distance: data.distance,
      unit: data.unit,
      anses: data.anses,
      actives: Map.size(data.participants),
      results: data.results
    }
  end

  def format_contents(data, id) do
    %{participants: participants} = data
    participant = Map.get(participants, id)
    format_participant(participant)
      |> Map.merge(format_data(data))
  end
end