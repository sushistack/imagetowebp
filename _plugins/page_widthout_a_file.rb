module Jekyll
  class PageWithoutAFile < Page
    # rubocop:disable Naming/MemoizedInstanceVariableName
    def read_yaml(*)
      @data ||= {}
    end
    # rubocop:enable Naming/MemoizedInstanceVariableName
  end
end