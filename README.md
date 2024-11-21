# Virtual CR Backend

### Route: `/api/ct-announcements`

**Method**: `GET` <br>
**Sample Response**:

```json
[
  {
    "id": 1,
    "date": "2024-11-26",
    "day": "Tuesday",
    "time": "16:00",
    "place": "B-Block 101",
    "course_id": 2,
    "topic": "Deadlock",
    "teacher_id": 1,
    "course": "Operating Systems",
    "teacher": "RA"
  }
]
```

### Route: `/api/notices`

**Method**: `GET`  <br>
**Sample Response**:

```json
[
  {
    "id": 2,
    "date": "2024-11-26",
    "day": "Tuesday",
    "time": "17:28",
    "notice": "Assignment Submission"
  }
]
```


### Route: `/add-ct-announcement`

**Method**: `POST`  
**Sample Payload**:

```json
{
  "date": "2024-11-25",
  "day": "Monday",
  "time": "10:00 AM",
  "place": "Room 102",
  "course_id": "CSE3217",
  "topic": "Mobile Computing",
  "teacher_id": "1",
  "pass": "pass"
}

```

### Route: `/add-notice`

**Method**: `POST`  
**Sample Payload**:

```json
{
  "date": "2024-11-24",
  "day": "Sunday",
  "time": "12:00 PM",
  "notice": "Tour starts at 8:00 PM",
  "pass": "pass"
}

```
