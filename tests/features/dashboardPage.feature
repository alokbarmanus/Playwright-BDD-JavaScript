Feature: Dashboard Page Features

  @regression @dashboard
  Scenario: Dashboard Page 01: Dashboard displays correct header
    Given I am logged in as Admin
    When I am on the dashboard page
    Then I should see the dashboard header

  @regression @dashboard @dashboard02
  @dataFile:data/${env}/loginData.json
  Scenario: Dashboard Page 02: Dashboard displays quick launch panel
    Given I am on the login page
    When I login with valid credentials from json data file
    When I am on the dashboard page
    #Then I should see the quick launch panel
