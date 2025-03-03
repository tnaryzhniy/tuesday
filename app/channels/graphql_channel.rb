class GraphqlChannel < ApplicationCable::Channel
  def subscribed
  end

  def execute(data)
    query = data["query"]
    variables = ensure_hash(data["variables"])

    result = TuesdaySchema.execute(
      query,
      variables: variables,
      context: { channel: self }
    )
    transmit({ result: result.to_h })
  end

  private

  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      ambiguous_param.present? ? JSON.parse(ambiguous_param) : {}
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end
end
