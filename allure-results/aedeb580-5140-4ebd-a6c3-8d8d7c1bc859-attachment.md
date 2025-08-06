# Page snapshot

```yaml
- text: "Preview as:"
- combobox "Preview as:":
  - option [selected]
- text: "Preview Style:"
- combobox "Preview Style:":
  - option [selected]
- button "Remove Preview Bar": Remove
- banner
- main:
  - heading "Travel Insurance Plan" [level=2]
  - alert
  - navigation "Navigation nav":
    - list:
      - listitem "Get Quote"
      - listitem "Complete Application"
      - listitem "Summary Page"
      - listitem "Payment Amount"
  - text: Salutation
  - textbox "Salutation" [disabled]: Mr
  - text: Name
  - textbox "Name" [disabled]: Veldora
  - text: Date Of Birth
  - textbox "Date Of Birth" [disabled]: 1980-01-01
  - text: Email Address
  - textbox "Email Address" [disabled]: veldora@tempest.com
  - text: Identity
  - textbox "Identity" [disabled]: Pan Number
  - text: Mobile Number
  - textbox "Mobile Number" [disabled]: "988512345678"
  - text: Gender
  - textbox "Gender" [disabled]: Male
  - button "Save and Exit" [disabled]
  - button "Previous" [disabled]
  - button "Next" [disabled]
- contentinfo
```