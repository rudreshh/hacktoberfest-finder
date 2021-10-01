name: 'Bug Report'
description: Report something that's broken
label: hacktoberfest
body:
- type: textarea
  attributes:
    label: Description
    placeholder: What's broken? What were you expecting to happen? Please provide a screenshot if possible.
  validations:
    required: true
- type: textarea
  attributes:
    label: Steps to reproduce
    placeholder: |
        1. Do this thing...
        2. Then do that thing...
        3. And finally, do something else...
- type: textarea
  attributes:
    label: Environment
    placeholder: Provide details, like Browser, OS, etc..
  validations:
    required: true
