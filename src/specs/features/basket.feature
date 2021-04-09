Feature: Basket

  Scenario: Client adds items to shopping basket
    Given Client adds 2 "The Hobbit"
    And Client adds 5 "Breaking Bad"

    When they check their shopping basket
    Then they should see
    """
Creation Date: 14/01/2012
2 x The Hobbit // 2 x 5.00 = £10.00
5 x Breaking Bad // 5 x 7.00 = £35.00
Total: £45.00
    """
