defmodule TimeDiscountRate.Participant do
  alias TimeDiscountRate.Actions

  # Actions
  def fetch_contents(data, id) do
    Actions.update_participant_contents(data, id)
  end

  def set_question(data,id,question) do
    data = data
           |>put_in([:participants,id,:question],question)
           |>put_in([:participants,id,:state],1)
    Actions.set_question(data,id,question)
  end

  def send_result(data) do
    results = %{
      participants: data.participants
    }
    data = data
           |>put_in([:results],results)
    Actions.send_result(data)
  end

  def next(data,id,rate) do
    slideIndex = get_in(data,[:participants,id,:slideIndex])
    slideIndex = slideIndex + 1
    data = data
           |>put_in([:participants,id,:slideIndex],slideIndex)
           |>put_in([:participants,id,:rate],rate)
    Actions.next(data,id,slideIndex,rate)
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