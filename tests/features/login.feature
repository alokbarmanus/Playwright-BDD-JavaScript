Feature: Login to OrangeHRM

  @regression @login
  Scenario: Login Page 01: Successful login with invalid credentials
    Given I am on the login page
    When I login with invalid credentials
    Then I should see Invalid credentials message

  @regression @login
  Scenario: Login Page 02: Successful login with valid credentials from Step
    Given I am on the login page
    When I login with valid static credentials "Admin" and "admin123"
    Then I should see the dashboard

  #@dataFile:env/${env}/data/loginData.json
  @regression @login
  @dataFile:data/${env}/loginData.json
  Scenario: Login Page 03: Successful login with valid credentials from Step
    Given I am on the login page
    When I login with valid credentials from json data file
    Then I should see the dashboard

  @regression @login @registration
  @dataFile:data/${env}/registrationData.json
  Scenario: Login Page 04: User Registration Test
    Given I am on the login page
    When I enter credentials firstname and lastname and email and mobile
    When I enter address from address data in address field

  # @regression @login
  # Scenario: Login Page 05: Failed test to see screenshot attachment
  #   Given I am on the login page
  #   When I login with invalid credentials
  #   Then I should see the dashboard