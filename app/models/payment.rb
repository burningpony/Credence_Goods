class Payment

  def self.all
    UserPair.eager_load(:expert, :customer)
  end

end