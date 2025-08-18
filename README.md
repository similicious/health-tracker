# health-tracker

A simple app based on pocketbase that allows you to track user defined metrics.

This app currently does not support authentication and is meant to be used by one user. Host it on your own private infrastructure.

## Data Model

### `metric_type`

- id: string
- name: string
- color: string (hexcode)
- description: string

### `metric`

- id: string
- metric_type: string (fk)
- value: string
- date: datetime
- note: string
