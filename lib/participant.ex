defmodule TimeDiscountRate.Participant do
	require Logger
	
	def start(data,id,option) do
		data = data
			   |>put_in([:participants,id,:question],option["questions"])
			   |>put_in([:participants,id,:rate],option["rate"])
			   |>put_in([:participants,id,:state],1)
	  end

	def next(data,id,rate) do
		slideIndex = get_in(data,[:participants,id,:slideIndex])
		slideIndex = slideIndex + 1
		data = data
			   |>put_in([:participants,id,:slideIndex], slideIndex)
			   |>put_in([:participants,id,:rate], rate)
	end

	def finish(data,id) do
		data = data
			   |>put_in([:participants,id,:state],2)
			   |>put_in([:anses],data.anses+1)
	  end
	
	def get_filter(data, id) do
		%{
			_default: true,
			participants: %{
				id => true
			},
			participants_number: "participantsNumber",
			is_first_visit: false,
			history: false,
			is_first_visit: true,
			_spread: [[:participants, id]]	
		}
	end

	def filter_data(data, id) do
		Transmap.transform(data, get_filter(data, id), diff: false)
		|> Map.delete(:participants)
	end
end
