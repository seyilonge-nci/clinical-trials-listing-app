Feature: As a user, I would like to view the trial results for a disease listing page that is given specific parameters, along with links to the trial's description page, the brief summary of the trial, and the number of locations of the trial

  Scenario: View disease listing page results
    Given "trialListingPageType" is set to "Disease"
    And "pageTitle" is set to "{{disease_label}} Clinical Trials"
    Given the user navigates to "/breast-cancer?cfg=0"
    Then the page title is "Breast Cancer Clinical Trials"
    Then the system displays 1 paragraph "Clinical trials are research studies that involve people. The clinical trials on this list are for breast cancer. All trials on the list are supported by NCI."
    Then the system displays 2 paragraph "NCI’s basic information about clinical trials explains the types and phases of trials and how they are carried out. Clinical trials look at new ways to prevent, detect, or treat disease. You may want to think about taking part in a clinical trial. Talk to your doctor for help in deciding if one is right for you."
    And the link "basic information about clinical trials" to "/about-cancer/treatment/clinical-trials/what-are-trials" appears on the page
    And each result displays the trial title as a link to the trial description page
    And each result displays the trial description below the link
    And each result displays "Location: " below the description

