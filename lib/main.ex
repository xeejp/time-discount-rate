defmodule TimeDiscountRate.Main do
  alias TimeDiscountRate.Host
  alias TimeDiscountRate.Participant

  require Logger

  def init do
    %{
      is_first_visit: true,      
      page: "waiting", 
      question_text: nil,
      participants: %{},
      participants_number: 0,
      
      anses: 0,
      basetime: [0,7,14,10],
      q_num: 3,
      rest_interval: 4,
      rest_time: 3,
      distance: 1,
      uplim: 150,
      lowlim: 80,
      money: 7500,
      unit: nil,
      results: [],
      history: []
    }
  end

  def new_participant(id) do
    %{
      id: id,
      ansed: false,
      rate: [],
      history: [],
      question: [],
      state: 0, # 0->waitng,1->answering,2->answered
      slideIndex: 0
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant(id)
      data
      |> put_in([:participants, id], new)
      |> Map.update!(:participants_number, fn n -> n + 1 end)
    else
      data
    end
  end

  def compute_diff(old, %{data: new} = result) do
    import Participant, only: [filter_data: 2]
    import Host, only: [filter_data: 1]

    host = Map.get(result, :host, %{})
    participant = Map.get(result, :participant, %{})
    participant_tasks = Enum.map(old.participants, fn {id, _} ->
      {id, Task.async(fn -> JsonDiffEx.diff(filter_data(old, id), filter_data(new, id)) end)}
    end)
    host_task = Task.async(fn -> JsonDiffEx.diff(filter_data(old), filter_data(new)) end)
    host_diff = Task.await(host_task)
    participant_diff = Enum.map(participant_tasks, fn {id, task} -> {id, %{diff: Task.await(task)}} end)
                        |> Enum.filter(fn {_, map} -> map_size(map.diff) != 0 end)
                        |> Enum.into(%{})
    host = Map.merge(host, %{diff: host_diff})
    host = if map_size(host.diff) == 0 do
      Map.delete(host, :diff)
    else
      host
    end
    host = if map_size(host) == 0 do
      nil
    else
      host
    end
    participant = Map.merge(participant, participant_diff, fn _k, v1, v2 ->
      Map.merge(v1, v2)
    end)
    %{data: new, host: host, participant: participant}
  end
end
